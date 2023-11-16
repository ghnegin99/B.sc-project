import { Request, Response } from "express";
import { BaseController } from "./BaseController";
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
export declare class UserController extends BaseController {
    static registerUserStepOne(body: IUserInfo, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static loginUser(body: ILoginUserBody, req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static completeUserProfile(body: ICompleteUserInfo, req: Request, res: Response): Promise<void>;
    static getAllUsers(req: Request, res: Response): Promise<void>;
    static getUserDetails(req: Request, res: Response): Promise<void>;
    static changeBmi(req: Request, res: Response): Promise<void>;
    static changePassword(req: Request, res: Response): Promise<void>;
    static getBmiInformation(req: Request, res: Response): Promise<void>;
    static calculateBmi(req: Request, res: Response): Promise<void>;
}
export {};
