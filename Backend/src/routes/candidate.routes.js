import express from "express";
import candidateController from "../controllers/candidate.controller.js";
import videoController from "../controllers/video.controller.js";
import resumeController from "../controllers/resume.controller.js";
import { uploadResume } from "../middlewares/uploadResume.js";
import { uploadVideo } from "../middlewares/uploadVideo.js";

const router = express.Router();

router.post("/submit-info", candidateController.submitCandidateInfo);

router.post(
  "/upload-resume/:candidateId",
  uploadResume,
  resumeController.uploadCandidateResume
);

router.post(
  "/upload-video/:candidateId",
  uploadVideo,
  videoController.uploadCandidateVideo
);

router.get("/:id", candidateController.getCandidate);

router.get("/download-resume/:fileId", resumeController.downloadResume);
router.get("/stream-video/:fileId", videoController.streamVideo);

export default router;
