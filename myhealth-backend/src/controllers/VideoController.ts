import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { Range } from "../models/Range";

import { IVideo, Video } from "../models/Video";
import { BaseController } from "./BaseController";

export class VideoController extends BaseController {
  static async getAllVideos(req: Request, res: Response) {
    try {
      const videos = await Video.find().populate("video_range");

      res.send({
        message: "تمامی ویدیوها با موفقیت دریافت شد",
        result: {
          videos,
        },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  static async addVideo(body: IVideo, req: Request, res: Response) {
    const {
      video_name,
      video_description,
      video_uploaded_file_name,
      video_affects,
      video_exercise_time,
      video_thmubnail,
      video_length,
      video_level,
      video_range,
      video_status,
      video_tags,
    } = body;

    try {
      const videoLength = await Helper.getVideoDuration(
        video_uploaded_file_name
      );

      let savedVideo = new Video({
        video_name,
        video_description,
        video_uploaded_file_name,
        video_tags,
        video_exercise_time,
        video_length: videoLength,
        video_thmubnail,
        video_level,
        video_range,
        video_status,
      });

      // video_affects.forEach((value) => {
      //   savedVideo.video_affects.push(value);
      // });

      // video_tags.forEach((value) => {
      //   savedVideo.video_tags.push(value);
      // });

      await savedVideo.save();
      // Add video id to range_videos

      const range_video = {
        video_link: savedVideo._id,
        video_description: "dasdfsdf",
      };
      const range = await Range.findById(video_range);

      if (!range) throw new Error("محدوده یافت نشدس");
      range.range_videos?.push(range_video);
      range.save();

      res.send({
        message: `ویدیو ${savedVideo.video_name} با موفقیت اضافه شد`,
        result: {
          video: savedVideo,
        },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  static async getUserVideo(req: Request, res: Response) {
    const user_bmi = req.user.user_bmi;

    const userRange = await Helper.checkUserBmi(user_bmi);

    let videos: any[] = [];
    userRange?.range_videos?.map((video) => {
      videos.push(video.video_link);
    });

    if (videos) {
      Video.find({ _id: { $in: videos } }, function (err, docs) {
        res.send({
          message: "ویدیو های کاربر دریافت شد",
          result: {
            videos: docs,
            length: docs.length
          },
        });
      });
    }
  }

  static async getVideoDetails(req: Request, res: Response) {
    const videoId = req.params.videoId;

    try {
      const video = await Video.findById(videoId);

      if (!video) throw new Error("ویدیو موجود نیست");

      res.send({
        message: "ویدیو دریافت شد",
        result: {
          video,
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
