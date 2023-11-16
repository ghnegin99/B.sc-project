import { BaseController } from "./BaseController";
import { IRange } from "../models/Range";
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
export declare class RangeController extends BaseController {
    static addRange(body: IRange, req: Request, res: Response): Promise<void>;
    static getRanges(req: Request, res: Response): Promise<void>;
    static getRange(rangeId: String, req: Request, res: Response): Promise<void>;
    static updateRange(): Promise<void>;
    static deleteRange(rangeId: ObjectId, req: Request, res: Response): Promise<void>;
}
