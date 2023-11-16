import express, { Request, Response } from "express";
import { DietController } from "../controllers/DietController";
import Admin from "../middlewares/Admin";
import Auth from "../middlewares/Auth";

const router = express.Router();

// Add new diet
router.post("/", async (req: Request, res: Response) => {
  await DietController.addNewDiet(req.body, req, res);
});

// Update a diet

// Get a diet plan based on body mass index (bmi)
router.get("/me", [Auth], async (req: Request, res: Response) => {
  await DietController.getUserDiets(req, res);
});

// Get all diets (admin)
router.get("/all", [Auth, Admin], async (req: Request, res: Response) => {
  await DietController.getAllDiets(req, res);
});

// Delete a diet
router.delete(
  "/:dietId",
  [Auth, Admin],
  async (req: Request, res: Response) => {
    const dietId = req.params.dietId;
    if (!dietId) throw new Error("آیدی برنامه غذایی ارسال نشده است");
    await DietController.deleteDiet(dietId, req, res);
  }
);
export default router;
