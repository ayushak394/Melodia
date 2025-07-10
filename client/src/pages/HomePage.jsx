import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { FaPlay, FaHeart, FaStar } from "react-icons/fa";
import { useMusic } from "./MusicContext";
import useRoleRedirect from "../hook/useRoleRedirect";
import { motion } from "framer-motion";

function HomePage() {
  useRoleRedirect({ allowedRoles: ["user", "admin"] });

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [trendingSongs, setTrendingSongs] = useState([]);
  const baseURL = "http://localhost:4000";
  const { playSong } = useMusic();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/api/user/fetchusername`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
      } catch (err) {
        console.error("Error fetching username:", err);
        setError("Couldn't fetch username.");
      }
    };

    const fetchTrendingSongs = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/songs/trending`);
        setTrendingSongs(
          response.data
            .sort((a, b) => b.trendingScore - a.trendingScore)
            .slice(0, 10)
        );
      } catch (err) {
        console.error("Error fetching trending songs:", err);
      }
    };

    fetchUsername();
    fetchTrendingSongs();
  }, []);

  const handlePlayClick = (index) => {
    playSong(trendingSongs, index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0a1f] via-[#15153a] to-[#25255a] text-white font-sans overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      <Header />

      <main className="flex-grow relative z-10">
        {/* Hero Section with Animated Gradient Blobs */}
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center z-10 relative px-4 py-16">
          {/* Floating Gradient Blobs */}
          <div className="absolute w-96 h-96 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-30 top-10 left-1/3 animate-float -z-10" />
          <div className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20 bottom-0 right-20 animate-float -z-10" />

          <motion.h2
            className="text-5xl font-bold mb-6 text-purple-300"
            style={{ textShadow: "0 0 20px rgba(192,132,252,0.8)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {error ? (
              <span className="text-red-400">{error}</span>
            ) : (
              <>
                Welcome Back,{" "}

                <span className="text-purple-300">
                  {username || "Guest"} 🎧
                </span>
              </>
            )}
          </motion.h2>


          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 z-10 relative">
            Discover new tracks, curate your own playlists, and immerse yourself
            in the rhythm of life.
          </p>

          <a
            href="/explore"
            className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full transition-transform duration-300 hover:scale-110 shadow-lg z-10"
            style={{
              background: "linear-gradient(to right, #9333ea, #4f46e5)",
              color: "#fff",
              boxShadow:
                "0 0 10px rgba(147, 51, 234, 0.6), 0 0 20px rgba(79, 70, 229, 0.5)",
            }}
          >
            <FaPlay className="mr-2" />
            Start Listening
          </a>
        </section>
        {/* Trending Marquee Section */}
        <section className="py-20 px-6 relative overflow-hidden pb-32">
          <h3 className="text-4xl font-semibold text-center text-teal-200 mb-12">
            🔥 Trending Songs
          </h3>

          <div className="overflow-hidden w-full h-full group">
            <div className="flex gap-10 animate-marquee-bounce group-hover:[animation-play-state:paused]">
              {trendingSongs.map((song, index) => (
                <motion.div
                  key={song.title + index}
                  onClick={() => handlePlayClick(index)}
                  className="min-w-[400px] max-w-[400px] bg-gradient-to-br from-[#281c3b]/80 via-[#2b2b6f]/70 to-[#2a2a72]/80 cursor-pointer p-6 rounded-3xl border border-purple-800/40 backdrop-blur-md shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:shadow-[0_0_50px_rgba(147,51,234,0.9)] transition-all duration-300"
                  whileHover={{ scale: 1.06 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <div className="relative">
                    <img
                      src={song.image}
                      alt={`${song.title} cover`}
                      className="w-full h-60 object-cover rounded-md mb-4 border border-purple-400 shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x224?text=Image+Not+Available";
                      }}
                    />
                    <FaPlay className="absolute bottom-4 right-4 text-white bg-purple-600 p-3 rounded-full text-4xl shadow-md hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-xl font-semibold text-teal-100 mb-1 flex items-center">
                    {song.title}{" "}
                    <FaStar className="ml-2 text-yellow-400 animate-pulse" />
                  </h4>
                  <p className="text-gray-300 text-sm flex items-center">
                    {song.artist}{" "}
                    <FaHeart className="ml-2 text-red-500 animate-bounce" />
                  </p>
                  <p className="text-gray-400 text-sm">{song.genre}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
