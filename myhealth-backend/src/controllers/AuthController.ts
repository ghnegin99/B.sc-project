import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { UserNotExistError } from "../errors/user-not-exist-error";
import { VerificationCodeWrongError } from "../errors/verification-code-wrong-error";
import { User } from "../models/User";
import { BaseController } from "./BaseController";

interface verificationRequestBody {
  verify_code: string;
  phone_number: string;
}

export class AuthController extends BaseController {
  static async verifyUser(
    body: verificationRequestBody,
    req: Request,
    res: Response
  ) {
    const { verify_code, phone_number } = body;

    // Step1: Check if the verify_code is exist for this user with entered phone_nubmer
    const user = await User.findOne({ user_phone_number: phone_number });
    if (!user) throw new UserNotExistError(phone_number);

    // Step2: Check verify_code and user_verify_code is equal or not
    if (user.user_verify_code != verify_code)
      throw new VerificationCodeWrongError();

    // Step3: Change to user status to authenticated
    user.user_status = 1;
    user.user_verify_code = null;
    user.user_is_verified = true;
    user.user_history.push({
      history_type: 1,
      history_details: "احراز هویت",
    });
    await user.save();

    // Step4: Generate JSON Web Token For Authentication
    const auth_token = Helper.generateJWT(user.user_phone_number, user._id);

    return res.send({
      message: "احراز هویت انجام شد",
      result: {
        user_name: user.user_name,
        user_phone_number: user.user_phone_number,
        user_status: user.user_status,
        user_auth_token: auth_token,
      },
    });
  }
}
