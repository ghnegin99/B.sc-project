import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { getVideoDurationInSeconds } from "get-video-duration";
import path from "path";
import { Range, RangeBaseDocument } from "../models/Range";

export class Helper {
  static generateRandomToken(): number {
    return 345;
  }

  static generateVerificationCode(): string {
    // This method generates a random verification code between 11111 and 99999
    return Math.round(Math.random() * (99999 - 11111) + 11111).toString();
  }

  static calculateBMI(userHeight: number, userWeight: number): number {
    const height = Math.pow(userHeight, 2);

    return Math.round(userWeight / height);
  }

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  static async comparePassword(password: string, saved_password: string) {
    const comparePassword = await bcrypt.compare(password, saved_password);

    return comparePassword;
  }

  static generateJWT(user_phone_number: string, user_id: ObjectId) {
    if (!process.env.JWT_SECRET_KEY) throw new Error("کلید احراز یافت نشد");
    return jwt.sign({ user_id, user_phone_number }, process.env.JWT_SECRET_KEY);
  }

  static async getVideoDuration(videoFileName: string) {
    const videos_folder = path.join(__dirname, "../public/videos");

    const video_src = videos_folder + "/" + videoFileName;
    console.log(video_src);

    return await getVideoDurationInSeconds(video_src);
  }

  static async checkUserBmi(bmi: string) {
    const bmiInt = parseFloat(bmi);

    console.log(bmiInt);

    const allBmi = await Range.find();
    console.log(allBmi);

    return allBmi.find((singleBmi) => {
      if (singleBmi.range_start < bmiInt && singleBmi.range_end > bmiInt) {
        return singleBmi;
      }
    });
  }
}
