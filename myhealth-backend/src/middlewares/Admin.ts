import { Request, Response, NextFunction } from "express";

import { AccessDeniedError } from "../errors/access-denied-error";

const Admin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user.user_is_admin && user.user_roll != 2) {
    throw new AccessDeniedError();
  }

  next();
};

export default Admin;
