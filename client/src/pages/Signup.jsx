import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const baseURL = "http://localhost:4000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${baseURL}api/auth/signup`, formData);
      alert(response.data.message || "Signup successful!");
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  useEffect(() => {
    const createMusicNote = () => {
      const note = document.createElement("div");
      note.innerText = "🎵";
      note.className = "fixed animate-floatNote pointer-events-none z-30";
      note.style.left = `${Math.random() * 100}vw`;
      note.style.bottom = `0px`;
      note.style.opacity = Math.random().toString();
      note.style.fontSize = `${Math.random() * 20 + 16}px`;
      note.style.color = "white";
      document.body.appendChild(note);
      setTimeout(() => note.remove(), 4000);
    };

    const interval = setInterval(() => createMusicNote(), 600);
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
      
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between bg-[#1f1f3a]/90 p-8 rounded-2xl shadow-2xl border border-[#3a3a8a] backdrop-blur-md z-10 animate-fade-in border-4 border-transparent hover:border-teal-400/50 transition-all duration-700 ease-in-out group">
        
        <div className="hidden md:flex w-1/2 justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/727/727218.png"
            alt="Music Icon"
            className="w-72 h-auto animate-pulse-slow"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-extrabold mb-6 text-teal-300 text-center">
            Sign Up 🎧
          </h1>
          {error && (
            <p className="text-red-400 mb-4 text-center animate-shake">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
              required
            />
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-[#2a2a4f] text-white border border-gray-600 focus:outline-none focus:border-teal-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl text-white font-semibold transition duration-200 shadow-md hover:shadow-green-400/40"
            >
              Sign Up
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
    </>
  );
}

export default Signup;
