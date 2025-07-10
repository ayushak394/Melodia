import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import { useMusic } from "./MusicContext";
import { FaHeart, FaMusic, FaLightbulb, FaPlay, FaPause } from "react-icons/fa"; 
import useRoleRedirect from "../hook/useRoleRedirect";
const Notification = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const textColor = "text-white";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-xl shadow-2xl z-50 ${bgColor} ${textColor} flex items-center justify-between space-x-4 font-semibold text-lg`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="text-white ml-4 font-bold text-xl opacity-70 hover:opacity-100 transition-opacity">
        &times;
      </button>
    </motion.div>
  );
};


function Library() {

  useRoleRedirect({ allowedRoles: ["user", "admin"] });

  const [likedSongs, setLikedSongs] = useState([]);
  const [smartPlaylist, setSmartPlaylist] = useState([]);
  const token = localStorage.getItem("token");
  const { playSong, currentSong, isPlaying } = useMusic();
  const baseURL = "http://localhost:4000";


  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const fetchLikedSongs = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/songs/liked`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikedSongs(response.data.likedSongs || []);
    } catch (err) {
      console.error("Failed to load liked songs:", err);
      showNotification("Failed to load liked songs.", "error");
    }
  }, [token]);

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

  const handleSmartPlaylist = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/songs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allSongs = response.data.songs || [];

      const genreSimilarityMap = {
        pop: ["pop", "pop-rock", "pop-rap", "synth-pop", "indie-pop"],
        rock: [
          "rock",
          "alternative",
          "indie-rock",
          "hard-rock",
          "classic rock",
        ],
        hiphop: ["hip-hop", "rap", "trap", "pop-rap", "drill"],
        edm: ["edm", "electronic", "house", "techno", "dubstep"],
        indie: ["indie", "indie-pop", "indie-rock", "indie-folk"],
        jazz: ["jazz", "blues", "soul", "funk"],
        classical: ["classical", "instrumental", "orchestra"],
      };

      const normalizeGenre = (genre) => genre.toLowerCase().trim();

      const findAllCategories = (genre) => {
        const g = normalizeGenre(genre);
        const matchedCategories = [];
        for (const [category, synonyms] of Object.entries(genreSimilarityMap)) {
          if (synonyms.some((syn) => g.includes(syn))) {
            matchedCategories.push(category);
          }
        }
        return matchedCategories.length > 0 ? matchedCategories : ["other"];
      };

      const likedCategories = new Set();
      likedSongs.forEach((song) => {
        const categories = findAllCategories(song.genre);
        categories.forEach((c) => likedCategories.add(c));
      });

      const smartSongs = allSongs.filter((song) => {
        const songCategories = findAllCategories(song.genre);
        const isRelevant = songCategories.some((cat) =>
          likedCategories.has(cat)
        );
        const alreadyLiked = likedSongs.some((liked) => liked._id === song._id);
        return isRelevant && !alreadyLiked;
      });

      if (smartSongs.length < 6) {
        const fillerSongs = allSongs.filter(
          (song) => !likedSongs.some((liked) => liked._id === song._id)
        );
        const extra = fillerSongs.slice(0, 10);
        const uniqueSmartSongs = [...smartSongs, ...extra].filter(
          (song, index, self) =>
            index === self.findIndex((s) => s._id === song._id)
        );
        setSmartPlaylist(uniqueSmartSongs);
      } else {
        setSmartPlaylist(smartSongs);
      }
      if (smartSongs.length > 0) {
        showNotification("✨ Smart playlist generated successfully!", "success");
      } else {
        showNotification("No new songs for smart playlist.", "error");
      }
    } catch (err) {
      console.error("Smart playlist error:", err);
      showNotification("❌ Failed to generate smart playlist", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#1a1a4d] to-[#2a2a72] text-white font-sans relative overflow-hidden"
    >
      <Header />

      <AnimatePresence>
        {notification.isVisible && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification((prev) => ({ ...prev, isVisible: false }))}
          />
        )}
      </AnimatePresence>

      <div className="flex-grow px-6 md:px-10 py-8 pb-32 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h1 className="text-5xl font-extrabold text-purple-200 mb-6 md:mb-0 drop-shadow-lg flex items-center">
            <FaHeart className="text-pink-500 mr-4 text-4xl" /> My Liked Songs
          </h1>
          <button
            onClick={handleSmartPlaylist}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-lg"
          >
            <FaLightbulb className="text-xl" /> Generate Smart Playlist
          </button>
        </div>

        {smartPlaylist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-16 p-8 rounded-3xl backdrop-filter backdrop-blur-md bg-white bg-opacity-5 border border-purple-400/30 shadow-2xl ring-2 ring-purple-600/50"
          >
            <h2 className="text-4xl font-bold text-teal-300 mb-6 text-center flex items-center justify-center gap-3">
              <FaMusic className="text-3xl text-teal-400" /> Your Smart Playlist
            </h2>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl mx-auto">
              Discover new tracks tailored to your taste, based on your liked songs!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {smartPlaylist.map((song, index) => (
                <motion.div
                  key={song._id}
                  onClick={() => playSong(smartPlaylist, index)}
                  className="cursor-pointer bg-gray-900/70 p-5 rounded-2xl border border-indigo-600/50 shadow-lg hover:shadow-indigo-500/60 hover:scale-[1.03] transition-transform duration-300 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  <div className="relative group">
                    <img
                      src={song.image || "/fallback.jpg"}
                      alt={song.title}
                      className="w-full h-52 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full text-2xl shadow-xl hover:scale-110 transition-transform duration-200">
                        <FaPlay />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="text-xl font-bold text-white truncate mb-1">
                      {song.title}
                    </h3>
                    <p className="text-md text-gray-400 truncate">
                      {song.artist}
                    </p>
                    <p className="text-sm text-gray-500 italic mt-2 px-2 py-1 bg-gray-800 rounded-md inline-block">
                      Genre: <span className="font-semibold text-gray-300">{song.genre?.toUpperCase() || "N/A"}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {likedSongs.length === 0 ? (
          <motion.p
            className="text-gray-400 text-center mt-20 text-xl italic font-light"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            You haven’t liked any songs yet. Start exploring and hit that heart button! ❤️
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: smartPlaylist.length > 0 ? 0.3 : 0 }}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${smartPlaylist.length > 0 ? "mt-16" : "mt-8"}`}
          >
            {likedSongs.map((song, index) => {
              const isCurrent = currentSong && currentSong._id === song._id;
              return (
                <motion.div
                  key={song._id}
                  onClick={() => playSong(likedSongs, index)}
                  className={`cursor-pointer bg-gray-900/70 p-5 rounded-2xl border ${
                    isCurrent
                      ? "border-pink-500 shadow-pink-500"
                      : "border-purple-600/50 shadow-purple-500/60"
                  } shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 group relative overflow-hidden`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + (smartPlaylist.length > 0 ? 0.4 : 0.1) }}
                >
                  <div className="relative group">
                    <img
                      src={song.image || "/fallback.jpg"}
                      alt={song.title}
                      className="w-full h-52 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full text-2xl shadow-xl hover:scale-110 transition-transform duration-200">
                        {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="text-xl font-bold text-white truncate mb-1">
                      {song.title}
                    </h3>
                    <p className="text-md text-gray-400 truncate">
                      {song.artist}
                    </p>
                    <p className="text-sm text-gray-500 italic mt-2 px-2 py-1 bg-gray-800 rounded-md inline-block">
                      Genre: <span className="font-semibold text-gray-300">{song.genre?.toUpperCase() || "N/A"}</span>
                    </p>
                  </div>
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1"
                    >
                      <FaMusic /> Playing
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Library;