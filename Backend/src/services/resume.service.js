import mongoose from "mongoose";
import Candidate from "../models/candidate.model.js";
import { GridFSBucket } from "mongodb";
import { ErrorResponse } from "../utils/responseHandler.js";

class ResumeService {
  // Attach resume file to candidate
  async attachResume(candidateId, resumeFileId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        throw new ErrorResponse(400, "Invalid candidate ID");
      }

      const candidate = await Candidate.findByIdAndUpdate(
        candidateId,
        { resumeFileId },
        { new: true }
      );

      if (!candidate) {
        throw new ErrorResponse(404, "Candidate not found");
      }

      return candidate;
    } catch (error) {
      console.error("DB Error in attachResume:", error);
      throw new ErrorResponse(500, "Database Error", [error.message]);
    }
  }

  // Find resume file of candidate
  async getResumeById(fileId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(fileId)) {
        throw new ErrorResponse(400, "Invalid resume file ID");
      }

      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const files = await bucket
        .find({ _id: new mongoose.Types.ObjectId(fileId) })
        .toArray();

      if (!files || files.length === 0) {
        throw new ErrorResponse(404, "Resume not found");
      }

      return { bucket, file: files[0] };
    } catch (error) {
      console.error("Error in getResumeById:", error);
      throw new ErrorResponse(500, "Error fetching resume", [error.message]);
    }
  }
}

export default new ResumeService();
