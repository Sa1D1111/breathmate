import React, { useState, useEffect } from "react";
import "./ProgressTracker.css";
import initialProgress from "../config/progressConfig";

const ProgressTracker = () => {
  const [progress, setProgress] = useState(() => {
    // Load progress from localStorage if available
    const savedProgress = localStorage.getItem("breathingProgress");
    return savedProgress ? JSON.parse(savedProgress) : {
      techniques: {
        "Deep Breathing": 0,
        "Box Breathing": 0,
        "4-7-8 Breathing": 0,
        "Alternate Nostril Breathing": 0,
      },
      dailyGoal: 5,
      completedSessionsToday: 0,
    };
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("breathingProgress", JSON.stringify(progress));
  }, [progress]);

  const handleSessionComplete = (technique) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      techniques: {
        ...prevProgress.techniques,
        [technique]: prevProgress.techniques[technique] + 1,
      },
      completedSessionsToday: prevProgress.completedSessionsToday + 1,
    }));
  };

  return (
    <div className="progress-tracker-page">
      <h1>Progress Tracker</h1>
      <p>Track your progress and achieve your daily goals!</p>

      <div className="progress-goal">
        <h2>Daily Goal</h2>
        <p>
          {progress.completedSessionsToday}/{progress.dailyGoal} sessions
          completed today
        </p>
        <div className="progress-bar">
          <div
            className="progress-bar-filled"
            style={{
              width: `${
                (progress.completedSessionsToday / progress.dailyGoal) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <div className="techniques-progress">
        <h2>Techniques Progress</h2>
        {Object.keys(progress.techniques).map((technique) => (
          <div key={technique} className="technique-progress-item">
            <h3>{technique}</h3>
            <p>Sessions Completed: {progress.techniques[technique]}</p>
            <button
              onClick={() => handleSessionComplete(technique)}
              className="complete-session-btn"
            >
              Complete Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
