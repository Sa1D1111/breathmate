// import React, { createContext, useState, useRef, useEffect } from 'react';

// export const MusicPlayerContext = createContext();

// export const MusicPlayerProvider = ({ children }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(new Audio('/audio/serene-music.mp3'));

//   useEffect(() => {
//     const audio = audioRef.current;
//     const updateTime = () => setCurrentTime(audio.currentTime);

//     audio.addEventListener('timeupdate', updateTime);
//     audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
//     return () => {
//       audio.removeEventListener('timeupdate', updateTime);
//       audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
//     };
//   }, []);

//   const playMusic = () => {
//     audioRef.current.play();
//     setIsPlaying(true);
//   };

//   const pauseMusic = () => {
//     audioRef.current.pause();
//     setIsPlaying(false);
//   };

//   const togglePlayPause = () => {
//     isPlaying ? pauseMusic() : playMusic();
//   };

//   return (
//     <MusicPlayerContext.Provider
//       value={{
//         isPlaying,
//         currentTime,
//         duration,
//         playMusic,
//         pauseMusic,
//         togglePlayPause,
//         audioRef,
//       }}
//     >
//       {children}
//     </MusicPlayerContext.Provider>
//   );
// };
