import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "", newPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const baseURL = "http://localhost:4000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${baseURL}api/auth/forgotpassword`, formData);
      setMessage(
        "Password has been changed successfully! Redirecting to login..."
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Reset failed. Please try again."
      );
    }
  };

  useEffect(() => {
    const createMusicNote = () => {
      const note = document.createElement("div");
      note.innerText = "🎶";
      note.className = "fixed animate-floatNote pointer-events-none z-30";
      note.style.left = `${Math.random() * 100}vw`;
      note.style.bottom = `0px`;
      note.style.opacity = Math.random().toString();
      note.style.fontSize = `${Math.random() * 20 + 16}px`;
      note.style.color = "white";
      document.body.appendChild(note);
      setTimeout(() => note.remove(), 4000);
    };

    const interval = setInterval(() => createMusicNote(), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <><header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-2xl border-b border-purple-800 sticky top-0 z-50">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 mb-4 sm:mb-0">
              <img
                src="/waveform.png"
                alt="Melodia Logo"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full filter brightness-0 invert"
              />
              <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
                Melodia
              </span>
            </h1>
    
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
              <Link
                to="/"
                className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
              >
                <i className="fas fa-home mr-2 hidden sm:inline"></i>Home
              </Link>
            </div>
          </header>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      <div className="w-full max-w-3xl mx-auto bg-[#1f1f3a]/90 p-10 rounded-2xl shadow-2xl border-[3px] border-transparent backdrop-blur-md z-10 animate-fade-in hover:border-teal-400 hover:shadow-teal-500/40 transition-all duration-500 ease-in-out group">
        <h1 className="text-4xl font-extrabold mb-6 text-teal-300 text-center">
          Forgot Password 🔐
        </h1>

        {error && (
          <p className="text-red-400 mb-4 text-center animate-shake">{error}</p>
        )}
        {message && (
          <p className="text-green-400 mb-4 text-center animate-fade-in">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
            required
          />
          <input
            type="password"
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-600 py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md hover:shadow-purple-400/40"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default ForgotPassword;
