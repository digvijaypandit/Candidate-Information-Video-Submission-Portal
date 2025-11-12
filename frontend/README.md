# 🎨 Candidate Management Frontend

A **React + Vite** frontend application for managing **candidate profiles**, including personal info submission, resume uploads, and video introductions. Built for seamless integration with the **Node.js + Express** backend.

---

## 🚀 Features

- Modern React 18 with Vite for lightning-fast development
- Submit candidate information via intuitive forms
- Upload resumes and video introductions
- Real-time form validation
- Responsive design for all devices
- Clean component-based architecture
- Hot Module Replacement (HMR) for instant updates
- Environment-based API configuration

---

## 🧩 Folder Structure

```
frontend/
├── public/
├── src/
│   ├── api/
│   │   └── axios.js
│   │
│   ├── components/
│   │   ├── FormInput.jsx
│   │   ├── ResumeUpload.jsx
│   │   └── VideoPlayer.jsx
│   │
│   ├── pages/
│   │   ├── CandidateForm.jsx
│   │   ├── Review.jsx
│   │   └── VideoRecord.jsx
│   │
│   ├── styles/
│   │   ├── CandidateForm.css
│   │   ├── Review.css
│   │   └── VideoRecord.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## ⚙️ Environment Variables (`.env`)

Copy and paste this into your `.env` file in the project root:

```env
# ========================
# 🌐 API Configuration
# ========================
VITE_API_BASE_URL=http://localhost:8000/api/candidate

# ========================
# 📁 File Upload Limits
# ========================
VITE_MAX_FILE_SIZE_MB=50
VITE_ALLOWED_RESUME_TYPES=.pdf,.doc,.docx
VITE_ALLOWED_VIDEO_TYPES=.mp4,.mov,.avi,.webm
```

> 💡 **Note:** Ensure the `VITE_API_BASE_URL` matches your backend server URL. All environment variables in Vite must be prefixed with `VITE_` to be exposed to the client.

---

## 📦 Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/digvijaypandit/Candidate-Information-Video-Submission-Portal.git
cd frontend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file and paste the configuration above

# 4️⃣ Run the development server
npm run dev

# 🏗️ Build for production
npm run build

# 👀 Preview production build
npm run preview

# 🧹 Lint your code
npm run lint
```

---

## 📜 Available Scripts

| Script | Description |
|:-------|:------------|
| `npm run dev` | Start development server with HMR (usually on `http://localhost:5173`) |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🎯 Pages Overview

| Page | Route | Description |
|:-----|:------|:------------|
| **Home** | `/` | Form to submit candidate information |
| **Video Record** | `/record-video/:candidateId` | Video Record to submit candidate Video |
| **Review** | `/review/:id` | View candidate profile, upload resume & video |

---

## 🧱 Components Overview

| Component | Description |
|:----------|:------------|
| `FormInput.jsx` | Form Input for submitting personal information |
| `ResumeUpload.jsx` | Component for uploading candidate resumes |
| `VideoPlayer.jsx` | Component for play video |

---

## 🌐 API Integration

The frontend communicates with the backend through organized API modules:

### 📁 `api`
```javascript
// POST /api/candidate/submit-info
submitCandidateInfo(data)

// GET /api/candidate/:id
getCandidateById(id)

// POST /api/candidate/upload-resume/:candidateId
uploadResume(candidateId, file)

// GET /api/candidate/download-resume/:fileId
downloadResume(fileId)

// POST /api/candidate/upload-video/:candidateId
uploadVideo(candidateId, file)

// GET /api/candidate/stream-video/:fileId
getVideoStreamUrl(fileId)
```

---

## 🧰 Dependencies

| Package | Description |
|:--------|:------------|
| `react` | JavaScript library for building user interfaces |
| `react-dom` | React package for working with the DOM |
| `axios` | Promise-based HTTP client for API requests |
| `react-router-dom` | Routing library for React |
| `vite` | Next-generation frontend build tool |
| `@vitejs/plugin-react` | Official Vite plugin for React with Fast Refresh |
| `eslint` | JavaScript linting utility |
| `bootstrap` | for responsive styling |

### 📦 Installation Command

```bash
npm install react react-dom axios react-router-dom
npm install -D vite @vitejs/plugin-react eslint
```

---

## 🎨 Styling

The application uses a combination of:
- **CSS Modules** for component-specific styles
- **Global CSS** in `src/styles/`
- **Responsive Design** principles for mobile-first approach

---

## 🔧 Vite Configuration

The `vite.config.js` is pre-configured with:
- React Fast Refresh via `@vitejs/plugin-react`
- Development server on port `5173`
- Optimized build output
- Hot Module Replacement (HMR)

---

## 🚦 Getting Started

1. **Ensure backend is running** on `http://localhost:8000`
2. **Install dependencies**: `npm install`
3. **Configure environment**: Create `.env` file with proper values
4. **Start dev server**: `npm run dev`
5. **Open browser**: Navigate to `http://localhost:5173`

---

## 🧪 Example Usage Flow

1. **Navigate to Submit Info page** (`/submit`)
2. **Fill in candidate details** (name, email, Position Applied, Current Position)
3. **Submit form** → Receive candidate ID
4. **Navigate to Candidate Details** (`/candidate/:id`)
5. **Upload resume** (PDF)
6. **Upload video introduction** (WEBM)
7. **View complete profile** with all uploaded materials

---

## 🔒 Security Notes

- All file uploads are validated on both client and server
- File size limits enforced (default: 50MB)
- Accepted file types restricted for security
- API calls use environment variables (never hardcode URLs)
- CORS configured between frontend and backend

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change Vite port in vite.config.js:
export default defineConfig({
  server: { port: 3000 }
})
```

### API Connection Issues
- Verify backend is running on `http://localhost:8000`
- Check `.env` file has correct `VITE_API_BASE_URL`
- Ensure CORS is properly configured in backend

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

---

## 👨‍💻 Author

**Digvijay Pandit**  
📧 [panditdigvijay2003@gmail.com](mailto:panditdigvijay2003@gmail.com)  
🔗 [GitHub Profile](https://github.com/digvijaypandit)

---

## 📄 License

This project is part of the Candidate Information & Video Submission Portal.
