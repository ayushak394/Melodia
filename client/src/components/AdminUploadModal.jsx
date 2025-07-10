import { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes, FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function AdminUploadModal({ onClose, onSuccess, baseURL }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genres, setGenres] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/songs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const uniqueGenres = [...new Set(res.data.songs.map((song) => song.genre).filter(Boolean))];
        setGenres(uniqueGenres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, [baseURL]);

  const handleAudioFileChange = (file) => {
    if (file && file.type.startsWith("audio/")) {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        const durationInSeconds = Math.floor(audio.duration);
        setDuration(durationInSeconds.toString());
      };
    }
    setAudioFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !artist.trim() || !genre || !mood.trim() || !releaseDate) {
      setError("Please fill all fields.");
      return;
    }

    if (!audioFile || !imageFile) {
      setError("Please select both audio and image files.");
      return;
    }

    if (!audioFile.type.startsWith("audio/") || !imageFile.type.startsWith("image/")) {
      setError("Invalid file type.");
      return;
    }

    if (audioFile.size > 10 * 1024 * 1024 || imageFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds limit.");
      return;
    }

    if (!duration) {
      setError("Audio duration not available yet. Please wait.");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("genre", genre);
      formData.append("mood", mood);
      formData.append("duration", duration);
      formData.append("releaseDate", new Date(releaseDate).toISOString());
      formData.append("trendingScore", Math.floor(Math.random() * 100));
      formData.append("audio", audioFile);
      formData.append("image", imageFile);

      const token = localStorage.getItem("token");

      const res = await axios.post(`${baseURL}/api/songs/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      if (res.status === 201) {
        setSuccessMessage("🎉 Song uploaded successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          onSuccess();
          onClose();
        }, 2500);
      } else {
        toast.error("❌ Upload failed. Try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err?.response?.data?.message || "⚠️ Upload failed.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1f1c2c] via-[#2a2a72] to-[#302b63] border border-purple-700 text-white rounded-2xl p-6 sm:p-8 w-full max-w-4xl shadow-xl relative overflow-hidden animate-fade-in-up"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-red-400 text-2xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl font-extrabold text-center mb-4 text-purple-300 drop-shadow">
          🎵 Upload New Track
        </h2>

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-green-400 bg-green-900/40 px-6 py-3 rounded-xl shadow-md mb-4 font-semibold"
          >
            {successMessage}
          </motion.div>
        )}

        {error && (
          <div className="bg-red-500 text-white text-sm p-3 rounded shadow mb-4 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField label="Title" value={title} setValue={setTitle} />
          <InputField label="Artist" value={artist} setValue={setArtist} />
          <InputField label="Mood" value={mood} setValue={setMood} />
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-300">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">🎧 Select Genre</option>
              {genres.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-purple-300">Release Date</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <FileInput label="Audio File" accept="audio/*" onChange={handleAudioFileChange} />
          <FileInput label="Image File" accept="image/*" onChange={setImageFile} />

          {duration && (
            <p className="text-green-400 text-sm col-span-2">⏱ Duration: {duration} seconds</p>
          )}

          {uploadProgress > 0 && (
            <div className="col-span-2 w-full bg-gray-700 rounded-full h-4 shadow-inner overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-teal-400 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full py-3 mt-2 bg-purple-600 hover:bg-purple-700 transition duration-200 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-700/50"
          >
            {loading ? "Uploading..." : "Upload"} <FaUpload />
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </div>
    </div>
  );
}

function InputField({ label, value, setValue, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-purple-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={`Enter ${label.toLowerCase()}`}
        required
      />
    </div>
  );
}

function FileInput({ label, accept, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-purple-300">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="w-full p-2 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-purple-700 file:text-white hover:file:bg-purple-600"
        required
      />
    </div>
  );
}
