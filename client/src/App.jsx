import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import PlaylistPage from "./pages/PlayList";
import Library from "./pages/Library";
import SongPage from "./pages/SongPage";
import { MusicProvider } from "./pages/MusicContext";
import MusicPlayer from "./pages/MusicPlayer";

import AdminPage from "./pages/AdminPage";

import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Unauthorized from "./pages/Unauthorized";
import UserProfile from "./pages/UserProfile";
import DeveloperPanel from "./pages/DeveloperPanel";
function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/playlist" element={<PlaylistPage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/song/:id" element={<SongPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/devpanel" element={<DeveloperPanel />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <MusicProvider>
        <AppContent />
        <MusicPlayer />
      </MusicProvider>
    </Router>
  );
}

export default App;
