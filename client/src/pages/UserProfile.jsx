import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import {
  FaEnvelope,
  FaMusic,
  FaHeart,
  FaCalendarAlt,
  FaEdit,
  FaStar,
  FaSave,
  FaUpload,
  FaCheck,
} from "react-icons/fa";

const DEFAULT_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVaeq7aGLY-6DrdI7rWqz02e1-AxernmMzC8TrCf3FFwnM2voSIoGxrTniNTTZJWIk2hM&usqp=CAU";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const [editBioMode, setEditBioMode] = useState(false);

  const [email, setEmail] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [likedCount, setLikedCount] = useState(0);
  const [playlistCount, setPlaylistCount] = useState(0);
  const [topGenre, setTopGenre] = useState("");
  const [topArtist, setTopArtist] = useState("");

  const [profileImage, setProfileImage] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getTopGenre = (songs) => {
    const genreFrequency = {};
    songs.forEach((song) => {
      const genre = song.genre;
      if (genre) genreFrequency[genre] = (genreFrequency[genre] || 0) + 1;
    });
    const genres = Object.entries(genreFrequency);
    if (genres.length === 0) return "";
    const max = Math.max(...genres.map(([_, count]) => count));
    const topGenres = genres.filter(([_, count]) => count === max);
    return topGenres.length === 1 ? topGenres[0][0] : "Various Genres";
  };

  const getTopArtist = (songs) => {
    const artistFrequency = {};
    songs.forEach((song) => {
      const artist = song.artist;
      if (artist) artistFrequency[artist] = (artistFrequency[artist] || 0) + 1;
    });
    const artists = Object.entries(artistFrequency);
    if (artists.length === 0) return "";
    const max = Math.max(...artists.map(([_, count]) => count));
    const topArtist = artists.find(([_, count]) => count === max);
    return topArtist ? topArtist[0] : "";
  };

  const handleUsernameSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/api/user/update`,
        { username: newUsername, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedUsername = capitalizeFirstLetter(
        response.data.user.username
      );
      setUsername(updatedUsername);
      setNewUsername(updatedUsername);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating username:", err);
    }
  };

  const handleBioSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/api/user/update`,
        { bio: newBio, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedBio = response.data.user.bio;
      setBio(updatedBio);
      setNewBio(updatedBio);
      setEditBioMode(false);
    } catch (err) {
      console.error("Error updating bio:", err);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await axios.put(
        `${baseURL}/api/user/upload-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileImage(res.data.user.profileImage);
      setSelectedImage(null);
      setIsImageLoaded(false); // Wait until uploaded image loads
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const {
          username,
          email,
          createdAt,
          likedSongs,
          playlists,
          bio,
          profileImage,
        } = response.data;

        const formattedUsername = capitalizeFirstLetter(username);
        setUsername(formattedUsername);
        setNewUsername(formattedUsername);
        setBio(bio || "");
        setNewBio(bio || "");
        setEmail(email);
        setProfileImage(profileImage);
        setMemberSince(
          new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })
        );
        setLikedCount(likedSongs?.length || 0);
        setPlaylistCount(playlists?.length || 0);
        setTopGenre(getTopGenre(likedSongs));
        setTopArtist(getTopArtist(likedSongs));
        setIsImageLoaded(true);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [baseURL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans">
      <Header />

      <main className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-10 md:p-14 shadow-2xl border border-purple-700/50 flex flex-col md:flex-row items-center md:items-start gap-12 mb-20 w-full">
          <div className="flex-shrink-0 relative flex flex-col items-center gap-2">
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : profileImage?.trim()
                  ? profileImage
                  : DEFAULT_IMAGE_URL
              }
              alt="User Avatar"
              className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-teal-400 shadow-lg transition duration-500"
              onLoad={() => setIsImageLoaded(true)}
            />

            {!selectedImage ? (
              <label className="text-sm text-blue-300 cursor-pointer hover:underline mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  className="hidden"
                />
                Change Photo
              </label>
            ) : (
              <div className="flex flex-col items-center gap-1 mt-2">
                <p className="text-xs text-gray-300">{selectedImage.name}</p>
                <button
                  onClick={handleImageUpload}
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-500"
                >
                  <FaUpload /> Upload
                </button>
              </div>
            )}

            {uploadSuccess && (
              <div className="text-green-400 text-sm mt-1 flex items-center gap-1">
                <FaCheck /> Uploaded successfully!
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="text-center md:text-left flex-grow w-full">
            <div className="flex items-center justify-center md:justify-start mb-4 gap-3">
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 w-64"
                  />
                  <button
                    onClick={handleUsernameSave}
                    className="text-green-400 hover:text-green-500"
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-teal-200">
                    {username || "Loading..."}
                  </h2>
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </div>

            <div className="text-gray-300 mb-6 flex items-center justify-center md:justify-start gap-3">
              {editBioMode ? (
                <>
                  <input
                    type="text"
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    className="px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 w-full md:w-96"
                  />
                  <button
                    onClick={handleBioSave}
                    className="text-green-400 hover:text-green-500"
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg">{bio || "No bio set."}</p>
                  <button
                    onClick={() => setEditBioMode(true)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 mt-6 text-left text-lg">
              <div className="flex items-center text-gray-300 gap-3">
                <FaEnvelope className="text-purple-400 text-xl" />
                <span>
                  <strong>Email:</strong> {email || "Loading..."}
                </span>
              </div>
              <div className="flex items-center text-gray-300 gap-3">
                <FaCalendarAlt className="text-pink-400 text-xl" />
                <span>
                  <strong>Member Since:</strong> {memberSince}
                </span>
              </div>
              <div className="flex items-center text-gray-300 gap-3">
                <FaMusic className="text-blue-400 text-xl" />
                <span>
                  <strong>Favorite Genre:</strong> {topGenre || "N/A"}
                </span>
              </div>
              <div className="flex items-center text-gray-300 gap-3">
                <FaStar className="text-yellow-400 text-xl" />
                <span>
                  <strong>Top Artist:</strong> {topArtist || "N/A"}
                </span>
              </div>
              <div className="flex items-center text-gray-300 gap-3">
                <FaHeart className="text-red-400 text-xl" />
                <span>
                  <strong>Liked Songs:</strong> {likedCount}
                </span>
              </div>
              <div className="flex items-center text-gray-300 gap-3">
                <FaMusic className="text-green-400 text-xl" />
                <span>
                  <strong>Playlists:</strong> {playlistCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
