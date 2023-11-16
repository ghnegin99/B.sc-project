import mongoose, { Schema, Document } from "mongoose";

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

const RangeSchema = new Schema(
  {
    range_name: {
      type: String,
      required: true,
    },
    range_start: {
      type: Number,
    },
    range_end: {
      type: Number,
    },
    range_status: {
      type: String,
    },
    range_description: {
      type: String,
    },
    range_videos: [
      {
        video_link: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
        },
        video_description: {
          type: String,
        },
      },
    ],
    range_diets: [
      {
        diet_link: {
          type: mongoose.Schema.Types.ObjectId,
          ref:'Diet'
        },
        diet_description: {
          type: String,
        },
      },
    ],
  },
  {
    toJSON: {
      transform: function (doc, ret, any) {
        ret.id = ret._id;
      },
    },
  }
);

export interface RangeBaseDocument extends IRange, Document {}

const Range = mongoose.model<RangeBaseDocument>("Range", RangeSchema);

export { Range, RangeSchema, IRange };
