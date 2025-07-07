import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./Header";
import { useMusic } from "./MusicContext";
import useAuthRedirect from "../hook/useAuthRedirect";

function Library() {

  useAuthRedirect();
  
  const [likedSongs, setLikedSongs] = useState([]);
  const [smartPlaylist, setSmartPlaylist] = useState([]);
  const token = localStorage.getItem("token");
  const { playSong, currentSong, isPlaying } = useMusic();

  const fetchLikedSongs = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/songs/liked",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikedSongs(response.data.likedSongs || []);
    } catch (err) {
      console.error("Failed to load liked songs:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

  const handleSmartPlaylist = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/songs", {
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
    } catch (err) {
      console.error("Smart playlist error:", err);
      alert("❌ Failed to generate smart playlist");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white font-sans"
    >
      <Header />

      <div className="px-6 md:px-10 py-8 pb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <h1 className="text-4xl font-bold text-purple-300 mb-4 md:mb-0">
            💖 Liked Songs
          </h1>
          <button
            onClick={handleSmartPlaylist}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300"
          >
            🎧 Generate Smart Playlist
          </button>
        </div>

        {smartPlaylist.length > 0 && (
          <div className="mb-16 border-2 border-indigo-400 rounded-xl p-6 bg-indigo-800 bg-opacity-20 ring-2 ring-purple-500 shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-300 mb-2 text-center">
              ✨ Your Smart Playlist is Ready!
            </h2>
            <p className="text-sm text-indigo-100 mb-6 text-center">
              Tailored based on your favorite genres 🎶
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {smartPlaylist.map((song, index) => (
                <motion.div
                  key={song._id}
                  onClick={() => playSong(smartPlaylist, index)}
                  className="cursor-pointer bg-gray-800 p-5 rounded-2xl border border-indigo-500 shadow-lg hover:shadow-indigo-600 hover:scale-[1.03] transition-transform duration-300 group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="relative group">
                    <img
                      src={song.image}
                      onError={(e) => (e.target.src = "/fallback.jpg")}
                      alt={song.title}
                      className="w-full h-52 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full text-2xl shadow-md transition">
                        ▶️
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold text-indigo-200 truncate">
                      {song.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {song.artist}
                    </p>
                    <p className="text-xs text-gray-500 italic mt-1">
                      {song.genre}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {likedSongs.length === 0 ? (
          <motion.p
            className="text-gray-400 text-center mt-20 text-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            You haven’t liked any songs yet.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {likedSongs.map((song, index) => {
              const isCurrent = currentSong && currentSong._id === song._id;
              return (
                <motion.div
                  key={song._id}
                  onClick={() => playSong(likedSongs, index)}
                  className={`cursor-pointer bg-gray-800 p-5 rounded-2xl border ${
                    isCurrent
                      ? "border-pink-500 shadow-pink-500"
                      : "border-purple-500 shadow-purple-600"
                  } shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 group relative`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="relative group">
                    <img
                      src={song.image}
                      onError={(e) => (e.target.src = "/fallback.jpg")}
                      alt={song.title}
                      className="w-full h-52 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full text-2xl shadow-md transition">
                        {isCurrent && isPlaying ? "⏸️" : "▶️"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold text-purple-200 truncate">
                      {song.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {song.artist}
                    </p>
                    <p className="text-xs text-gray-500 italic mt-1">
                      {song.genre}
                    </p>
                  </div>
                  {isCurrent && (
                    <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
                      Playing
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Library;
