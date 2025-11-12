import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed!"));
    }
    cb(null, true);
  },
});

export const uploadResume = [
  upload.single("resume"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new Error("No resume file uploaded");
      }

      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const filename = `resume-${Date.now()}-${req.file.originalname}`;
      const uploadStream = bucket.openUploadStream(filename, {
        contentType: req.file.mimetype,
      });

      uploadStream.end(req.file.buffer);

      uploadStream.on("error", (err) => {
        console.error("Error uploading resume to GridFS:", err);
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
