import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";
import { FaHeart, FaHome, FaUserCog } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      navigate("/home");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-4 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-xl border-b border-purple-800 sticky top-0 z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/waveform.png"
            alt="Melodia Logo"
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full filter brightness-0 invert"
          />
          <span className="text-3xl font-extrabold bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Melodia
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-sm sm:text-base flex items-center gap-2"
          >
            <FaHome />
            Home
          </Link>
          <Link
            to="/devpanel"
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-sm sm:text-base flex items-center gap-2"
          >
            <FaUserCog />
            Login as Developer
          </Link>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between bg-[#191932] p-8 rounded-2xl shadow-2xl border border-[#3a3a8a] backdrop-blur-md z-10 animate-fade-in border-4 border-teal-400/50">
          {/* Image */}
          <div className="hidden md:flex w-1/2 justify-center">
            <img
              src="/waveform.png"
              alt="Music Icon"
              className="w-80 h-auto rounded-full filter brightness-0 invert"
            />
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-extrabold mb-6 text-teal-300 text-center">Login</h1>
            {error && <p className="text-red-400 mb-4 text-center animate-shake">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#26264a] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#26264a] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
                required
              />
              <div className="flex justify-end text-sm text-white">
                <Link to="/forgotpassword" className="text-blue-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md hover:shadow-green-400/40 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login Now"}
              </button>
              <p className="text-center text-sm text-gray-300 mt-4">
                Not a member?{" "}
                <Link to="/signup" className="text-blue-400 hover:underline">
                  Sign up Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default Login;
