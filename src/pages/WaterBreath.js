import React, { useState, useEffect } from 'react';
import TopNavbar from '../components/TopNavbar'; // Ensure this import is correct
import './WaterBreath.css'; // CSS for the WaterBreath page

const WaterBreath = () => {
  // Breathing exercise states
  const [currentState, setCurrentState] = useState('ready');
  const [description, setDescription] = useState('Water breathing consists of a 4-second inhale followed by a 4-second exhale, repeated for 10 cycles.');
  const [currentCount, setCurrentCount] = useState(1);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [currentDirection, setCurrentDirection] = useState('in');

  const targetInCount = 4;
  const targetOutCount = 4;
  const targetCycleCount = 10;

  useEffect(() => {
    let interval;

    if (currentState === 'running') {
      interval = setInterval(handleTick, 1000);
    }

    return () => clearInterval(interval);
  }, [currentState, currentCount, currentCycle, currentDirection]);

  const startBreathing = () => {
    setCurrentState('running');
    setDescription(`Cycle: 1 — In: 1`);
  };

  const stopBreathing = () => {
    setCurrentState('done');
    setDescription("There's nothing you can't do with a For-loop and a few If-statements.");
  };

  const restartBreathing = () => {
    setCurrentState('running');
    setCurrentCycle(1);
    setCurrentCount(1);
    setCurrentDirection('in');
    setDescription(`Cycle: 1 — In: 1`);
  };

  const handleTick = () => {
    if (currentDirection === 'in') {
      if (currentCount >= targetInCount) {
        setCurrentDirection('out');
        setCurrentCount(targetOutCount);
      } else {
        setCurrentCount((prev) => prev + 1);
        setDescription(`Cycle: ${currentCycle} — In: ${currentCount}`);
      }
    } else {
      if (currentCount <= 1) {
        if (currentCycle >= targetCycleCount) {
          stopBreathing();
        } else {
          setCurrentDirection('in');
          setCurrentCount(1);
          setCurrentCycle((prev) => prev + 1);
        }
      } else {
        setCurrentCount((prev) => prev - 1);
        setDescription(`Cycle: ${currentCycle} — Out: ${currentCount}`);
      }
    }
  };

  return (
    

      <div className="states">
        {currentState === 'ready' && (
          <div className="states__state states__state--ready states__state--active">
            <div className="states__content">
              <h1 className="title">Water Breathing Exercise</h1>
              <p className="description">{description}</p>
              <div className="buttons">
                <button className="button button--start" onClick={startBreathing}>
                  Start breathing → Inhale first
                </button>
              </div>
            </div>
          </div>
        )}

        {currentState === 'running' && (
          <div className="states__state states__state--running states__state--active">
            <div className="states__content">
              <h1 className="title">Water Breathing Exercise</h1>
              <p className="description">{description}</p>
              <div className="meter">
                <div
                  className="meter__bar"
                  style={{
                    height: currentDirection === 'in' ? '100%' : '0%',
                    transitionDuration: currentDirection === 'in' ? `${targetInCount}s` : `${targetOutCount}s`,
                  }}
                ></div>
              </div>
              <div className="buttons">
                <button className="button button--stop" onClick={stopBreathing}>
                  Stop breathing
                </button>
              </div>
            </div>
          </div>
        )}

        {currentState === 'done' && (
          <div className="states__state states__state--done states__state--active">
            <div className="states__content">
              <h1 className="title">Be At Peace With JavaScript</h1>
              <p className="description">{description}</p>
              <div className="buttons">
                <button className="button button--restart" onClick={restartBreathing}>
                  Go again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default WaterBreath;
