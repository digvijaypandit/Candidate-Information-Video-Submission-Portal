import videoService from "../services/video.service.js";
import { ApiResponse, ErrorResponse } from "../utils/responseHandler.js";

class VideoController {
  // Upload video
  async uploadCandidateVideo(req, res, next) {
    try {
      const { candidateId } = req.params;
      const videoFileId = req.fileId;

      if (!videoFileId) throw new ErrorResponse(400, "Video upload failed");

      const updatedCandidate = await videoService.attachVideo(
        candidateId,
        videoFileId
      );

      res
        .status(200)
        .json(
          new ApiResponse(200, updatedCandidate, "Video uploaded successfully")
        );
    } catch (error) {
      next(error);
    }
  }

  // stream video
  async streamVideo(req, res, next) {
    try {
      const { fileId } = req.params;
      const { bucket, file } = await videoService.getVideoById(fileId);

      res.set({
        "Content-Type": file.contentType || "video/mp4",
        "Accept-Ranges": "bytes",
      });

      const downloadStream = bucket.openDownloadStream(file._id);
      downloadStream.pipe(res);

      downloadStream.on("error", (err) =>
        next(new ErrorResponse(500, err.message))
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new VideoController();
