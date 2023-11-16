import mongoose, { Document } from "mongoose";
interface IRange extends Document {
    range_name: string;
    range_start: number;
    range_end: number;
    range_status: string;
    range_videos?: [
        {
            video_link: mongoose.Schema.Types.ObjectId;
            video_description: string;
        }
    ];
    range_diets?: [
        {
            diet_link: mongoose.Schema.Types.ObjectId;
            diet_description?: string;
        }
    ];
    range_description?: string;
}
declare const RangeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}>;
export interface RangeBaseDocument extends IRange, Document {
}
declare const Range: mongoose.Model<RangeBaseDocument, {}, {}, {}>;
export { Range, RangeSchema, IRange };
