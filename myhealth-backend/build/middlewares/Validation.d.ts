import { NextFunction, Request, Response } from "express";
declare const Validation: (req: Request, res: Response, next: NextFunction) => void;
export default Validation;
