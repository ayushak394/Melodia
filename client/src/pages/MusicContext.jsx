import React, { createContext, useContext, useRef, useState } from "react";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [playlist, setPlaylist] = useState([]); 
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentSong = playlist[currentSongIndex] || null;

  const playSong = (songList, index) => {
    setPlaylist(songList);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (playlist.length > 0 && currentSongIndex !== null) {
      const nextIndex = (currentSongIndex + 1) % playlist.length;
      setCurrentSongIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (playlist.length > 0 && currentSongIndex !== null) {
      const prevIndex =
        (currentSongIndex - 1 + playlist.length) % playlist.length;
      setCurrentSongIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        setIsPlaying,
        audioRef,
        playSong,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
