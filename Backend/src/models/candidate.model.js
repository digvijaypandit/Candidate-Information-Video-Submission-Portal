import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    positionApplied: {
      type: String,
      required: true,
    },
    currentPosition: {
      type: String,
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
      min: 0,
    },
    resumeFileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
    },
    videoFileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", CandidateSchema);

export default Candidate;
