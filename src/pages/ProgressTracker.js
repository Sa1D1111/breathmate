import React, { useState, useEffect } from "react";
import "./ProgressTracker.css";

const ProgressTracker = () => {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem("breathingProgress");
    return savedProgress
      ? JSON.parse(savedProgress)
      : {
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

  const [newDailyGoal, setNewDailyGoal] = useState(progress.dailyGoal);

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

  const handleResetDailyGoal = () => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      completedSessionsToday: 0,
    }));
  };

  const handleDailyGoalChange = () => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      dailyGoal: newDailyGoal,
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
        <button className="reset-daily-goal-btn" onClick={handleResetDailyGoal}>
          Reset Daily Goal
        </button>

        <div className="daily-goal-setter">
          <label htmlFor="daily-goal-input">Set Daily Goal:</label>
          <input
            id="daily-goal-input"
            type="number"
            min="1"
            value={newDailyGoal}
            onChange={(e) => setNewDailyGoal(Number(e.target.value))}
          />
          <button
            className="set-daily-goal-btn"
            onClick={handleDailyGoalChange}
          >
            Update Goal
          </button>
        </div>
      </div>

      <div className="techniques-progress">
        <h2>Techniques Progress</h2>
        <div className="techniques-grid">
          {Object.keys(progress.techniques).map(
            (technique) =>
              technique !== "Custom Breathing" && (
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
              )
          )}
        </div>
      </div>

      {/* Custom Breathing Section */}
      <div className="custom-breathing-section">
        <h2>Custom Breathing</h2>
        <p>Sessions Completed: {progress.techniques["Custom Breathing"]}</p>
        <button
          onClick={() => handleSessionComplete("Custom Breathing")}
          className="complete-session-btn"
        >
          Complete Session
        </button>
      </div>
    </div>
  );
};

export default ProgressTracker;
