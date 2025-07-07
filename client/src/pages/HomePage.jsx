import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import {
  FaPlay,
  FaHeart,
  FaStar,
  FaMusic,
  FaUserFriends,
} from "react-icons/fa";
import { useMusic } from "./MusicContext";
import useAuthRedirect from "../hook/useAuthRedirect";

function HomePage() {

  useAuthRedirect();
  
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [trendingSongs, setTrendingSongs] = useState([]);
  const baseURL = "http://localhost:4000/";
  const { playSong } = useMusic();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}api/user/fetchusername`, {
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
        const response = await axios.get(`${baseURL}api/songs/trending`);
        setTrendingSongs(
          response.data
            .sort((a, b) => b.trendingScore - a.trendingScore)
            .slice(0, 5)
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1a4d] to-[#2a2a72] text-white font-sans overflow-x-hidden">
      <Header />

      <section className="text-center py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/rice-paper.png')",
            backgroundSize: "cover",
          }}
        />
        <h2
          className="text-5xl font-bold mb-6 z-10 relative"
          style={{
            color: "#c084fc",
            textShadow:
              "0 0 10px rgba(192, 132, 252, 0.8), 0 0 20px rgba(192, 132, 252, 0.6)",
            animation: "glow 2s ease-in-out infinite alternate",
          }}
        >
          {error ? (
            <span className="text-red-400">{error}</span>
          ) : (
            <>
              Welcome Back,{" "}
              <span className="text-purple-300">{username || "Guest"} 🎧</span>
            </>
          )}
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 z-10 relative">
          Discover new tracks, curate your own playlists, and immerse yourself
          in the rhythm of life.
        </p>

        <a
          href="/explore"
          className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full transition-transform duration-300 hover:scale-110 shadow-lg z-10"
          style={{
            background:
              "linear-gradient(to right, #9333ea, #4f46e5)",
            color: "#fff",
            boxShadow:
              "0 0 10px rgba(147, 51, 234, 0.6), 0 0 20px rgba(79, 70, 229, 0.5)",
          }}
        >
          <FaPlay className="mr-2" />
          Start Listening
        </a>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=60"
          alt="music"
          className="rounded-xl shadow-lg hover:scale-105 transition-transform"
        />
        <div>
          <h3 className="text-4xl font-bold text-teal-100 mb-4">
            Why Melodia? 🎶
          </h3>
          <ul className="text-gray-300 space-y-3 text-lg">
            <li>
              <FaMusic className="inline mr-2 text-purple-400" />
              Generate AI-powered playlists based on your mood
            </li>
            <li>
              <FaUserFriends className="inline mr-2 text-pink-400" />
              Share and explore music with your community
            </li>
            <li>
              <FaHeart className="inline mr-2 text-red-400" />
              Tailored song picks based on your vibe and artists
            </li>
            <li>
              <FaStar className="inline mr-2 text-yellow-400" />
              Organize music by your taste, all in My Library
            </li>
          </ul>
        </div>
      </section>

      <hr className="border-t border-purple-800 my-16 max-w-6xl mx-auto" />

      <section className="py-16 px-6 relative">
        <h3 className="text-4xl font-semibold text-center text-teal-200 mb-12">
          🔥 Trending Songs
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto">
          {trendingSongs.map((song, index) => (
            <div
              key={song.title + index}
              onClick={() => handlePlayClick(index)}
              className="cursor-pointer bg-[#2a5298] hover:bg-[#203e6e] transition-all duration-300 p-6 rounded-xl shadow-xl transform hover:-translate-y-2 hover:scale-105 border border-teal-900/20"
            >
              <div className="relative">
                <img
                  src={song.image}
                  alt={`${song.title} cover`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x224?text=Image+Not+Available";
                  }}
                />
                <FaPlay className="absolute bottom-4 right-4 text-white bg-purple-600 p-2 rounded-full text-xl shadow-md hover:scale-110 transition-transform" />
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
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#1a1a4d] text-center text-gray-200 px-6 pb-32">
        <p className="text-2xl italic mb-4 max-w-2xl mx-auto">
          “Where words fail, music speaks.” – Hans Christian Andersen
        </p>
        <p className="text-sm text-gray-400">Let Melodia be your voice!</p>
      </section>
    </div>
  );
}

export default HomePage;
