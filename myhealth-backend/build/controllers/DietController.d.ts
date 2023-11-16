import { BaseController } from "./BaseController";
import { IDiet } from "../models/Diet";
import { Request, Response } from "express";
export declare class DietController extends BaseController {
    static addNewDiet(body: IDiet, req: Request, res: Response): Promise<void>;
    static getAllDiets(req: Request, res: Response): Promise<void>;
    static getUserDiets(req: Request, res: Response): Promise<void>;
    static deleteDiet(dietId: string, req: Request, res: Response): Promise<void>;
}
