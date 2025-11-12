import candidateService from "../services/candidate.service.js";
import { ApiResponse, ErrorResponse } from "../utils/responseHandler.js";

class CandidateController {
  // Create candidate info
  async submitCandidateInfo(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        positionApplied,
        currentPosition,
        experienceYears,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !positionApplied ||
        !currentPosition ||
        !experienceYears
      ) {
        throw new ErrorResponse(400, "All fields are required");
      }

      const candidateData = {
        firstName,
        lastName,
        positionApplied,
        currentPosition,
        experienceYears,
      };

      const candidate = await candidateService.createCandidate(candidateData);

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            candidate,
            "Candidate created successfully. Proceed to upload resume."
          )
        );
    } catch (error) {
      next(error);
    }
  }

  // Get candidate
  async getCandidate(req, res, next) {
    try {
      const { id } = req.params;
      const candidate = await candidateService.getCandidateById(id);

      return res
        .status(200)
        .json(
          new ApiResponse(200, candidate, "Candidate fetched successfully")
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new CandidateController();
