import React, { useState, useEffect, useRef } from "react";
import "./CustomBreathing.css";

const CustomBreathing = () => {
  const [text, setText] = useState("Breathe In");
  const [breatheInTime, setBreatheInTime] = useState(3000);
  const [holdTime, setHoldTime] = useState(1500);
  const [breatheOutTime, setBreatheOutTime] = useState(3000);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(Math.ceil(breatheInTime / 1000));
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  const totalTime = breatheInTime + holdTime + breatheOutTime;

  // Calculate Pointer Position
  const calculatePointerPosition = (progress) => {
    const radius = 150;
    const centerX = 150;
    const centerY = 150;
    const angle = progress * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  // Animation for Pointer, Timer, and Breathing Phases
  useEffect(() => {
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime += 50;
      const phaseProgress = elapsedTime / totalTime;

      if (elapsedTime <= breatheInTime) {
        setText("Breathe In");
        const progress = elapsedTime / breatheInTime;
        setPointerPosition(calculatePointerPosition(progress / 2));
        setTimeLeft(Math.max(Math.ceil((breatheInTime - elapsedTime) / 1000), 1)); // Avoid showing 0
      } else if (elapsedTime <= breatheInTime + holdTime) {
        setText("Hold");
        setPointerPosition(calculatePointerPosition(0.5));
        setTimeLeft(
          Math.max(Math.ceil((breatheInTime + holdTime - elapsedTime) / 1000), 1)
        ); // Avoid showing 0
      } else if (elapsedTime <= totalTime) {
        setText("Breathe Out");
        const progress =
          (elapsedTime - breatheInTime - holdTime) / breatheOutTime;
        setPointerPosition(calculatePointerPosition(0.5 + progress / 2));
        setTimeLeft(
          Math.max(Math.ceil((totalTime - elapsedTime) / 1000), 1)
        ); // Avoid showing 0
      } else {
        elapsedTime = 0;
        setTimeLeft(Math.ceil(breatheInTime / 1000)); // Reset timer for the next cycle
      }
    }, 50);

    return () => clearInterval(interval);
  }, [breatheInTime, holdTime, breatheOutTime, totalTime]);

  // Start Animation for Air Drops
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const drops = [];

    const createDrop = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      };
    };

    for (let i = 0; i < 50; i++) {
      drops.push(createDrop());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach((drop, index) => {
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(173, 216, 230, ${drop.opacity})`;
        ctx.fill();
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drops[index] = createDrop(); // Reset drop to top
        }
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Handle Music Play/Pause
  const handleMusicPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="custom-breathing-page">
      <canvas ref={canvasRef} className="background-canvas"></canvas>

      <div className="breathing-app">
        <h1 className="bubble-text">Custom Breathing</h1>
        <div className="circle-container">
          <div className="circle">
            <p className="breathing-text">
              {text} - {timeLeft}s
            </p>
            <div
              className="pointer"
              style={{
                left: `${pointerPosition.x}px`,
                top: `${pointerPosition.y}px`,
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </div>

        <div className="audio-controls">
          <audio ref={audioRef} loop>
            <source src="/audio/music2.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <button className="audio-button" onClick={handleMusicPlayPause}>
            {isPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>

        <div className="slider-container">
          <div className="slider">
            <label>Breathe In: {breatheInTime / 1000}s</label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={breatheInTime}
              onChange={(e) => setBreatheInTime(Number(e.target.value))}
            />
          </div>
          <div className="slider">
            <label>Hold: {holdTime / 1000}s</label>
            <input
              type="range"
              min="500"
              max="5000"
              step="500"
              value={holdTime}
              onChange={(e) => setHoldTime(Number(e.target.value))}
            />
          </div>
          <div className="slider">
            <label>Breathe Out: {breatheOutTime / 1000}s</label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={breatheOutTime}
              onChange={(e) => setBreatheOutTime(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBreathing;
