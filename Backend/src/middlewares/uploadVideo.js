import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, //50 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Invalid video format! Only video files are allowed."));
    }
    cb(null, true);
  },
});

export const uploadVideo = [
  upload.single("video"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new Error("No video file uploaded");
      }

      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const filename = `video-${Date.now()}.${req.file.mimetype.split("/")[1]}`;
      const uploadStream = bucket.openUploadStream(filename, {
        contentType: req.file.mimetype,
      });

      uploadStream.end(req.file.buffer);

      uploadStream.on("error", (err) => {
        console.error("Error uploading video to GridFS:", err);
        next(err);
      });

      uploadStream.on("finish", () => {
        req.fileId = uploadStream.id;
        next();
      });
    } catch (error) {
      next(error);
    }
  },
];
