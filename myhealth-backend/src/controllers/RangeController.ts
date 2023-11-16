import { BaseController } from "./BaseController";
import { IRange, Range } from "../models/Range";
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { NotFoundError } from "../errors/not-found-error";

export class RangeController extends BaseController {
  static async addRange(body: IRange, req: Request, res: Response) {
    // Step1: Destructure body request
    const {
      range_name,
      range_start,
      range_status,
      range_end,
      range_description,
    } = body;

    // Step2: Create range with entered information
    let range = new Range({
      range_name,
      range_start,
      range_end,
      range_status,
      range_description,
    });

    await range.save();

    // Step3: Response
    res.send({
      message: `محدوده BMI ${range.range_start} - ${range.range_end} با موفقیت اضافه شد`,
      result: {
        range,
      },
    });
  }

  static async getRanges(req: Request, res: Response) {
    try {
      const ranges = await Range.find();

      res.send({
        message: "تمامی محدوده ها دریافت شد",
        result: {
          ranges,
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  static async getRange(rangeId: String, req: Request, res: Response) {
    try {
      const range = await Range.findById(rangeId);

      if (!range) throw new Error("محدوده BMI مورد نظر یافت نشد");

      res.send({
        message: `محدوده BMI ${range.range_start} - ${range.range_end} دریافت شد`,
        result: {
          range,
        },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  static async updateRange() {}

  static async deleteRange(rangeId: ObjectId, req: Request, res: Response) {
    // Delete Cascade Range and Videos and Diet
  }
}
