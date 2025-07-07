import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Header from "./Header";
import useAuthRedirect from "../hook/useAuthRedirect";

function PlaylistPage() {
  useAuthRedirect();
  
  const [playlists, setPlaylists] = useState([]);
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${localStorage.getItem("token")}` };
  }, []);

  const fetchPlaylists = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/playlists", {
        headers,
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, [headers]);

  const handleRenamePlaylist = async (playlistId) => {
    if (!newPlaylistName.trim()) {
      alert("Playlist name cannot be empty.");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:4000/api/playlists/${playlistId}`,
        { name: newPlaylistName.trim() },
        { headers }
      );
      setEditingPlaylistId(null);
      setNewPlaylistName("");
      fetchPlaylists();
    } catch (error) {
      console.error("Error renaming playlist:", error);
      alert("Failed to rename playlist. Please try again.");
    }
  };

  const handleDeleteSongFromPlaylist = async (playlistId, songId) => {
    if (!window.confirm("Are you sure you want to remove this song?")) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:4000/api/playlists/${playlistId}/songs/${songId}`,
        { headers }
      );
      fetchPlaylists();
    } catch (error) {
      console.error("Error deleting song:", error);
      alert("Failed to remove song. Please try again.");
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/playlists/${playlistId}`, {
        headers,
      });
      fetchPlaylists();
    } catch (error) {
      console.error("Error deleting playlist:", error);
      alert("Failed to delete playlist. Please try again.");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <Header />

      <main className="flex-1 p-8 sm:px-16">
        <h1 className="text-4xl font-bold mb-12 text-center text-teal-300 tracking-wide drop-shadow-md">
          🎵 My Curated Playlists
        </h1>

        {playlists.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <p className="text-lg text-gray-400 italic">
              You haven't created any playlists yet. Go explore some music! 🎧
            </p>
          </div>
        ) : (
          <div className="space-y-10 pb-32">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-[#1e1e2f] p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  {editingPlaylistId === playlist._id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-purple-500"
                        placeholder="New playlist name"
                      />
                      <button
                        onClick={() => handleRenamePlaylist(playlist._id)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingPlaylistId(null);
                          setNewPlaylistName("");
                        }}
                        className="text-sm text-gray-300 hover:text-red-400 transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
                      🎧 {playlist.name}
                      <button
                        onClick={() => {
                          setEditingPlaylistId(playlist._id);
                          setNewPlaylistName(playlist.name);
                        }}
                        className="text-sm ml-2 text-yellow-300 hover:text-yellow-400 transition duration-200"
                        title="Edit playlist name"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlaylist(playlist._id)}
                        className="text-sm ml-4 text-red-400 hover:text-red-500 transition duration-200"
                        title="Delete playlist"
                      >
                        🗑️ Delete
                      </button>
                    </h2>
                  )}
                </div>

                {playlist.songs.length === 0 ? (
                  <p className="text-gray-400">No songs in this playlist yet.</p>
                ) : (
                  <ul className="space-y-3 mt-2">
                    {playlist.songs.map((song) => (
                      <li
                        key={song._id}
                        className="bg-[#2f2f45] p-3 rounded-lg hover:bg-[#3b3b5a] transition duration-200 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={song.image || "/fallback.jpg"}
                            alt={song.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                          />
                          <div>
                            <span className="text-teal-100 font-medium text-lg block">
                              {song.title}
                            </span>
                            <span className="text-gray-400 text-sm">by </span>
                            <span className="text-pink-300 text-md">
                              {song.artist}
                            </span>
                            <p className="text-sm text-gray-400 mt-1">
                              Genre:{" "}
                              <span className="font-semibold">
                                {song.genre?.toUpperCase() || "N/A"}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end sm:justify-between items-center gap-4 mt-3 sm:mt-0">
                          <button
                            onClick={() =>
                              handleDeleteSongFromPlaylist(
                                playlist._id,
                                song._id
                              )
                            }
                            className="text-sm text-red-400 hover:text-red-500 transition duration-200"
                            title="Remove song from playlist"
                          >
                            ❌ Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default PlaylistPage;
