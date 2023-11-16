import { Request, Response } from "express";
import { IVideo } from "../models/Video";
import { BaseController } from "./BaseController";
export declare class VideoController extends BaseController {
    static getAllVideos(req: Request, res: Response): Promise<void>;
    static addVideo(body: IVideo, req: Request, res: Response): Promise<void>;
    static getUserVideo(req: Request, res: Response): Promise<void>;
    static getVideoDetails(req: Request, res: Response): Promise<void>;
}
