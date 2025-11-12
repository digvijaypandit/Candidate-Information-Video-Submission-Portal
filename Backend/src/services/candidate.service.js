import mongoose from "mongoose";
import Candidate from "../models/candidate.model.js";
import { ErrorResponse } from "../utils/responseHandler.js";

class CandidateService {
  // Create candidate
  async createCandidate(data) {
    try {
      const required = [
        "firstName",
        "lastName",
        "positionApplied",
        "currentPosition",
        "experienceYears",
      ];

      const missing = required.filter((key) => !data[key]);
      if (missing.length) {
        throw new ErrorResponse(400, `Missing required fields: ${missing.join(", ")}`);
      }

      const candidate = await Candidate.create(data);
      return candidate;
    } catch (error) {
      console.error("DB Error in createCandidate:", error);
      throw new ErrorResponse(500, "Database Error", [error.message]);
    }
  }

  // Fetch candidate by ID
  async getCandidateById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorResponse(400, "Invalid candidate ID");
      }

      const candidate = await Candidate.findById(id).lean();

      if (!candidate) {
        throw new ErrorResponse(404, "Candidate not found");
      }

      return candidate;
    } catch (error) {
      console.error("DB Error in getCandidateById:", error);
      throw new ErrorResponse(500, "Database Error", [error.message]);
    }
  }
}

export default new CandidateService();
