# Candidate Information & Video Submission Portal

A **full-stack MERN application** that allows candidates to submit their **personal details**, **upload resumes**, and **record short video introductions (≤ 90s)**.

This project was built as part of the assignment ***Candidate Information & Video Submission Portal*** for demonstrating file handling, form validation, and video recording features using modern web technologies.

---

## 🌟 Overview

This system helps streamline the candidate evaluation process by enabling:

* Candidate detail submission
* Resume upload (PDF ≤ 5 MB)
* 90-second video introduction recording
* Review page showing all submitted data
* Secure storage in MongoDB using GridFS

---

## 🏗️ Tech Stack

| Layer               | Technology                                  |
| :------------------ | :------------------------------------------ |
| **Frontend**        | React 18 + Vite + Bootstrap + Axios         |
| **Backend**         | Node.js + Express.js                        |
| **Database**        | MongoDB (with GridFS for video storage)     |
| **Video Recording** | MediaRecorder API                           |
| **File Uploads**    | Multer middleware                           |
| **Validation**      | Client-side (React) + Server-side (Express) |

---

## 🧩 Project Structure

```
Candidate-Information-Video-Submission-Portal/
│
├── frontend/        # React + Vite application
│   ├── src/
│   └── README.md
│
├── backend/         # Node.js + Express server
│   ├── src/
│   └── README.md
│
├── .gitignore
├── README.md         # <-- You are here (root README)
└── package.json      # optional for monorepo scripts
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (local or Atlas)
* A modern web browser (Chrome/Edge/Firefox for MediaRecorder support)

---

## 🚀 Setup Instructions

### 🔹 Step 1: Clone Repository

```bash
git clone https://github.com/digvijaypandit/Candidate-Information-Video-Submission-Portal.git
cd Candidate-Information-Video-Submission-Portal
```

---

### 🔹 Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/candidate_portal
DB_NAME=candidate_portal
CORS_ORIGIN=http://localhost:5173
UPLOAD_RESUME_DIR=uploads/resumes
UPLOAD_VIDEO_DIR=uploads/videos
MAX_FILE_SIZE_MB=5
```

Then start the backend server:

```bash
npm run dev
```

> Server will start at **[http://localhost:8000](http://localhost:8000)**

---

### 🔹 Step 3: Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/candidate
VITE_MAX_FILE_SIZE_MB=5
VITE_ALLOWED_RESUME_TYPES=.pdf
VITE_ALLOWED_VIDEO_TYPES=.webm,.mp4
```

Run the development server:

```bash
npm run dev
```

> Frontend will start at **[http://localhost:5173](http://localhost:5173)**

---

### 🔹 Step 4: Start MongoDB

If using local MongoDB:

```bash
mongod
```

If using Atlas, ensure your connection string in `.env` is correct.

---

### 🔹 Step 5: Verify Setup

1. Open `http://localhost:5173`
2. Fill out candidate info form
3. Upload a PDF resume (≤ 5 MB)
4. Record video introduction (≤ 90 seconds)
5. Review details and confirm submission

✅ You should see data saved in MongoDB and files stored securely.

---

## 🧪 Example API Flow

| Step | Request                                          | Description            |
| :--- | :----------------------------------------------- | :--------------------- |
| 1️⃣  | `POST /api/candidate/submit-info`                | Save candidate details |
| 2️⃣  | `POST /api/candidate/upload-resume/:candidateId` | Upload PDF resume      |
| 3️⃣  | `POST /api/candidate/upload-video/:candidateId`  | Upload video intro     |
| 4️⃣  | `GET /api/candidate/:id`                         | Fetch candidate info   |
| 5️⃣  | `GET /api/candidate/stream-video/:fileId`        | Stream video           |

---

## 📦 Folder Connection Overview

```
Frontend  <==>  Backend API  <==>  MongoDB
```

* Frontend interacts with backend via `VITE_API_BASE_URL`
* Backend validates and stores files/data into MongoDB
* Video streams are served directly using GridFS

---

## 💡 Key Features Implemented

✅ Candidate info form validation
✅ Resume file type & size validation
✅ Video recording using MediaRecorder API
✅ Recording duration check (≤ 90 seconds)
✅ Preview and playback before submission
✅ Downloadable resume & embedded video on review page
✅ Secure storage using Multer + MongoDB GridFS
✅ Clean modular code architecture
✅ Responsive UI with Bootstrap

---

## 🧰 Developer Scripts Summary

| Command           | Description                | Location    |
| :---------------- | :------------------------- | :---------- |
| `npm run dev`     | Start frontend dev server  | `/frontend` |
| `npm run build`   | Build optimized frontend   | `/frontend` |
| `npm run preview` | Preview production build   | `/frontend` |
| `npm run dev`     | Start backend with nodemon | `/backend`  |

---

## 🐞 Troubleshooting

### MongoDB Not Connecting

* Check your `MONGODB_URI` in `.env`
* Ensure MongoDB service is running

### Video Not Uploading

* Verify MediaRecorder API permission
* Check browser console for file size/duration validation errors

### CORS Error

* Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL

---

## 📚 Resources

* [React Docs](https://react.dev/)
* [Node.js Docs](https://nodejs.org/en/docs/)
* [Express Docs](https://expressjs.com/)
* [MongoDB Docs](https://www.mongodb.com/docs/)
* [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)

---

## 👨‍💻 Author

**Digvijay Pandit**
📧 [panditdigvijay2003@gmail.com](mailto:panditdigvijay2003@gmail.com)
🔗 [GitHub Profile](https://github.com/digvijaypandit)

---

## 🪪 License

This project was created as part of the **Candidate Information & Video Submission Portal Assignment**.
All rights reserved © 2025 **Digvijay Pandit**
