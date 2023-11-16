import express, { Request, Response } from "express";
import { RangeController } from "../controllers/RangeController";
import Admin from "../middlewares/Admin";
import Auth from "../middlewares/Auth";
import Validation from "../middlewares/Validation";
import { body } from "express-validator";

const router = express.Router();

// Add Range Route
router.post(
  "/",
  [
    body("range_name")
      .isString()
      .notEmpty()
      .withMessage("وارد کردن نام محدوده الزامی است"),
    body("range_number"),
    body("range_description"),
  ],
  Validation,
  Auth,
  Admin,
  async (req: Request, res: Response) => {
    await RangeController.addRange(req.body, req, res);
  }
);

// Get All Ranges
router.get("/all", Auth,Admin, async (req: Request, res: Response) => {
  await RangeController.getRanges(req, res);
});

// Get Specific Rang
router.get("/:rangeId", Auth, Admin, async (req: Request, res: Response) => {
  const rangeId = req.params.rangeId;
  await RangeController.getRange(rangeId, req, res);
});

// Update Range Route

// Delete Range Route

export default router;
