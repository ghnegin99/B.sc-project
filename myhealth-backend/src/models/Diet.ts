import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface IDiet extends Document {
  diet_name: string;
  diet_description: string;
  diet_image: string;
  diet_plan: {
    plan_breakfast: string;
    plan_lunch: string;
    plan_dinner: string;
    plan_snack: string;
  };

  diet_range: mongoose.Schema.Types.ObjectId;
}

const DietSchema = new Schema<DietBaseDocument>(
  {
    diet_name: {
      type: String,
    },
    diet_description: {
      type: String,
    },
    diet_image: {
      type: String,
    },
    diet_plan: {
      plan_breakfast: {
        type: String,
      },
      plan_lunch: {
        type: String,
      },
      plan_dinner: {
        type: String,
      },
      plan_snack: {
        type: String,
      },
    },
    diet_range: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Range",
    },
  },
  {
    toJSON: {
      transform: (doc, ret, ant) => {
        ret.id = ret._id;
      },
    },
  }
);

export interface DietBaseDocument extends IDiet, Document {}
const Diet = mongoose.model<DietBaseDocument>("Diet", DietSchema);

export { Diet, DietSchema, IDiet };
