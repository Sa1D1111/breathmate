import React, { useState, useEffect, useRef } from 'react';
import './Breathing478.css';

const Breathing478 = () => {
  const [phase, setPhase] = useState('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameRef = useRef(null);

  const phases = [
    { name: 'Inhale', duration: 4 },
    { name: 'Hold Inhale', duration: 7 },
    { name: 'Exhale', duration: 8 }
  ];

  const [pointerPosition, setPointerPosition] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            const currentPhaseIndex = phases.findIndex((p) => p.name === phase);
            const nextPhase = phases[(currentPhaseIndex + 1) % phases.length];
            setPhase(nextPhase.name);
            setPointerPosition((currentPhaseIndex + 1) % phases.length);
            return nextPhase.duration;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, phase]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      const currentPhaseIndex = phases.findIndex((p) => p.name === phase);
      setPointerPosition(currentPhaseIndex % phases.length);
    }
  };

  const handleMusicPlayPause = async () => {
    try {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          if (audioContextRef.current) {
            audioContextRef.current.suspend();
          }
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);

          if (!audioInitialized) {
            initializeAudioVisualizer();
            setAudioInitialized(true);
          } else if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
          }
        }
      }
    } catch (error) {
      console.error("Error toggling audio playback:", error);
    }
  };

  const initializeAudioVisualizer = () => {
    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      drawVisualizer();
    }
  };

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!canvas || !canvasCtx || !analyser || !dataArray) {
      console.error("Canvas or analyser is not properly initialized.");
      return;
    }

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      if (!isPlaying) {
        cancelAnimationFrame(animationFrameRef.current);
        return;
      }

      analyser.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / dataArray.length) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i];
        canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  // Calculate circle size based on breathing phase and time left
  const circleSize = () => {
    if (phase === 'Inhale' || phase === 'Exhale') {
      const maxDiameter = 200; // Maximum circle size
      const minDiameter = 100; // Minimum circle size
      const progress = (timeLeft / phases.find((p) => p.name === phase).duration) || 0;
      return maxDiameter - (progress * (maxDiameter - minDiameter));
    }
    return 100; // Default size for Hold phases
  };

  return (
    <div className="breathing-page">
      <h1 className="bubble-text">4-7-8 Breathing</h1>
      <div className="breathing-container">
        <h2>{phase}</h2>
        <p>{timeLeft}s</p>
        <button className="breathing-button" onClick={handleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>

      <div className="visual">
        <div
          className="visual-circle"
          style={{
            width: `${circleSize()}px`,
            height: `${circleSize()}px`
          }}
        >
          <span>{phase}</span>
        </div>
      </div>

      <div className="audio-controls">
        <audio ref={audioRef} loop>
          <source src="/audio/music2.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <button className="audio-button" onClick={handleMusicPlayPause}>
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>
      </div>






{/* Informational Content */}
<div className="info-content">
        <h2>How 4-7-8 Breathing Works</h2>
        <h3>Set up for 4-7-8 Breathing</h3>
        <p>
        To practice 4-7-8 breathing, find a comfortable place to sit or lie down. Be sure to practice good posture, especially when starting out. Lying down is best if you’re using the technique to fall asleep.
Prepare for the practice by resting the tip of your tongue against the roof of your mouth, right behind your top front teeth. You’ll need to keep your tongue in place throughout the exercise.
<p>It takes practice to keep from moving your tongue when you exhale. Exhaling during 4-7-8 breathing can be easier for some people when they purse their lips.
The following steps should all be carried out in the cycle of one breath:</p>


        </p>
        <p>
        First, let your lips part. Make a whooshing sound, exhaling completely through your mouth.
Next, close your lips, inhaling silently through your nose as you count to 4 seconds in your head.
Then, for 7 seconds, hold your breath.
Make another whooshing exhale from your mouth for 8 seconds.
        </p>
      </div>

      


 {/* Add YouTube video embed here */}
 <div className="video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/Uxbdx-SeOOo"
    title="4-7-8 Breathing Technique"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>



    </div>




  );
};

export default Breathing478;
