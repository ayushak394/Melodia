import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role); // instantly set role
    } catch (err) {
      console.error("Invalid token:", err.message);
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      }
    };

    fetchUser();
  }, []);

  return (
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
          to="/home"
          className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
        >
          <i className="fas fa-home mr-2 hidden sm:inline"></i>Home
        </Link>

        <Link
          to="/explore"
          className="bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
        >
          <i className="fas fa-compass mr-2 hidden sm:inline"></i>Explore
        </Link>

        {isAuthenticated && userRole === "admin" && (
          <Link
            to="/admin"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
          >
            <i className="fas fa-user-shield mr-2 hidden sm:inline"></i>
            Admin Page
          </Link>
        )}

        {isAuthenticated && (
          <>
            <Link
              to="/library"
              className="bg-pink-700 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
            >
              <i className="fas fa-heart mr-2 hidden sm:inline"></i>My Library
            </Link>

            <Link
              to="/playlist"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
            >
              <i className="fas fa-headphones mr-2 hidden sm:inline"></i>My
              Playlists
            </Link>

            <Link
              to="/profile"
              className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
            >
              <i className="fas fa-user mr-2 hidden sm:inline"></i>My Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
            >
              <i className="fas fa-sign-out-alt mr-2 hidden sm:inline"></i>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
