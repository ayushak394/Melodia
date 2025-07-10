import { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaHeart } from "react-icons/fa";
import AdminUploadModal from "../components/AdminUploadModal";
import Header from "./Header";
import useRoleRedirect from "../hook/useRoleRedirect";

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false);
  useRoleRedirect({ allowedRoles: ["admin"] });

  // 🎵 Floating Music Emojis
  useEffect(() => {
    const musicIcons = ["🎶", "🎵", "🎧", "🎤", "🎼", "🎷", "🥁", "🎸", "🎹"];
    const createFloatingIcon = () => {
      const icon = document.createElement("div");
      icon.innerText =
        musicIcons[Math.floor(Math.random() * musicIcons.length)];
      icon.className = "fixed animate-floatNote pointer-events-none z-30";
      icon.style.left = `${Math.random() * 100}vw`;
      icon.style.top = `${Math.random() * 100}vh`;
      icon.style.fontSize = `${Math.random() * 20 + 16}px`;
      icon.style.opacity = Math.random().toString();
      icon.style.color = "white";
      icon.style.transition = "all 5s linear";
      document.body.appendChild(icon);
      setTimeout(() => icon.remove(), 5000);
    };

    const interval = setInterval(createFloatingIcon, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0a1f] via-[#15153a] to-[#25255a] bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat text-white font-sans overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <section className="w-full max-w-4xl bg-[#1f1f3a]/90 border-[3px] border-purple-500 rounded-2xl shadow-2xl backdrop-blur-md p-10 relative z-10">
          <h1 className="text-4xl font-extrabold text-center text-teal-300 mb-4 animate-fade-in-up drop-shadow-[0_0_10px_rgba(0,255,255,0.3)] tracking-wide transition-all duration-300">
            🎧 Admin Dashboard
          </h1>

          <p className="text-center text-gray-300 text-lg mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200 transition-opacity duration-500">
            Easily manage your music platform with{" "}
            <span className="text-pink-400 font-medium">Melodia</span>.<br />
            Upload tracks, organize your library, and maintain your collection
            effortlessly.
          </p>

          <div className="flex justify-center animate-fade-in-up delay-300">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-3 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/50 transition-transform hover:scale-105"
            >
              <FaCloudUploadAlt className="text-2xl" />
              Upload New Track
            </button>
          </div>
        </section>
      </main>

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

      {showModal && (
        <AdminUploadModal
          baseURL="http://localhost:4000"
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
