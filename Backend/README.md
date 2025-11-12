# Candidate Management Backend

A **Node.js + Express** REST API for managing **candidate profiles**, including personal info, resume uploads, and video introductions. Built for smooth integration with a  **React** frontend.

---

## 🚀 Features

- Submit candidate information
- Upload resumes and videos securely
- Stream video files directly
- Download resumes
- Organized MVC + Service layer architecture
- Easy environment setup with `.env`
- Nodemon for auto-restart during development

---

## 🧩 Folder Structure

```
backend/
├──src
│   ├── controllers/
│   │   ├── candidate.controller.js
│   │   ├── resume.controller.js
│   │   └── video.controller.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   ├── uploadResume.js
│   │   └── uploadVideo.js
│   │
│   ├── routes/
│   │   └── candidate.routes.js
│   │
│   ├── services/
│   │   ├── candidate.service.js
│   │   ├── resume.service.js
│   │   └── video.service.js
│   │
│   ├── uploads/
│   │   ├── resumes/
│   │   └── videos/
│   ├── app.js
│   └── index.js
├── .env
├── package.json
```

---

## ⚙️ Environment Variables (`.env`)

Copy and paste this into your `.env` file in the project root:

```env
# ========================
# 🌍 Server Configuration
# ========================
PORT=8000

# ========================
# 🗄️ Database Configuration
# ========================
MONGODB_URI=#your_DB_URI
DB_NAME=#your_DB_NAME

# ========================
# 🔐 CORS Configuration
# ========================
CORS_ORIGIN=http://localhost:5173

# ========================
# 📁 File Upload Configuration
# ========================
UPLOAD_RESUME_DIR=uploads/resumes
UPLOAD_VIDEO_DIR=uploads/videos
MAX_FILE_SIZE_MB=50
```

> 💡 **Note:** Replace `#your_DB_URI` and `#your_DB_NAME` with your actual MongoDB connection details. Ensure your frontend origin matches `CORS_ORIGIN`.

---

## 📦 Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/digvijaypandit/Candidate-Information-Video-Submission-Portal.git
cd backend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file and paste the configuration above

# 4️⃣ Run the project
# If you have nodemon installed globally:
nodemon index.js

# Or install nodemon locally:
npm install nodemon --save-dev

# Add this script in package.json:
# "scripts": { "dev": "nodemon index.js" }

# Then run:
npm run dev
```

---

## 🛠 API Endpoints

### 🧾 Candidate Routes

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| **POST** | `/api/candidate/submit-info` | Submit candidate's personal information |
| **GET** | `/api/candidate/:id` | Get candidate information by ID |

### 📄 Resume Routes

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| **POST** | `/api/candidate/upload-resume/:candidateId` | Upload a candidate's resume |
| **GET** | `/api/candidate/download-resume/:fileId` | Download the candidate's resume |

> Uses middleware: `uploadResume`

### 🎥 Video Routes

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| **POST** | `/api/candidate/upload-video/:candidateId` | Upload candidate's introduction video |
| **GET** | `/api/candidate/stream-video/:fileId` | Stream candidate's video file |

> Uses middleware: `uploadVideo`

---

## 🧠 Controllers Overview

| Controller | Description |
|:-----------|:------------|
| `candidate.controller.js` | Handles candidate data submission and retrieval |
| `resume.controller.js` | Manages resume upload/download |
| `video.controller.js` | Handles video upload and streaming |

---

## 🧰 Dependencies

| Package | Description |
|:--------|:------------|
| `express` | Web framework for Node.js |
| `mongoose` | MongoDB object modeling |
| `multer` | Handles file uploads |
| `dotenv` | Environment variables |
| `cors` | Cross-origin resource sharing |
| `nodemon` | Auto-restarts server during development |

---

## 🧪 Example Request

**POST** `/api/candidate/submit-info`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "currenPosition": "jr Backend Developer"",
  "appliedPosition": "jr Backend Developer",
  "Experience": "2"
}

**Response:**
```json
{
  "message": "Candidate information submitted successfully",
  "candidateId": "673ba1224efcc6b1c3dfc92a"
}
```

---

##  Author

**Digvijay Pandit**  
📧 [panditdigvijay2003@gmail.com](mailto:panditdigvijay2003@gmail.com)  
🔗 [GitHub Profile](https://github.com/digvijaypandit)

---