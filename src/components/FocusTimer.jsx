
import { useState, useEffect, useRef } from "react";

const FOCUS_TIME = 25 * 60;

function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);

  const [sessions, setSessions] = useState(() => {
    return Number(localStorage.getItem("sessionsCompleted")) || 0;
  });

  const [message, setMessage] = useState("");

  // Store interval ID
  const intervalRef = useRef(null);

  // Format time into MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Countdown effect
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((previousTime) =>
        Math.max(previousTime - 1, 0)
      );
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  // Detect timer completion
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setMessage("Time for a break!");
      setSessions((previous) => previous + 1);
    }
  }, [timeLeft, isRunning]);

  // Update browser tab title
  useEffect(() => {
    document.title = `${formattedTime} - Focus Timer`;

    return () => {
      document.title = "Focus Timer";
    };
  }, [formattedTime]);

  // Save sessions in localStorage
  useEffect(() => {
    localStorage.setItem(
      "sessionsCompleted",
      String(sessions)
    );
  }, [sessions]);

  // Start button
  const handleStart = () => {
    if (timeLeft > 0) {
      setMessage("");
      setIsRunning(true);
    }
  };

  // Pause button
  const handlePause = () => {
    setIsRunning(false);
  };

  // Reset button
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(FOCUS_TIME);
    setMessage("");
  };

  return (
    <div className="focus-timer">
      <h1>Focus Timer</h1>

      <div className="timer-display">
        {formattedTime}
      </div>

      <div className="timer-buttons">
        <button onClick={handleStart} disabled={isRunning || timeLeft === 0}>
          Start
        </button>

        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>

        <button onClick={handleReset}>
          Reset
        </button>
      </div>

      {message && <h3>{message}</h3>}

      <div className="sessions-counter">
        <h3>Sessions Completed: {sessions}</h3>
      </div>
    </div>
  );
}

export default FocusTimer;
