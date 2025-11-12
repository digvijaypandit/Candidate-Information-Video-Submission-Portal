import { useRef } from "react";
import "./ResumeUpload.css";

export default function ResumeUpload({ onChange, fileName }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        // Create a synthetic event to pass to onChange
        const syntheticEvent = {
          target: {
            files: [file]
          }
        };
        onChange(syntheticEvent);
      }
    }
  };

  return (
    <div className="resume-upload-wrapper">
      <label className="upload-label">
        Upload Resume (PDF, max 5MB)
        <span className="required-star">*</span>
      </label>
      
      <div 
        className="upload-zone" 
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="file-input"
          onChange={onChange}
          required
        />
        
        {!fileName ? (
          <div className="upload-content">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="upload-text">
              <p className="upload-primary">Click to upload or drag and drop</p>
              <p className="upload-secondary">PDF files only (max 5MB)</p>
            </div>
          </div>
        ) : (
          <div className="file-selected">
            <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="file-info">
              <p className="file-name">{fileName}</p>
              <p className="file-action">Click to change file</p>
            </div>
            <svg className="check-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}