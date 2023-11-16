import { ObjectId } from "mongoose";
import { RangeBaseDocument } from "../models/Range";
export declare class Helper {
    static generateRandomToken(): number;
    static generateVerificationCode(): string;
    static calculateBMI(userHeight: number, userWeight: number): number;
    static hashPassword(password: string): Promise<string>;
    static comparePassword(password: string, saved_password: string): Promise<boolean>;
    static generateJWT(user_phone_number: string, user_id: ObjectId): string;
    static getVideoDuration(videoFileName: string): Promise<number>;
    static checkUserBmi(bmi: string): Promise<(RangeBaseDocument & {
        _id: any;
    }) | undefined>;
}
