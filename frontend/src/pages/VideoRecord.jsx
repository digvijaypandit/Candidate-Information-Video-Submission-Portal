import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../style/VideoRecord.css";

export default function VideoRecord() {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const liveVideoRef = useRef(null);
  const playbackRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [uploading, setUploading] = useState(false);

  const MAX_SECONDS = 90;

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      liveVideoRef.current.srcObject = stream;
      liveVideoRef.current.muted = true;
      await liveVideoRef.current.play();

      const mimeType = MediaRecorder.isTypeSupported("video/webm; codecs=vp8")
        ? "video/webm; codecs=vp8"
        : "video/webm";

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      setRecordedBlob(null);
      setRecording(true);
      setSeconds(0);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        clearInterval(timerRef.current);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        if (chunksRef.current.length === 0) {
          alert("No data was recorded. Try again.");
          setRecording(false);
          return;
        }

        const blob = new Blob(chunksRef.current, { type: mimeType });
        setRecordedBlob(blob);

        if (liveVideoRef.current) liveVideoRef.current.srcObject = null;
      };

      recorder.start();
      console.log("Recording started");

      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev + 1 >= MAX_SECONDS) {
            stopRecording();
            return prev + 1;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Error accessing camera/mic:", err);
      alert("Could not access your camera or microphone.");
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "recording") {
      console.log("Stopping recording...");
      recorder.stop();
    }
    setRecording(false);
    clearInterval(timerRef.current);
  };

  const uploadVideo = async () => {
    if (!recordedBlob) {
      alert("No video recorded yet.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("video", recordedBlob);

    try {
      await api.post(`/upload-video/${candidateId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/review/${candidateId}`);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (recordedBlob && playbackRef.current) {
      const url = URL.createObjectURL(recordedBlob);
      playbackRef.current.src = url;
      playbackRef.current.load();
      console.log("Playback ready:", url);
    }
  }, [recordedBlob]);

  const progressPercentage = (seconds / MAX_SECONDS) * 100;

  return (
    <div className="video-record-container">
      <div className="video-record-card">
        <div className="header">
          <h2 className="title">
            <span className="icon">🎥</span>
            Record Your Video
          </h2>
          <p className="subtitle">
            {recordedBlob 
              ? "Preview your recording before uploading" 
              : recording 
              ? "Recording in progress..." 
              : "Click the button below to start recording"}
          </p>
        </div>

        <div className="video-wrapper">
          {!recordedBlob && (
            <video
              ref={liveVideoRef}
              className="video-preview"
              autoPlay
              muted
            />
          )}

          {recordedBlob && (
            <video
              ref={playbackRef}
              className="video-preview"
              controls
            />
          )}

          {!recording && !recordedBlob && !streamRef.current && (
            <div className="video-placeholder">
              <div className="placeholder-content">
                <svg className="camera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p>Camera preview will appear here</p>
              </div>
            </div>
          )}

          {recording && (
            <div className="recording-indicator">
              <span className="rec-dot"></span>
              <span>REC</span>
            </div>
          )}
        </div>

        {recording && (
          <div className="timer-section">
            <div className="timer-display">
              <span className="time-current">{formatTime(seconds)}</span>
              <span className="time-separator">/</span>
              <span className="time-max">01:30</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="button-group">
          {!recording && !recordedBlob && (
            <button className="btn btn-start" onClick={startRecording}>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              Start Recording
            </button>
          )}

          {recording && (
            <button className="btn btn-stop" onClick={stopRecording}>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              Stop Recording
            </button>
          )}

          {!recording && recordedBlob && (
            <>
              <button className="btn btn-secondary" onClick={startRecording}>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Re-record
              </button>
              <button
                className="btn btn-primary"
                onClick={uploadVideo}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <span className="spinner"></span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Video
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {recordedBlob && (
          <div className="info-message">
            <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Review your video using the controls above before uploading</p>
          </div>
        )}
      </div>
    </div>
  );
}