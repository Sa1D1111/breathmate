// import React, { useContext } from 'react';
// import { MusicPlayerContext } from '../context/MusicPlayerContext';
// import './GlobalMusicPlayer.css';

// const GlobalMusicPlayer = () => {
//   const { isPlaying, currentTime, duration, togglePlayPause, audioRef } = useContext(MusicPlayerContext);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60).toString().padStart(2, '0');
//     return `${minutes}:${seconds}`;
//   };

//   return (
//     <div className="global-music-player">
//       <button onClick={togglePlayPause}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//       <div className="progress">
//         <span>{formatTime(currentTime)}</span>
//         <input
//           type="range"
//           min="0"
//           max={duration}
//           value={currentTime}
//           onChange={(e) => (audioRef.current.currentTime = e.target.value)}
//         />
//         <span>{formatTime(duration)}</span>
//       </div>
//     </div>
//   );
// };

// export default GlobalMusicPlayer;
