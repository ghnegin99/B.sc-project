import { Request, Response } from "express";
import { User } from "../models/User";
import { BaseController } from "./BaseController";
import { Helper } from "../classes/Helper";
import { Ghasedak } from "../classes/Ghasedak";
import { UserNotExistError } from "../errors/user-not-exist-error";
import { UserNotVerifiedError } from "../errors/user-not-verified-error";
import { PasswordWrongError } from "../errors/password-wrong-error";
import { parse } from "dotenv";
import bcrypt from 'bcrypt';

interface IUserInfo {
  name: string;
  family: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  email: string;
  gender: number;
  birthday: string;
}

interface ICompleteUserInfo {
  phone_number: string;
  age: string;
  weight: string;
  height: string;
  disease_background: boolean;
  disease_background_description: string;
  exercise_days: [];
  exercise_hours: [];
}

interface ILoginUserBody {
  user_name: string;
  password: string;
}

if (!process.env.APP_SLOGAN && !process.env.APP_NAME_FA) {
  throw new Error("نام فارسی اپلیکیشن و شعار برنامه تعریف نشده است");
}


if(!process.env.JWT_SECRET_KEY) throw new Error('کلید رمز نگاری تعریف نشده است');
export class UserController extends BaseController {
  static async registerUserStepOne(
    body: IUserInfo,
    req: Request,
    res: Response
  ) {
    const { name, family, phone_number, password, email, gender, birthday } =
      body;

    try {
      // Hash Password
      const hashedPassword = await Helper.hashPassword(password);

      // Create new user with above information
      let user = new User({
        user_name: name,
        user_family: family,
        user_phone_number: phone_number,
        user_password: hashedPassword,
        user_email: email,
        user_gender: gender,
        user_birthday: birthday,
      });

      user = await user.save();

      // Generate a random 5 number code for verification
      const verificationCode = Helper.generateVerificationCode();

      // Send verification code to user
      const result = await Ghasedak.sendOTP(
        user.user_phone_number,
        verificationCode
      );

      console.log(result);
      // Save verification code to db

      user.user_verify_code = verificationCode;
      await user.save();
      // Assign expiration for verification code

      return res.json({
        message: "ثبت نام با موفقیت انجام شد",
        result: result,
        data: user,
      });
    } catch (err: any) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  static async loginUser(body: ILoginUserBody, req: Request, res: Response) {
    // Step 0: Destructure request body
    const { user_name, password } = body;
    // Step1: Check user_name is email or phone_number
    const field = body.user_name.includes("@")
      ? "user_email"
      : "user_phone_number";

    // Step2: Check if user is exist or not
    const userExist = await User.findOne({ [field]: user_name });
    if (!userExist) throw new UserNotExistError(user_name);

    // Step3: Compare password with saved password in document
    const comparedPassword = await Helper.comparePassword(
      password,
      userExist.user_password
    );
    if (!comparedPassword) throw new PasswordWrongError();

    // If the user before exist and not verified
    // first must be do verification
    if (!userExist.user_is_verified && userExist.user_verify_code != null) {
      // Send a verification code for verify

      // Step1-1: Generate random number to verification
      const verificationCode = Helper.generateVerificationCode();

      // Step1-2: Send it to user phone number with Ghasedak API
      const result = await Ghasedak.sendOTP(
        userExist.user_phone_number,
        verificationCode
      );

      // Step1-3: Save verification code to user document for verify
      userExist.user_verify_code = verificationCode;
      await userExist.save();

      return res.send({
        message: "حساب شما هنوز فعال نشده است، کد فعالسازی برای شما ارسال شد",
        result: {
          user_phone_number: userExist.user_phone_number,
        },
      });
    }

    // Step3: Generate JWT auth token for authentication
    const token = Helper.generateJWT(
      userExist.user_phone_number,
      userExist._id
    );

    res.setHeader("auth-token", token);

    res.send({
      message: "ورود موفقیت آمیز",
      result: {
        auth_token: token,
      },
    });
  }

  static async completeUserProfile(
    body: ICompleteUserInfo,
    req: Request,
    res: Response
  ) {
    const {
      exercise_days,
      exercise_hours,
      age,
      weight,
      height,
      disease_background,
      disease_background_description,
    } = body;

    // Step1: Check user should be verified
    const user = await User.findOne({
      user_phone_number: req.user.user_phone_number,
    });
    if (!user) throw new UserNotExistError(body.phone_number);

    if (!user.user_is_verified && user.user_status == 1)
      throw new UserNotVerifiedError(body.phone_number);

    // Step2: Complete user inforamtion due to above info

    user.user_age = age;
    user.user_height = height;
    user.user_weight = weight;
    user.user_disease_background = disease_background;
    user.user_disease_background_description = disease_background_description;
    exercise_days.length > 0
      ? exercise_days.forEach((exe_day) => {
          user.user_exercise_days.push(exe_day);
        })
      : (user.user_exercise_days = []);

    exercise_hours.length > 0
      ? exercise_hours.forEach((exe_hour) => {
          user.user_exercise_hours.push(exe_hour);
        })
      : (user.user_exercise_hours = []);

    // Step3: Change user_status to completed
    user.user_status = 2;

    const heightMeter = height.toString().slice(0, 1);
    const heightCm = height.toString().slice(1);

    const newHeight = heightMeter + "." + heightCm;
    // Step4: Calculate BMI and save to document
    const calculatedBmi = Helper.calculateBMI(
      parseFloat(newHeight),
      parseFloat(weight)
    );
    user.user_bmi = calculatedBmi.toString();

    await user.save();

    // FIXME: Send BMI SMS to user
    // Step4: Send message to user (Welcome)
    // const text = `
    // ${user.user_name} عزیز
    // شاخص توده بدنی شما: ${calculatedBmi}
    // ${process.env.APP_NAME_FA} |‌ ${process.env.APP_SLOGAN}`;
    // Ghasedak.sendText(user.user_phone_number, text);

    res.send({
      message: "اطلاعات فردی شما با موفقیت ثبت شد",
      result: {
        user_full_name: user.user_name + " " + user.user_family,
        user_phone_number: user.user_phone_number,
        calculated_bmi: calculatedBmi,
      },
    });
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.find();

      res.send({
        message: "تمامی کاربران دریافت شد",
        result: {
          users,
        },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  static async getUserDetails(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId);

      res.send({
        message: "کاربر دریافت شد",
        result: {
          user,
        },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  static async changeBmi(req: Request, res: Response) {
    const { height, weight } = req.body;

    const user = await User.findOne({
      user_phone_number: req.user.user_phone_number,
    });

    if (!user) throw new Error("کاربری جهت تغییر شاخص یافت نشد");

    const heightMeter = height.toString().slice(0, 1);
    const heightCm = height.toString().slice(1);

    const newHeight = heightMeter + "." + heightCm;
    // Step1: Calculate BMI and save to document
    const calculatedBmi = Helper.calculateBMI(
      parseFloat(newHeight),
      parseFloat(weight)
    );

    user.user_height = newHeight.toString();
    user.user_weight = weight;
    user.user_bmi = calculatedBmi.toString();
    await user.save();

    res.send({
      message: "شاخص شما با موفقیت محاسبه و تغییر کرد",
      result: {
        user,
      },
    });
  }

  static async changePassword(req:Request,res:Response){
    const phone_number = req.user.user_phone_number;
    const {old_password,new_password, new_password_confirm} = req.body;

    if(new_password !== new_password_confirm) throw new Error('رمز عبور جدید با تکرار آن یکسان نیست');


    try{
      const user = await User.findOne({user_phone_number: phone_number});
      if(!user) throw new UserNotExistError(phone_number);
  
      
      // check old password with saved password
      const compared = await Helper.comparePassword(old_password, user.user_password);
      if(!compared) throw new Error('رمز عبور قدیمی وارد شده صحیح نیست');
  
      
      // hash new password
      const hashedPassword = await Helper.hashPassword(new_password);
  
      // Replace new hashed password with old password
      user.user_password = hashedPassword;
      await user.save();


      res.send({
        message: 'رمز عبور جدید با موفقیت اعمال شد',
        result: {

        }
      })
    }catch(err:any){

      throw new Error(err.message);

    }
    
    

    // 
  }


  static async getBmiInformation(req:Request,res:Response) {
    const reqUser = req.user;



    try{
      const userRange = await Helper.checkUserBmi(reqUser.user_bmi);

    res.send({
      message: 'اطلاعات دریافت شد', 
      result:{
        range: userRange
      }
    })
    }catch(err:any){
      throw new Error(err.message);
    }
  }


  static async calculateBmi(req:Request,res:Response) { 

    const { height, weight } = req.body;

    const heightMeter = height.toString().slice(0, 1);
    const heightCm = height.toString().slice(1);

    const newHeight = heightMeter + "." + heightCm;
    // Step1: Calculate BMI and save to document
    const calculatedBmi = Helper.calculateBMI(
      parseFloat(newHeight),
      parseFloat(weight)
    );

    const range = await Helper.checkUserBmi(calculatedBmi.toString());

    res.send({message: 'شاخص محاسبه شد',result: {
      bmi: calculatedBmi,
      range: range
    }});

  }
}
