import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserBaseDocument } from "../models/User";
import moment from "moment";

declare global {
  namespace Express {
    interface Request {
      token: string;
      user: UserBaseDocument; //or can be anythin
    }
  }
}

const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req
      .header("Authorization")
      ?.replace("Bearer ", "");

    if (!token) {
      throw new Error("توکن یافت نشد");
    }
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("خطا در احراز");
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({
      _id: decodedToken.user_id,
      user_phone_number: decodedToken.user_phone_number,
    });

    if (!user) throw new Error("کاربری یافت نشد");

    req.token = token;
    req.user = user;

    next();
  } catch (e: any) {
    if (e.name == "TokenExpiredError") {
      return res.status(401).send({
        error: "خطا در احراز هویت",

        message: "مدت زمان استفاده از برنامه به اتمام رسیده است",
        expireTime: moment(e.expireAt).toLocaleString(),
      });
    }

    throw new Error(e.message);
  }
};

export default Auth;
