import resumeService from "../services/resume.service.js";
import { ErrorResponse } from "../utils/responseHandler.js";

class ResumeController {

  // Upload resume
  async uploadCandidateResume(req, res, next) {
    try {
      const { candidateId } = req.params;
      const resumeFileId = req.fileId;

      if (!resumeFileId) throw new ErrorResponse(400, "Resume upload failed");

      const updatedCandidate = await resumeService.attachResume(
        candidateId,
        resumeFileId
      );

      res
        .status(200)
        .json(
          new ApiResponse(200, updatedCandidate, "Resume uploaded successfully")
        );
    } catch (error) {
      next(error);
    }
  }

  // download resume
  async downloadResume(req, res, next) {
    try {
      const { fileId } = req.params;
      const { bucket, file } = await resumeService.getResumeById(fileId);

      res.set({
        "Content-Type": file.contentType || "application/pdf",
        "Content-Disposition": `attachment; filename="${file.filename}"`,
      });

      const downloadStream = bucket.openDownloadStream(file._id);
      downloadStream.pipe(res);

      downloadStream.on("error", (err) => next(new ErrorResponse(500, err.message)));
    } catch (error) {
      next(error);
    }
  }
}

export default new ResumeController();
