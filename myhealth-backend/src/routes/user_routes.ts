import express, { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { UserExistError } from "../errors/user-exist-error";
import { PasswordNotMatchError } from "../errors/password-not-match-error";
import { User } from "../models/User";
import { body, check } from "express-validator";
import Validation from "../middlewares/Validation";
import Auth from "../middlewares/Auth";
import { CompleteProfileError } from "../errors/complete-profile-error";
import Admin from "../middlewares/Admin";
import { UserNotExistError } from "../errors/user-not-exist-error";
import { Helper } from "../classes/Helper";

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("name", "وارد کردن نام کاربر الزامی است")
      .isString()
      .isLength({ min: 3 })
      .notEmpty()
      .withMessage("خطا در نام"),
    body("family", "وارد کردن نام خانوادگی کاربر الزامی است")
      .isString()
      .notEmpty()
      .withMessage("خطا در نام خانوادگی"),
    body("phone_number", "وارد کردن شماره موبایل کاربر الزامی است")
      .isString()
      .isLength({ min: 11 })
      .withMessage("شماره تلفن همراه باید ۱۱ رقم باشد")
      .notEmpty()
      .withMessage("خطا در شماره تلفن همراه")
      .custom((value) => {
        return User.findOne({ user_phone_number: value }).then((user) => {
          if (user) throw new UserExistError(value);
        });
      }),

    check("email").isEmail().withMessage("ایمیل وارد شده اشتباه است"),
  ],

  Validation,
  async (req: Request, res: Response) => {
    if (req.body.password !== req.body.confirm_password)
      throw new PasswordNotMatchError();

    const userExist = await User.findOne({
      user_phone_number: req.body.phone_number,
    });

    if (userExist) throw new UserExistError(userExist.user_phone_number);

    await UserController.registerUserStepOne(req.body, req, res);
  }
);

// Login
router.post(
  "/login",
  [body("user_name"), body("password")],
  Validation,
  async (req: Request, res: Response) => {
    console.log(req.body);
    await UserController.loginUser(req.body, req, res);
  }
);

// Complete profile
router.post(
  "/complete",
  [],
  Validation,
  Auth,
  async (req: Request, res: Response) => {
    const user = req.user;

    // FIXME: Define a middleware that check complete profile
    if (user.user_status == 2) throw new CompleteProfileError();
    await UserController.completeUserProfile(req.body, req, res);
  }
);

router.get("/all", [Auth, Admin], async (req: Request, res: Response) => {
  await UserController.getAllUsers(req, res);
});

router.get("/me", [Auth], async (req: Request, res: Response) => {
  const user = await User.findOne({
    user_phone_number: req.user.user_phone_number,
  });
  if (!user) throw new Error("کاربری یافت نشد");

  const range = await Helper.checkUserBmi(user.user_bmi);


  res.send({
    message: "گاربر دریافت شد",
    result: {
      user,
      range
    },
  });
});

router.post('/change/password',

[

  body('old_password').isString().notEmpty().withMessage('وارد کردن رمز عبور قدیمی الزامی است'),
  body('new_password').isString().notEmpty().withMessage('وارد کردن رمز عبور جدید الزامی است'),
  body('new_password_confirm').isString().notEmpty().withMessage('وارد کردن تکرار رمز عبور جدید الزامی است'),
  


],Validation,[Auth], async(req:Request,res:Response) => {

  await UserController.changePassword(req,res);

});



router.post("/bmi", [Auth], async (req: Request, res: Response) => {
  await UserController.changeBmi(req, res);
});


router.get('/bmi', [Auth],async(req:Request,res:Response) => {
  await UserController.getBmiInformation(req,res);
});



router.get("/:userId", [Auth, Admin], async (req: Request, res: Response) => {
  await UserController.getUserDetails(req, res);
});

router.post('/calculate/bmi',[Auth], async(req:Request,res:Response) => {

  await UserController.calculateBmi(req,res);
});

export default router;
