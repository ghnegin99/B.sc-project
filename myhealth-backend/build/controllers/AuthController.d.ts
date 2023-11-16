import { Request, Response } from "express";
import { BaseController } from "./BaseController";
interface verificationRequestBody {
    verify_code: string;
    phone_number: string;
}
export declare class AuthController extends BaseController {
    static verifyUser(body: verificationRequestBody, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
