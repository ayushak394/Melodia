import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaArrowLeft, FaHome } from "react-icons/fa";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "", newPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  // Password regex validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!passwordRegex.test(formData.newPassword)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${baseURL}/api/auth/forgotpassword`, formData);
      setMessage(
        "Password has been changed successfully! Redirecting to login..."
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Reset failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-2xl border-b border-purple-800 sticky top-0 z-50">
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
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-sm sm:text-base flex items-center gap-2"
          >
            <FaHome />Home
          </Link>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between bg-[#1f1f3a]/90 p-8 rounded-2xl shadow-2xl border border-[#3a3a8a] backdrop-blur-md z-10 animate-fade-in border-4 border-teal-400/50">
          <div className="hidden md:flex w-1/2 justify-center">
            <img
              src="/waveform.png"
              alt="Music Icon"
              className="w-80 h-auto rounded-full filter brightness-0 invert"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-extrabold mb-6 text-teal-300 text-center">
              Forgot Password
            </h1>

            {error && (
              <p className="text-red-400 mb-4 text-center animate-shake">
                {error}
              </p>
            )}
            {message && (
              <p className="text-green-400 mb-4 text-center animate-fade-in">
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                disabled={loading}
                className={`w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md hover:shadow-green-400/40 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <p className="text-center text-sm text-gray-300 mt-4">
                <Link
                  to="/login"
                  className="text-blue-400 hover:underline flex items-center justify-center"
                >
                  <FaArrowLeft className="mr-2" /> Back to Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center z-10 relative animate-fade-in border-t border-purple-800 mt-auto">
        <p className="text-gray-400 text-lg">© 2025 Melodia. All rights reserved.</p>
        <p className="mt-4 text-gray-500 text-sm">
          Developed with <FaHeart className="inline text-red-500 mx-1" /> by:{" "}
          <span className="font-medium text-teal-300">Ayush Kumar</span> &{" "}
          <span className="font-medium text-teal-300">Anshika Shekhar</span>
        </p>
      </footer>
    </div>
  );
}

export default ForgotPassword;
