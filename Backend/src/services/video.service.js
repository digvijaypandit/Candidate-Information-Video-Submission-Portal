import mongoose from "mongoose";
import Candidate from "../models/candidate.model.js";
import { GridFSBucket } from "mongodb";
import { ErrorResponse } from "../utils/responseHandler.js";

class VideoService {
  // Attach video file to candidate
  async attachVideo(candidateId, videoFileId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        throw new ErrorResponse(400, "Invalid candidate ID");
      }

      const candidate = await Candidate.findByIdAndUpdate(
        candidateId,
        { videoFileId },
        { new: true }
      );

      if (!candidate) {
        throw new ErrorResponse(404, "Candidate not found");
      }

      return candidate;
    } catch (error) {
      console.error("DB Error in attachVideo:", error);
      throw new ErrorResponse(500, "Database Error", [error.message]);
    }
  }

  // get video file of candidate
  async getVideoById(fileId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(fileId)) {
        throw new ErrorResponse(400, "Invalid video file ID");
      }

      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const files = await bucket
        .find({ _id: new mongoose.Types.ObjectId(fileId) })
        .toArray();

      if (!files || files.length === 0) {
        throw new ErrorResponse(404, "Video not found");
      }

      return { bucket, file: files[0] };
    } catch (error) {
      console.error("Error in getVideoById:", error);
      throw new ErrorResponse(500, "Error fetching video", [error.message]);
    }
  }
}

export default new VideoService();
