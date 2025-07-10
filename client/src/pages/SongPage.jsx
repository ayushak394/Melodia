import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function SongPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [error, setError] = useState(null);

  const isAuthenticated = !!localStorage.getItem("token");
  const baseURL = "http://localhost:4000";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/songs/public/${id}`);
        setSong(res.data);
      } catch (err) {
        console.error("Error fetching song:", err);
        setError(
          "Could not load song. Please try again later. It might be a network issue or the song ID is invalid."
        );
      }
    };

    fetchSong();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 flex flex-col items-center text-red-400 text-xl font-medium p-6">
        <header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-2xl border-b border-purple-800 sticky top-0 z-50 w-full">
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

          <Link
            to="/explore"
            className="bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
          >
            <i className="fas fa-compass mr-2 hidden sm:inline"></i>Explore More
            with Melodia
          </Link>

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

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
              >
                <i className="fas fa-sign-out-alt mr-2 hidden sm:inline"></i>
                Logout
              </button>
            </>
          )}
        </header>

        <div className="flex-grow flex flex-col items-center justify-center pt-20">
          <p className="text-center p-4 rounded-lg bg-gray-800 shadow-lg max-w-md">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 flex flex-col items-center justify-center">
        <header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py- bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-2xl border-b border-purple-800 sticky top-0 z-50 w-full">
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
        </header>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 flex flex-col">
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-2xl border-b border-purple-800 sticky top-0 z-50 w-full">
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

        <Link
          to="/explore"
          className="bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
        >
          <i className="fas fa-compass mr-2 hidden sm:inline"></i>Explore More
          with Melodia
        </Link>

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

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
            >
              <i className="fas fa-sign-out-alt mr-2 hidden sm:inline"></i>
              Logout
            </button>
          </>
        )}
      </header>

      <div className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 w-full">
        <div className="bg-gray-800 rounded-3xl shadow-glow-blue p-6 md:pb-2 flex flex-col items-center max-w-lg w-full transition-transform duration-300 ease-in-out">
          <img
            src={song.image}
            alt={song.title}
            className="w-56 h-56 md:w-72 md:h-72 rounded-full mb-8 object-cover shadow-2xl border-4 border-teal-400 ring-2 ring-purple-600 ring-offset-4 ring-offset-gray-900"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 tracking-wide leading-tight text-teal-300 drop-shadow-lg">
            {song.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
            {song.artist}
          </p>
          <div className="w-full">
            <AudioPlayer
              src={song.audio}
              autoPlay
              layout="stacked"
              className="audio-player-custom-theme rounded-xl shadow-inner-lg"
              showDownloadProgress
              showFilledProgress
              showJumpControls={false}
              showSkipControls={false}
            />
          </div>
        </div>
        <p className="mt-10 text-gray-400 text-sm md:text-base text-center max-w-lg">
          Get ready to groove with "{song.title}" by {song.artist}! Share this
          page with friends.
        </p>
      </div>
    </div>
  );
}

export default SongPage;
