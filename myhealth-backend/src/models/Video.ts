import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface IVideo extends Document {
  video_name: string;
  video_length: number;
  video_exercise_time: string;
  video_level: string;
  video_description: string;
  video_affects: [];
  video_uploaded_file_name: string;
  video_tags: [];
  video_range: mongoose.Schema.Types.ObjectId;
  video_status: number;
  video_thmubnail: string;
}

const VideoSchema = new Schema(
  {
    id: {
      type: Number,
    },
    video_name: {
      type: String,
    },
    video_thmubnail: {
      type: String,
    },
    video_length: { type: Number },
    video_exercise_time: {
      type: String,
    },
    video_grade: {},
    video_description: {
      type: String,
    },
    video_status: {
      type: Number,
      default: 0,
    },
    video_affects: [],
    video_uploaded_file_name: { type: String },
    video_tags: [],
    video_range: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Range",
    },
  },
  {
    toJSON: {
      transform: (doc, ret, any) => {
        ret.id = ret._id;
      },
    },
  }
);

export interface VideoBaseDocument extends IVideo, Document {}

const Video = mongoose.model<VideoBaseDocument>("Video", VideoSchema);

VideoSchema.pre("save", function (next: any) {
  var doc = this;

  console.log("Pre Save");
});

export { VideoSchema, Video, IVideo };
