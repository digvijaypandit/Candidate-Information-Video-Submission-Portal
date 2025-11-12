import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import VideoPlayer from "../components/VideoPlayer";
import "../style/Review.css";

export default function Review() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch candidate details
    api
      .get(`/${id}`)
      .then((res) => {
        setCandidate(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching candidate:", err);
        setError("Failed to load candidate details");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!candidate) return;

    // Fetch resume blob URL
    const fetchResume = async () => {
      try {
        const res = await api.get(`/download-resume/${candidate.resumeFileId}`, {
          responseType: "blob",
        });
        const fileURL = URL.createObjectURL(res.data);
        setResumeUrl(fileURL);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    // Fetch video blob URL
    const fetchVideo = async () => {
      try {
        const res = await api.get(`/stream-video/${candidate.videoFileId}`, {
          responseType: "blob",
        });
        const videoBlob = URL.createObjectURL(res.data);
        setVideoUrl(videoBlob);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchResume();
    fetchVideo();
  }, [candidate]);

  if (loading) {
    return (
      <div className="review-container">
        <div className="loading-wrapper">
          <div className="spinner-large"></div>
          <p className="loading-text">Loading candidate details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-container">
        <div className="error-wrapper">
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h3>{error}</h3>
        </div>
      </div>
    );
  }

  if (!candidate) return null;

  return (
    <div className="review-container">
      <div className="review-content">
        {/* Header Section */}
        <div className="review-header">
          <div className="header-content">
            <h1 className="page-title">Application Review</h1>
            <p className="page-subtitle">Review your submitted application details</p>
          </div>
          <div className="status-badge">
            <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Submitted</span>
          </div>
        </div>

        {/* Candidate Information Card */}
        <div className="info-card">
          <div className="card-header">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="card-title">Candidate Information</h2>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">Full Name</label>
              <p className="info-value">
                {candidate.firstName} {candidate.lastName}
              </p>
            </div>
            <div className="info-item">
              <label className="info-label">Position Applied</label>
              <p className="info-value highlight">{candidate.positionApplied}</p>
            </div>
            <div className="info-item">
              <label className="info-label">Current Position</label>
              <p className="info-value">{candidate.currentPosition}</p>
            </div>
            <div className="info-item">
              <label className="info-label">Years of Experience</label>
              <p className="info-value">
                <span className="experience-badge">{candidate.experienceYears} years</span>
              </p>
            </div>
          </div>
        </div>

        {/* Resume Section */}
        <div className="resume-card">
          <div className="card-header">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="card-title">Resume</h2>
          </div>
          <div className="resume-content">
            {resumeUrl ? (
              <a
                href={resumeUrl}
                className="download-btn"
                download={`${candidate.firstName}_${candidate.lastName}_resume.pdf`}
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            ) : (
              <div className="loading-item">
                <div className="spinner-small"></div>
                <span>Loading resume...</span>
              </div>
            )}
          </div>
        </div>

        {/* Video Section */}
        <div className="video-card">
          <div className="card-header">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h2 className="card-title">Introduction Video</h2>
          </div>
          <div className="video-content">
            {videoUrl ? (
              <VideoPlayer src={videoUrl} />
            ) : (
              <div className="video-loading">
                <div className="loading-item">
                  <div className="spinner-small"></div>
                  <span>Loading video...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}