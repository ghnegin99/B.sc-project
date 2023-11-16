import { Request, Response, NextFunction } from "express";
import { UserBaseDocument } from "../models/User";
declare global {
    namespace Express {
        interface Request {
            token: string;
            user: UserBaseDocument;
        }
    }
}
declare const Auth: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default Auth;
