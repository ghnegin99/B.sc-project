import mongoose, { Document } from "mongoose";
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
declare const VideoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}>;
export interface VideoBaseDocument extends IVideo, Document {
}
declare const Video: mongoose.Model<VideoBaseDocument, {}, {}, {}>;
export { VideoSchema, Video, IVideo };
