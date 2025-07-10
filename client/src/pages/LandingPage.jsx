import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import Typewriter from "react-typewriter-effect";
import {
  FaHeart,
  FaStar,
  FaMusic,
  FaUserFriends,
  FaRocket,
  FaPalette,
  FaGlobe,
} from "react-icons/fa";

function LandingPage() {
  const startBtnRef = useRef(null);
  const baseURL = "http://localhost:4000";

  // useEffect(() => {
  //   const createNote = () => {
  //     const note = document.createElement("div");
  //     note.innerText = "🎵";
  //     Object.assign(note.style, {
  //       position: "fixed",
  //       left: `${Math.random() * 100}vw`,
  //       bottom: "0px",
  //       fontSize: `${Math.random() * 20 + 16}px`,
  //       opacity: Math.random(),
  //       pointerEvents: "none",
  //       zIndex: 30,
  //       animation: "floatNote 4s linear forwards",
  //     });
  //     document.body.appendChild(note);
  //     setTimeout(() => note.remove(), 4000);
  //   };
  //   const interval = setInterval(createNote, 300);
  //   return () => clearInterval(interval);
  // }, []);

  const handleGetStarted = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    window.location.href = "/signup";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#15153a] to-[#25255a] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-indigo-900/90 shadow-2xl border-b border-purple-700 backdrop-blur-sm sticky top-0 z-50">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 mb-4 sm:mb-0">
          <img
            src="/waveform.png"
            alt="Melodia Logo"
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full filter brightness-0 invert"
          />
          <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
            Melodia
          </span>
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base "
          >
            <i className="fas fa-sign-in-alt mr-2 hidden sm:inline"></i>Login
          </a>
          <a
            href="/signup"
            className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base "
          >
            <i className="fas fa-user-plus mr-2 hidden sm:inline"></i>Sign Up
          </a>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center z-10 relative px-4 py-16">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-30 top-10 left-1/3 animate-float -z-10" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20 bottom-0 right-20 animate-float -z-10" />

        <div className="text-5xl md:text-7xl font-extrabold mb-6 text-teal-200 drop-shadow-[0_4px_16px_rgba(0,255,255,0.6)]">
          <Typewriter
            textStyle={{
              fontSize: "inherit",
              fontWeight: "bold",
              color: "#99f6e4",
            }}
            startDelay={500}
            cursorColor="#99f6e4"
            multiText={[
              "Discover Your Music",
              "Explore New Sounds",
              "Feel the Rhythm",
            ]}
            multiTextDelay={2000}
            typeSpeed={90}
          />
        </div>

        <p className="text-xl md:text-3xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Stream your favorite tunes, curate custom playlists, and explore fresh
          sounds with <span className="font-bold text-teal-300">Melodia</span>{" "}
          🎶 your ultimate music companion.
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-purple-700 hover:bg-purple-600 px-10 py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 shadow-glow-purple hover:shadow-glow-purple-lg animate-pulse-slow relative overflow-hidden group"
        >
          <span className="relative z-10">Get Started ✨</span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full mix-blend-overlay"></span>
        </button>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center bg-[#15153a]/60 rounded-xl shadow-2xl backdrop-blur-md border border-purple-800 animate-fade-in-up">
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <img
            src="/melodia.jpg"
            alt="Melodia Promo"
            className="rounded-xl w-full max-h-80 object-cover shadow-xl"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <p className="text-white text-lg font-semibold">
              Immerse yourself in sound.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-4xl lg:text-5xl font-bold text-teal-100 mb-6 leading-tight">
            Why Melodia?{" "}
            <span className="text-purple-400">Your Music, Your Way</span> 🎶
          </h3>
          <ul className="text-gray-300 space-y-4 text-lg">
            <li className="flex items-start">
              <FaMusic className="inline mr-3 text-purple-400 text-2xl mt-1 flex-shrink-0" />
              <span>
                <strong className="text-white">AI-Powered Playlists:</strong>{" "}
                Generate unique playlists tailored to your mood and preferences.
              </span>
            </li>
            <li className="flex items-start">
              <FaUserFriends className="inline mr-3 text-pink-400 text-2xl mt-1 flex-shrink-0" />
              <span>
                <strong className="text-white">Community & Sharing:</strong>{" "}
                Connect with friends, share your favorite tracks, and discover
                new artists together.
              </span>
            </li>
            <li className="flex items-start">
              <FaHeart className="inline mr-3 text-red-400 text-2xl mt-1 flex-shrink-0" />
              <span>
                <strong className="text-white">Personalized Picks:</strong> Get
                tailored song recommendations based on your listening habits and
                artists you love.
              </span>
            </li>
            <li className="flex items-start">
              <FaStar className="inline mr-3 text-yellow-400 text-2xl mt-1 flex-shrink-0" />
              <span>
                <strong className="text-white">Organized Library:</strong>{" "}
                Effortlessly manage and explore your music collection in your
                personalized library.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 z-10 text-center relative animate-fade-in-up px-6">
        <h3 className="text-3xl md:text-4xl font-semibold mb-8 text-teal-200 drop-shadow-lg">
          About Melodia <span className="text-indigo-400">🎧</span>
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-[#20204a]/70 rounded-2xl border border-blue-600 shadow-xl shadow-blue-400/30 transform hover:scale-105 transition-all duration-300 h-full flex flex-col justify-between">
            <FaRocket className="text-6xl text-blue-400 mx-auto mb-4 animate-bounce-slow" />
            <h4 className="text-xl font-bold mb-2 text-white">
              Next-Gen Streaming
            </h4>
            <p className="text-gray-300">
              Melodia is a{" "}
              <strong className="text-teal-300">
                next-generation music streaming platform
              </strong>{" "}
              crafted to enhance how users connect with music.
            </p>
          </div>
          <div className="text-center p-6 bg-[#20204a]/70 rounded-2xl border border-pink-600 shadow-xl shadow-pink-400/30 transform hover:scale-105 transition-all duration-300 h-full flex flex-col justify-between">
            <FaPalette className="text-6xl text-pink-400 mx-auto mb-4 animate-pulse-fast" />
            <h4 className="text-xl font-bold mb-2 text-white">
              Sleek & Seamless
            </h4>
            <p className="text-gray-300">
              With a sleek interface and seamless functionality, users can
              explore trending tracks, discover emerging artists.
            </p>
          </div>
          <div className="text-center p-6 bg-[#20204a]/70 rounded-2xl border border-green-600 shadow-xl shadow-green-400/30 transform hover:scale-105 transition-all duration-300 h-full flex flex-col justify-between">
            <FaGlobe className="text-6xl text-green-400 mx-auto mb-4 animate-spin-slow-reverse" />
            <h4 className="text-xl font-bold mb-2 text-white">
              Powered by Tech
            </h4>
            <p className="text-gray-300">
              Delivers a{" "}
              <strong className="text-teal-300">curated experience</strong>{" "}
              powered by modern web technologies for speed and reliability.
            </p>
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed hover:text-white transition duration-300 mt-10">
          Designed for music lovers, we are passionate about bringing the joy of
          music to everyone, ensuring a responsive experience across all
          devices.
        </p>
      </section>

      <footer className="py-8 text-center z-10 relative animate-fade-in border-t border-purple-800">
        <p className="text-gray-400 text-lg">
          © 2025 Melodia. All rights reserved.
        </p>
        <p className="mt-4 text-gray-500 text-sm">
          Developed with <FaHeart className="inline text-red-500 mx-1" /> by:{" "}
          <span className="font-medium text-teal-300">Ayush Kumar</span> &{" "}
          <span className="font-medium text-teal-300">Anshika Shekhar</span>
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
