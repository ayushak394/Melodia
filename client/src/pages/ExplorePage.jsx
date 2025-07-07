import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import { useMusic } from "./MusicContext";
import useAuthRedirect from "../hook/useAuthRedirect";

function ExplorePage() {

  useAuthRedirect();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showPlaylistInput, setShowPlaylistInput] = useState(false);
  const [visibleDropdowns, setVisibleDropdowns] = useState({});
  const [likedSongs, setLikedSongs] = useState({});
  const dropdownRefs = useRef({});

  const { playSong, currentSong, isPlaying } = useMusic();
  
  const baseURL = process.env.REACT_APP_API_URL;
  const SONGS_API = `${baseURL}/api/songs`;
  const PLAYLIST_API = `${baseURL}/api/playlists`;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(SONGS_API, {
          params: {
            search: searchQuery,
            genre: genreFilter,
            artist: artistFilter,
            sortBy,
            limit: 50,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
        setSongs(response.data.songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, [searchQuery, genreFilter, artistFilter, sortBy]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(PLAYLIST_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${SONGS_API}/liked`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const likedMap = {};
        response.data.likedSongs.forEach((song) => {
          likedMap[song._id] = true;
        });
        setLikedSongs(likedMap);
      } catch (err) {
        console.error("Failed to fetch liked songs:", err);
      }
    };
    fetchLikedSongs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((id) => {
        if (
          dropdownRefs.current[id] &&
          !dropdownRefs.current[id].contains(event.target)
        ) {
          setVisibleDropdowns((prev) => ({ ...prev, [id]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueGenres = [...new Set(songs.map((song) => song.genre))];
  const uniqueArtists = [...new Set(songs.map((song) => song.artist))];

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        PLAYLIST_API,
        { name: newPlaylistName.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlaylists([...playlists, response.data]);
      setNewPlaylistName("");
      setShowPlaylistInput(false);
    } catch (err) {
      console.error("Error creating playlist:", err);
    }
  };

  const toggleDropdown = (songId) => {
    setVisibleDropdowns((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  const handleAddToPlaylist = async (song, playlistId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${PLAYLIST_API}/${playlistId}/add`,
        { songId: song._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`🎵 "${song.title}" added to playlist successfully!`);
      setVisibleDropdowns((prev) => ({ ...prev, [song._id]: false }));
    } catch (err) {
      console.error("Error adding song to playlist:", err);
      alert("Failed to add song. Try again.");
    }
  };

  const toggleLike = async (songId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${SONGS_API}/${songId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikedSongs((prev) => ({
        ...prev,
        [songId]: response.data.liked,
      }));
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleShare = (song) => {
    const shareUrl = `${window.location.origin}/song/${song._id}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white font-sans"
    >
      <Header />

      <div className="flex">
        <aside className="w-1/5 p-6 bg-gradient-to-b from-gray-950 to-gray-900 border-r border-gray-700 shadow-2xl sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-2">
            🎧 Filters
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              🎼 Genre
            </label>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Genres</option>
              {uniqueGenres.map((genre, i) => (
                <option key={i} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              👤 Artist
            </label>
            <select
              value={artistFilter}
              onChange={(e) => setArtistFilter(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Artists</option>
              {uniqueArtists.map((artist, i) => (
                <option key={i} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              🔀 Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Default</option>
              <option value="newest">📅 Release Date (Newest)</option>
              <option value="oldest">📅 Release Date (Oldest)</option>
              <option value="shortest">⏱️ Duration (Short → Long)</option>
              <option value="longest">⏱️ Duration (Long → Short)</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setGenreFilter("");
                setArtistFilter("");
                setSortBy("");
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium"
            >
              🔄 Reset Filters
            </button>
          </div>
        </aside>

        <main className="flex-1 p-10 overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <input
              type="text"
              placeholder="🔍 Search songs..."
              className="w-2/3 p-4 rounded-full bg-gray-800 text-white border border-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="ml-8">
              {showPlaylistInput ? (
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="New Playlist Name"
                    className="p-3 rounded-lg bg-gray-800 text-white"
                  />
                  <button
                    onClick={handleCreatePlaylist}
                    className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
                  >
                    ➕ Add
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowPlaylistInput(true)}
                  className="bg-purple-600 px-8 py-3 rounded-lg hover:bg-purple-700"
                >
                  ✨ Create Playlist
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-32">
            {songs.map((song) => (
              <motion.div
                key={song._id}
                className="bg-gray-800 rounded-xl shadow-xl p-4 relative group"
              >
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={song.image}
                    alt={song.title}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() =>
                        playSong(
                          songs,
                          songs.findIndex((s) => s._id === song._id)
                        )
                      }
                      className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 text-2xl transform hover:scale-110"
                    >
                      {currentSong && currentSong._id === song._id && isPlaying
                        ? "⏸️"
                        : "▶️"}
                    </button>
                  </div>
                </div>

                <h4 className="mt-3 text-xl font-semibold text-purple-200 truncate">
                  {song.title}
                </h4>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                <p className="text-xs text-gray-500">{song.genre}</p>

                <div
                  className="relative z-10 mt-3"
                  ref={(el) => (dropdownRefs.current[song._id] = el)}
                >
                  <button
                    onClick={() => toggleDropdown(song._id)}
                    className="w-full bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    ➕ Add to Playlist
                  </button>
                  <AnimatePresence>
                    {visibleDropdowns[song._id] && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-full z-20"
                      >
                        <div className="bg-gray-700 rounded-lg shadow-lg border border-gray-600 overflow-hidden">
                          <select
                            className="w-full p-3 bg-gray-700 text-white appearance-none"
                            onChange={(e) =>
                              handleAddToPlaylist(song, e.target.value)
                            }
                            defaultValue=""
                          >
                            <option value="" disabled>
                              🎵 Select a Playlist
                            </option>
                            {playlists.map((pl) => (
                              <option key={pl._id} value={pl._id}>
                                📁 {pl.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => toggleLike(song._id)}
                    className={`px-3 py-2 text-sm rounded-lg font-semibold ${
                      likedSongs[song._id]
                        ? "bg-pink-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {likedSongs[song._id] ? "💖 Liked" : "🤍 Like"}
                  </button>
                  <button
                    onClick={() => handleShare(song)}
                    className="px-3 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
                  >
                    🔗 Share
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </motion.div>
  );
}

export default ExplorePage;
