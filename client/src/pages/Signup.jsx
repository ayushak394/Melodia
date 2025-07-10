import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { FaHeart, FaHome} from "react-icons/fa";


function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default role
    phone: "",
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const sendOtp = async () => {
    if (!formData.username || !formData.email) {
      setError("Please enter username and a valid email first.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);
    setIsSendingOtp(true);

    const templateParams = {
      user_name: formData.username,
      user_email: formData.email,
      otp_code: otpCode,
      year: new Date().getFullYear(),
    };

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID_2,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setMessage("OTP sent to your email.");
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = () => {
    if (!otp) {
      setError("Enter the OTP.");
    } else if (otp === generatedOtp) {
      setMessage("Email verified successfully.");
      setOtpVerified(true);
    } else {
      setError("Invalid OTP. Try again.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (formData.username.length <= 5) {
      setError("Username must be longer than 5 characters.");
      return;
    }

    if (!["user", "admin"].includes(formData.role)) {
      setError("Invalid role selected.");
      return;
    }

    if (formData.role === "admin" && formData.phone.trim().length < 10) {
      setError(
        "Phone number is required and must be at least 10 digits for admin requests."
      );
      return;
    }

    if (!otpVerified) {
      setError("Please verify your email with OTP first.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/auth/signup`, formData);
      setMessage(response.data.message);

      const role = response.data.user?.role;

      if (role === "user") {
        setTimeout(() => navigate("/login"), 3000);
      } else if (role === "pending-admin") {
        // Clear form fields for pending-admin only
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "user",
        });
        setOtp("");
        setGeneratedOtp("");
        setOtpVerified(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Please try again.";
      setError(errorMessage);
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
        <Link
          to="/"
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-sm sm:text-base flex items-center gap-2"
        >
          <FaHome />
          Home
        </Link>
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
              Sign Up
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
              {/* Personal Information Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
                  required
                />
              </div>

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
                required
              />

             {/* Custom Styled Select Dropdown */}
<div className="relative group">
  <select
    value={formData.role}
    onChange={(e) =>
      setFormData({ ...formData, role: e.target.value })
    }
    className="w-full p-3 pl-4 pr-10 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 cursor-pointer appearance-none"
  >
    <option value="user">👤 User</option>
    <option value="admin">🛡️ Admin</option>
  </select>

  {/* Custom dropdown arrow */}
  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-400 group-hover:text-white transition duration-300 transform group-focus-within:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>


              {formData.role === "admin" && (
                <input
                  type="tel"
                  placeholder="Phone Number (Required for Admin)"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
                  required
                />
              )}

              {/* OTP Section */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text" // Changed from type="number" to type="text"
                  pattern="\d*" // Added pattern to hint at numeric input without stepper
                  inputMode="numeric" // Added inputMode for mobile keyboards
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  // Added Tailwind CSS to hide spinner arrows for WebKit browsers (Chrome, Safari)
                  // and Firefox.
                  className="flex-grow p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400
                             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={isSendingOtp}
                  className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded-xl text-white font-semibold transition duration-200"
                >
                  {isSendingOtp ? "Sending OTP..." : "Send OTP"}
                </button>
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-xl text-white font-semibold transition duration-200"
                >
                  Verify OTP
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md hover:shadow-green-400/40 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              <p className="text-center text-sm text-gray-300 mt-4">
                Already a member?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center z-10 relative animate-fade-in border-t border-purple-800 mt-auto">
        <p className="text-gray-400 text-lg">
          © 2025 Melodia. All rights reserved.
        </p>
        <p className="mt-4 text-gray-500 text-sm">
          Developed with <FaHeart className="inline text-red-500 mx-1" /> by:{" "}
          <span className="font-medium text-teal-300">Ayush Kumar</span> &{" "}
          <span className="font-medium text-teal-300">Anshika Shekhar</span>
        </p>
      </footer>
    </div>
  );
}

export default Signup;
