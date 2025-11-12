import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import FormInput from "../components/FormInput";
import ResumeUpload from "../components/ResumeUpload";
import "../style/CandidateForm.css";

export default function CandidateForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    positionApplied: "",
    currentPosition: "",
    experienceYears: "",
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Submit basic info (no file)
      const infoRes = await api.post("/submit-info", form);
      const candidateId = infoRes.data.data._id;

      if (!resume) {
        setLoading(false);
        return setError("Please upload your resume");
      }

      // Step 2: Upload resume file
      const resumeForm = new FormData();
      resumeForm.append("resume", resume);

      await api.post(`/upload-resume/${candidateId}`, resumeForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Step 3: Redirect to video recording page
      navigate(`/record-video/${candidateId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="candidate-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <div className="header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="form-title">Candidate Application</h1>
          <p className="form-subtitle">Please fill in your details to continue</p>
          
          {/* Progress Indicator */}
          <div className="progress-steps">
            <div className="step active">
              <div className="step-number">1</div>
              <span className="step-label">Information</span>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-number">2</div>
              <span className="step-label">Video</span>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-number">3</div>
              <span className="step-label">Review</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-alert">
            <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="candidate-form">
          <div className="form-section">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h3>
            
            <div className="form-row">
              <FormInput
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Professional Details
            </h3>
            
            <FormInput
              label="Position Applied"
              name="positionApplied"
              placeholder="e.g., Senior Software Engineer"
              value={form.positionApplied}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Current Position"
              name="currentPosition"
              placeholder="e.g., Software Engineer"
              value={form.currentPosition}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Years of Experience"
              name="experienceYears"
              type="number"
              placeholder="0"
              value={form.experienceYears}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Resume Upload
            </h3>
            
            <ResumeUpload 
              onChange={(e) => setResume(e.target.files[0])} 
              fileName={resume?.name}
            />
          </div>

          <button
            className="submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Submitting...
              </>
            ) : (
              <>
                Continue to Video Recording
                <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}