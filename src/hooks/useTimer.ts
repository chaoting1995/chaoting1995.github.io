import { useState, useEffect, useRef } from 'react';

interface UseTimer {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  currentSeconds: number;
}

const useTimer = (totalSeconds: number): UseTimer => {
  const [currentSeconds, setCurrentSeconds] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const onStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const onPause = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    }
  };

  const onReset = () => {
    setIsRunning(false);
    setCurrentSeconds(0);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev < totalSeconds) {
            return prev + 1;
          } else {
            if (timerRef.current !== null) {
              clearInterval(timerRef.current);
            }
            setIsRunning(false);
            return prev;
          }
        });
      }, 1000);
    } else if (!isRunning && currentSeconds > 0) {
      // When paused, just keep the current seconds
      setCurrentSeconds((prev) => prev);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, currentSeconds, totalSeconds]);

  return { onStart, onPause, onReset, currentSeconds };
};

export default useTimer;
