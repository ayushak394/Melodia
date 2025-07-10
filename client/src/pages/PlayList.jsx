import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

import { useMusic } from "./MusicContext";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaMusic, FaList, FaPlay, FaPause } from "react-icons/fa";
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

function PlaylistPage() {
  
useRoleRedirect({ allowedRoles: ["user", "admin"] });

  const [playlists, setPlaylists] = useState([]);
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const [createPlaylistName, setCreatePlaylistName] = useState("");
  const baseURL = "http://localhost:4000";


  const { playSong, currentSong, isPlaying } = useMusic(); 

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

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${localStorage.getItem("token")}` };
  }, []);

  const fetchPlaylists = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/api/playlists`, {
        headers,
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      showNotification("Failed to load playlists.", "error");
    }
  }, [headers]);

  const handleCreatePlaylist = async () => {
    if (!createPlaylistName.trim()) {
      showNotification("Playlist name cannot be empty.", "error");
      return;
    }
    try {
      await axios.post(
        `${baseURL}/api/playlists`,
        { name: createPlaylistName.trim() },
        { headers }
      );
      setCreatePlaylistName("");
      setShowCreatePlaylistModal(false);
      fetchPlaylists();
      showNotification("Playlist created successfully!", "success");
    } catch (error) {
      console.error("Error creating playlist:", error);
      showNotification("Failed to create playlist. Please try again.", "error");
    }
  };

  const handleRenamePlaylist = async (playlistId) => {
    if (!newPlaylistName.trim()) {
      showNotification("Playlist name cannot be empty.", "error");
      return;
    }
    try {
      await axios.patch(
        `${baseURL}/api/playlists/${playlistId}`,
        { name: newPlaylistName.trim() },
        { headers }
      );
      setEditingPlaylistId(null);
      setNewPlaylistName("");
      fetchPlaylists();
      showNotification("Playlist renamed successfully!", "success");
    } catch (error) {
      console.error("Error renaming playlist:", error);
      showNotification("Failed to rename playlist. Please try again.", "error");
    }
  };

  const handleDeleteSongFromPlaylist = async (playlistId, songId) => {
    try {
      await axios.delete(
        `${baseURL}/api/playlists/${playlistId}/songs/${songId}`,
        { headers }
      );
      fetchPlaylists();
      showNotification("Song removed from playlist.", "success");
    } catch (error) {
      console.error("Error deleting song:", error);
      showNotification("Failed to remove song. Please try again.", "error");
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`${baseURL}/api/playlists/${playlistId}`, {
        headers,
      });
      fetchPlaylists();
      showNotification("Playlist deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting playlist:", error);
      showNotification("Failed to delete playlist. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

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
            onClose={() =>
              setNotification((prev) => ({ ...prev, isVisible: false }))
            }
          />
        )}
      </AnimatePresence>

      <main className="flex-1 p-8 sm:px-16 pb-32 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h1 className="text-5xl font-extrabold text-teal-300 drop-shadow-lg flex items-center">
            <FaList className="text-pink-500 mr-4 text-4xl" /> My Curated Playlists
          </h1>
          <button
            onClick={() => setShowCreatePlaylistModal(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-lg mt-6 md:mt-0"
          >
            <FaPlus className="text-xl" /> Create New Playlist
          </button>
        </div>

        <AnimatePresence>
          {showCreatePlaylistModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-[#1e1e2f] p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md">
                <h3 className="text-2xl font-bold text-teal-300 mb-6 text-center">Create New Playlist</h3>
                <input
                  type="text"
                  value={createPlaylistName}
                  onChange={(e) => setCreatePlaylistName(e.target.value)}
                  placeholder="Enter playlist name"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setShowCreatePlaylistModal(false);
                      setCreatePlaylistName("");
                    }}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-full font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePlaylist}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-2 rounded-full font-bold transition-transform transform hover:scale-105"
                  >
                    Create Playlist
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {playlists.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center h-60"
          >
            <p className="text-xl text-gray-400 italic font-light">
              You haven't created any playlists yet. Go explore some music! <FaMusic className="inline ml-1 text-purple-400" />
            </p>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {playlists.map((playlist, playlistIndex) => ( 
              <motion.div
                key={playlist._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: playlistIndex * 0.1 }} 
                className="bg-[#1e1e2f] p-6 rounded-2xl border border-purple-700/50 shadow-xl hover:shadow-2xl hover:border-purple-600 transition duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  {editingPlaylistId === playlist._id ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
                      <input
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                        placeholder="New playlist name"
                      />
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => handleRenamePlaylist(playlist._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition duration-200 font-semibold flex items-center gap-1"
                        >
                          <FaSave /> Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingPlaylistId(null);
                            setNewPlaylistName("");
                          }}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition duration-200 font-semibold flex items-center gap-1"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <h2 className="text-3xl font-bold text-purple-400 flex items-center gap-3">
                       {playlist.name}
                      <div className="flex items-center ml-4 space-x-3">
                        <button
                          onClick={() => {
                            setEditingPlaylistId(playlist._id);
                            setNewPlaylistName(playlist.name);
                          }}
                          className="text-lg text-yellow-300 hover:text-yellow-400 transition duration-200 flex items-center gap-1"
                          title="Edit playlist name"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeletePlaylist(playlist._id)}
                          className="text-lg text-red-400 hover:text-red-500 transition duration-200 flex items-center gap-1"
                          title="Delete playlist"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </h2>
                  )}
                </div>

                {playlist.songs.length === 0 ? (
                  <p className="text-gray-400 text-lg italic mt-4">
                    No songs in this playlist yet. Add some tracks!
                  </p>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"> 
                    {playlist.songs.map((song, songIndex) => { 
                      const isCurrent = currentSong && currentSong._id === song._id;
                      return (
                        <motion.li
                          key={song._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: songIndex * 0.05 }} 
                          onClick={() => playSong(playlist.songs, songIndex)} 
                          className={`relative bg-[#2f2f45] p-4 rounded-xl cursor-pointer
                            ${isCurrent ? "border border-pink-500 shadow-pink-500" : "border border-transparent"}
                            shadow-md hover:shadow-lg hover:bg-[#3b3b5a] transition duration-200 group overflow-hidden`
                          }
                        >
                          <div className="relative w-full h-36 rounded-lg overflow-hidden mb-3">
                            <img
                              src={song.image || "/fallback.jpg"}
                              alt={song.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                            />
                             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full text-xl shadow-xl hover:scale-110 transition-transform duration-200">
                                  {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                            </div>
                          </div>
                          <div>
                            <span className="text-teal-100 font-semibold text-lg block truncate">
                              {song.title}
                            </span>
                            <span className="text-gray-400 text-sm block truncate">by {song.artist}</span>
                            <p className="text-xs text-gray-500 italic mt-1">
                              Genre:{" "}
                              <span className="font-semibold text-gray-300">
                                {song.genre?.toUpperCase() || "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="flex justify-end items-center gap-2 mt-4"> 
                            <button
                              onClick={(e) => { 
                                e.stopPropagation();
                                handleDeleteSongFromPlaylist(
                                  playlist._id,
                                  song._id
                                );
                              }}
                              className="text-sm text-red-400 hover:text-red-500 transition duration-200 flex items-center gap-1 font-medium bg-gray-700/50 px-3 py-1 rounded-full"
                              title="Remove song from playlist"
                            >
                              <FaTimes /> Remove
                            </button>
                          </div>

                          {isCurrent && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="absolute top-3 right-3 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1"
                            >
                              <FaMusic className="text-sm" /> Playing
                            </motion.div>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>

    </motion.div>
  );
}

export default PlaylistPage;