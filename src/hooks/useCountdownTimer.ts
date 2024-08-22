import { useState, useEffect, useRef } from 'react';

interface UseCountdownTimer {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  remainingSeconds: number;
}

const useCountdownTimer = (totalSeconds: number): UseCountdownTimer => {
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const onReset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    } else if (remainingSeconds <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsRunning(false);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, remainingSeconds]);

  return { onStart, onPause, onReset, remainingSeconds };
};

export default useCountdownTimer;
