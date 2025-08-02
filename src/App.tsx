import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        {/* 404 fallback */}
        <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
      </Routes>
    </Router>
  );
}
