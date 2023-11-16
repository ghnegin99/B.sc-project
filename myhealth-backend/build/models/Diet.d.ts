import mongoose, { Document } from "mongoose";
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
declare const DietSchema: mongoose.Schema<DietBaseDocument, mongoose.Model<DietBaseDocument, any, any, any>, {}>;
export interface DietBaseDocument extends IDiet, Document {
}
declare const Diet: mongoose.Model<DietBaseDocument, {}, {}, {}>;
export { Diet, DietSchema, IDiet };
