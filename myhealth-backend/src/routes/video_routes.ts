import express, { Request, Response } from "express";
import { VideoController } from "../controllers/VideoController";
import Admin from "../middlewares/Admin";
import Auth from "../middlewares/Auth";
import multer from "multer";
import path from "path";
import slug from "slug";
import rndStr from "randomstring";
import Validation from "../middlewares/Validation";

const router = express.Router();

const videoMulterConf = {
  storage: multer.diskStorage({
    destination: function (req, file, next) {
      next(null, path.join(__dirname, "../../public/videos"));
    },
    filename: function (req, file, next) {
      const ext = file.mimetype.split("/")[1];
      next(null, rndStr.generate(6) + "-" + Date.now() + "." + ext);
    },
  }),
};

const thumbnailMulterConf = {
  storage: multer.diskStorage({
    destination: function (req, file, next) {
      next(null, path.join(__dirname, "../../public/thumbnails"));
    },
    filename: function (req, file, next) {
      const ext = file.mimetype.split("/")[1];
      next(null, rndStr.generate(6) + "-" + Date.now() + "." + ext);
    },
  }),
};
router.post(
  "/upload",
  Auth,
  Admin,
  multer(videoMulterConf).single("video_file"),
  async (req: Request, res: Response) => {
    if (req.file) {
      res.send({
        message: "ویدیو با موفقیت آپلود شد",
        result: {
          destination: req.file.destination,
          filename: req.file.filename,
        },
      });
    }
  }
);

router.post(
  "/thumbnail/upload",
  Auth,
  Admin,
  multer(thumbnailMulterConf).single("thumb_file"),
  async (req: Request, res: Response) => {
    if (req.file) {
      res.send({
        message: "تصویر با موفقیت آپلود شد",
        result: {
          destination: req.file.destination,
          filename: req.file.filename,
        },
      });
    }
  }
);

router.post(
  "/",
  //   [],
  //   Validation,
  //   Auth,
  //   Admin,
  async (req: Request, res: Response) => {
    await VideoController.addVideo(req.body, req, res);
  }
);

router.get("/all", [Auth, Admin], async (req: Request, res: Response) => {
  await VideoController.getAllVideos(req, res);
});

router.get("/me", [Auth], async (req: Request, res: Response) => {
  await VideoController.getUserVideo(req, res);
});

router.get("/details/:videoId", [Auth], async (req: Request, res: Response) => {
  await VideoController.getVideoDetails(req, res);
});

export default router;
