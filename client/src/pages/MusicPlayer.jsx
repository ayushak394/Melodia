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
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-purple-800 shadow-2xl z-50">
          <div className="flex items-center justify-between px-8 py-4 text-white">
            <div className="w-1/4 flex items-center space-x-5">
              <img
                src={currentSong.image || "/fallback.jpg"}
                alt={currentSong.title}
                className="w-16 h-16 rounded-lg object-cover shadow-md"
              />
              <div>
                <h4 className="text-xl font-bold text-purple-200 truncate w-48">
                  {currentSong.title}
                </h4>
                <p className="text-sm text-gray-400 truncate w-48">
                  {currentSong.artist}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center flex-grow mx-8">
              <div className="flex items-center space-x-8 text-3xl mb-3">
                <button
                  onClick={playPrevious}
                  className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition duration-200"
                  aria-label="Previous"
                >
                  <i className="fas fa-backward"></i>
                </button>
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="text-purple-400 hover:text-purple-300 transform hover:scale-105 transition duration-200 text-5xl"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  <i className={`fas ${isPlaying ? "fa-pause-circle" : "fa-play-circle"}`} />
                </button>
                <button
                  onClick={playNext}
                  className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition duration-200"
                  aria-label="Next"
                >
                  <i className="fas fa-forward"></i>
                </button>
              </div>

              <div className="flex items-center w-full space-x-3 text-sm text-gray-400">
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

            <div className="w-1/4 flex items-center justify-end space-x-4">
              <i className={`fas ${getVolumeIcon()} text-xl text-gray-400`}></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-28 h-2 rounded-full bg-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
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
