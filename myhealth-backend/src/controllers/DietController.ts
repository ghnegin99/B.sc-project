import { BaseController } from "./BaseController";

// Diet Interface
import { Diet, IDiet } from "../models/Diet";
import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { Range } from "../models/Range";

export class DietController extends BaseController {
  static async addNewDiet(body: IDiet, req: Request, res: Response) {
    // Step0: Destructure request body
    const { diet_name, diet_plan, diet_description, diet_range, diet_image } =
      body;

    try {
      // Step1: Add diet
      let diet = new Diet({
        diet_name,
        diet_description,
        diet_plan: {
          plan_breakfast: diet_plan.plan_breakfast,
          plan_lunch: diet_plan.plan_lunch,
          plan_dinner: diet_plan.plan_dinner,
          plan_snack: diet_plan.plan_snack,
        },
        diet_range,
        diet_image,
      });

      await diet.save();

      const dietRange = {
        diet_link: diet._id,
      };
      const foundedRange = await Range.findById(diet_range);
      if (!foundedRange) throw new Error("محدوده ای یافت نشد");

      foundedRange.range_diets?.push(dietRange);

      foundedRange.save();

      res.send({
        message: `برنامه غذایی "${diet.diet_name}" با موفقیت اضافه شد`,
        result: {
          diet,
        },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  static async getAllDiets(req: Request, res: Response) {
    try {
      // Step1: Get all diets
      const diets = await Diet.find().populate("diet_range");

      // Step2: Response to user
      res.send({
        message: "تمامی برنامه های غذایی دریافت شد",
        result: {
          diets,
        },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  static async getUserDiets(req: Request, res: Response) {
    // Step1: Get user from user request
    const user = req.user;

    // Step2: Check if the user_bmi was calculated or not
    const userBmiIsExist = user.user_bmi != null;
    if (!userBmiIsExist)
      throw new Error("شاخص توده بدنی BMI شما هنوز محاسبه نشده است");


      
    // Step2:
    const userRange = await Helper.checkUserBmi(user.user_bmi);
    
    if (!userRange) throw new Error("خطا در دریافت BMI شما");


    let diets: any[] = [];
    userRange?.range_diets?.map((diet) =>{
      diets.push(diet.diet_link);
    });


    console.log(diets);
    if(diets) {
        Diet.find({'_id': { $in: diets}}, function(err, docs){

            res.send({
              message: "ویدیو های کاربر دریافت شد",
              result:{
                diets: docs,
                length: docs.length
              }
            });
        })
    }

    
  }

  static async deleteDiet(dietId: string, req: Request, res: Response) {}
}
