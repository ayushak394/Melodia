import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import Typewriter from "react-typewriter-effect";

function LandingPage() {
  const trendingSongs = [
    {
      id: 1,
      title: "Espresso",
      artist: "Sabrina Carpenter",
      genre: "Pop",
      image: "/images.png",
    },
    {
      id: 2,
      title: "I Had Some Help",
      artist: "Post Malone ft. Morgan Wallen",
      genre: "Country-Pop",
      image: "/images2.jpeg",
    },
    {
      id: 3,
      title: "Not Like Us",
      artist: "Kendrick Lamar",
      genre: "Hip-Hop",
      image: "/images3.jpg",
    },
  ];

  const startBtnRef = useRef(null);

  useEffect(() => {
    const createNote = () => {
      const note = document.createElement("div");
      note.innerText = "🎵";
      Object.assign(note.style, {
        position: "fixed",
        left: `${Math.random() * 100}vw`,
        bottom: "0px",
        fontSize: `${Math.random() * 20 + 16}px`,
        opacity: Math.random(),
        pointerEvents: "none",
        zIndex: 30,
        animation: "floatNote 4s linear forwards",
      });
      document.body.appendChild(note);
      setTimeout(() => note.remove(), 4000);
    };
    const interval = setInterval(createNote, 300);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    window.location.href = "/signup";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-2xl border-b border-purple-800 sticky top-0 z-50">
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
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
          <a
            href="/login"
            className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            <i className="fas fa-sign-in-alt mr-2 hidden sm:inline"></i>Login
          </a>
          <a
            href="/signup"
            className="bg-green-700 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            <i className="fas fa-user-plus mr-2 hidden sm:inline"></i>Sign Up
          </a>
        </div>
      </header>

      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-[url('https://www.transparenttextures.com/patterns/vinyl.png')] bg-contain bg-no-repeat animate-spin-slow opacity-10 top-10 left-10" />
        <div className="absolute w-60 h-60 bg-[url('https://www.transparenttextures.com/patterns/vinyl.png')] bg-contain bg-no-repeat animate-spin-reverse opacity-10 bottom-10 right-10" />
      </div>

      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center z-10 relative animate-slide-in overflow-hidden px-4">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-30 top-10 left-1/3 animate-float -z-10" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20 bottom-0 right-20 animate-float -z-10" />

        <div className="text-5xl md:text-6xl font-extrabold mb-6 text-teal-200 drop-shadow-[0_4px_12px_rgba(0,255,255,0.4)]">
          <Typewriter
            textStyle={{
              fontSize: "inherit",
              fontWeight: "bold",
              color: "#99f6e4",
            }}
            startDelay={500}
            cursorColor="#99f6e4"
            multiText={["Discover Your Music", "Explore New Sounds", "Feel the Rhythm"]}
            multiTextDelay={2000}
            typeSpeed={90}
          />
        </div>

        <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto">
          Stream your favorite tunes, curate custom playlists, and explore fresh sounds with Melodia 🎶
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-purple-700 hover:bg-purple-600 px-8 py-3 rounded-full text-lg md:text-xl font-semibold transition-all shadow-glow hover:shadow-purple-500/50 animate-bounce"
        >
          Get Started ✨
        </button>
      </section>

      <section className="py-16 z-10 relative animate-fade-in-up">
        <h3 className="text-3xl md:text-4xl font-semibold mb-10 text-teal-200 text-center drop-shadow-md">
          Suggested Songs 🎵
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6">
          {trendingSongs.map((song) => (
            <div
              key={song.id}
              className="bg-[#2d2d6f]/70 backdrop-blur-md p-6 rounded-2xl border border-transparent hover:border-teal-400 shadow-lg hover:shadow-teal-400/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-teal-300/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={song.image}
                  alt={`${song.title} cover`}
                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
              </div>
              <div className="mt-4 text-left">
                <h4 className="text-xl font-semibold text-teal-200 truncate">{song.title}</h4>
                <p className="text-gray-300 truncate">{song.artist}</p>
                <p className="text-sm text-gray-500 truncate">{song.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 z-10 bg-[#1e1e4f]/70 backdrop-blur-md text-center relative animate-fade-in-up">
        <h3 className="text-3xl md:text-4xl font-semibold mb-8 text-teal-200 drop-shadow-md">
          What Users Say 🌟
        </h3>
        <div className="space-y-6 max-w-2xl mx-auto px-4">
          {[
            { id: 1, text: "Melodia transformed my music experience!", name: "Alex P." },
            { id: 2, text: "Amazing playlists and easy to use!", name: "Sam K." },
          ].map((review) => (
            <div
              key={review.id}
              className="bg-[#2d2d6f]/70 p-6 rounded-2xl border border-transparent hover:border-teal-500 shadow-md hover:shadow-teal-400/40 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm relative overflow-hidden group"
            >
              <p className="text-gray-300 italic group-hover:scale-105 transition-transform">“{review.text}”</p>
              <p className="mt-4 text-teal-200 font-semibold">– {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 z-10 text-center relative animate-fade-in-up px-4">
        <h3 className="text-3xl md:text-4xl font-semibold mb-8 text-teal-200 drop-shadow-md">
          About Us 🎧
        </h3>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed hover:text-white transition duration-300">
          Melodia is a next-generation music streaming platform crafted to enhance how users connect with music. With a sleek interface and seamless functionality, users can explore trending tracks, discover emerging artists, and create personalized playlists effortlessly.
          Designed for music lovers, Melodia delivers a curated experience powered by modern web technologies to ensure speed, reliability, and responsiveness across all devices.
        </p>
      </section>

      <footer className="py-6 text-center z-10 bg-[#1e1e4f]/70 backdrop-blur-md relative animate-fade-in">
        <p className="text-gray-400">© 2025 Melodia. All rights reserved.</p>
        <p className="mt-4 text-gray-500 text-sm">
          Developed by: Ayush Kumar, Anshika Shekhar
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
