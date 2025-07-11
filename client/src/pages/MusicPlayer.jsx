import React, { useEffect, useState } from "react";
import { useMusic } from "./MusicContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    playNext,
    playPrevious,
  } = useMusic();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleSongEnd = () => playNext();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);

    if (isPlaying) {
      audio.play().catch((err) => console.log("Play error:", err));
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSong, isPlaying, audioRef, playNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return "fa-volume-mute";
    if (volume < 0.1) return "fa-volume-off";
    if (volume < 0.5) return "fa-volume-down";
    return "fa-volume-up";
  };

  return (
    <>
      <audio ref={audioRef} src={currentSong?.audio || ""} />

      {currentSong && (
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-purple-800 shadow-2xl z-50 text-white">
  <div className="flex flex-col md:flex-row items-center justify-between gap-y-4 md:gap-y-0 md:gap-x-6 px-4 sm:px-6 md:px-8 py-4 w-full">

    {/* Song Info */}
    <div className="flex items-center space-x-4 w-full md:w-1/3 min-w-0">
      <img
        src={currentSong.image || "/fallback.jpg"}
        alt={currentSong.title}
        className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover shadow-md"
      />
      <div className="overflow-hidden w-full">
        <h4 className="text-base md:text-lg font-semibold text-purple-200 truncate">
          {currentSong.title}
        </h4>
        <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
      </div>
    </div>

    {/* Controls */}
    <div className="flex flex-col items-center w-full md:w-1/3 max-w-full">
      <div className="flex items-center justify-center space-x-6 text-2xl md:text-3xl mb-2">
        <button
          onClick={playPrevious}
          className="text-gray-400 hover:text-blue-400 transition-transform transform hover:scale-110"
        >
          <i className="fas fa-backward" />
        </button>
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="text-purple-400 hover:text-purple-300 transition-transform transform hover:scale-110 text-4xl md:text-5xl"
        >
          <i className={`fas ${isPlaying ? "fa-pause-circle" : "fa-play-circle"}`} />
        </button>
        <button
          onClick={playNext}
          className="text-gray-400 hover:text-blue-400 transition-transform transform hover:scale-110"
        >
          <i className="fas fa-forward" />
        </button>
      </div>

      {/* Seek Bar */}
      <div className="flex items-center w-full space-x-2 text-xs md:text-sm text-gray-400">
        <span className="w-10 text-right">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 h-2 rounded-full bg-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
          style={{
            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
              (currentTime / duration) * 100
            }%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`,
          }}
        />
        <span className="w-10 text-left">{formatTime(duration)}</span>
      </div>
    </div>

    {/* Volume Control */}
    <div className="flex items-center justify-end space-x-3 w-full md:w-1/3 px-2 md:px-0">
      <i className={`fas ${getVolumeIcon()} text-lg md:text-xl text-gray-400`} />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-full max-w-[120px] h-2 rounded-full bg-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
        style={{
          background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
            volume * 100
          }%, #4b5563 ${volume * 100}%, #4b5563 100%)`,
        }}
      />
    </div>
  </div>
</footer>

      )}
    </>
  );
}

export default MusicPlayer;
