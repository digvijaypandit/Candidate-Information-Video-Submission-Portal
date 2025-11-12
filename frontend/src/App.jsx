import { Routes, Route } from "react-router-dom";
import CandidateForm from "./pages/CandidateForm";
import VideoRecord from "./pages/VideoRecord";
import Review from "./pages/Review";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CandidateForm />} />
      <Route path="/record-video/:candidateId" element={<VideoRecord />} />
      <Route path="/review/:id" element={<Review />} />
    </Routes>
  );
}

export default App;
