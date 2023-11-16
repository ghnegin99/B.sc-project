import express, { Request, Response } from "express";
import { userInfo } from "os";
import Validation from "../middlewares/Validation";
import { User } from "../models/User";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { UserNotExistError } from "../errors/user-not-exist-error";

// Initialize  router
const router = express.Router();

// Auth Routes

/**
 * Register
 * @Param body
 */
router.post(
  "/verify",
  [
    body("verify_code", "وارد کردن فیلد کد فعالسازی الزامی است")
      .notEmpty()
      .withMessage("کد فعالسازی الزامی است")
      .isLength({ min: 5, max: 5 })
      .withMessage("کد فعالسازی باید ۵ رقمی باشد"),

    body("phone_number", "وارد کردن فیلد شماره موبایل الزامی است")
      .notEmpty()
      .withMessage("شماره موبایل الزامی است")
      .isLength({ min: 11, max: 11 })
      .withMessage("شماره موبایل ۱۱ رقمی است"),
  ],
  Validation,
  async (req: Request, res: Response) => {
    // Check if the user is exist or not
    const userExist = await User.findOne({
      user_phone_number: req.body.phone_number,
    });
    if (!userExist) throw new UserNotExistError(req.body.phone_number);

    await AuthController.verifyUser(req.body, req, res);
  }
);

export default router;
