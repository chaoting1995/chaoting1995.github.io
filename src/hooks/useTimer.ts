import { useState, useEffect, useRef } from 'react';

interface UseTimer {
  currentMilliseconds: number;
  currentSeconds: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onChange: (seconds: number) => void;
}

const useTimer = (totalSeconds: number): UseTimer => {
  const [currentMilliseconds, setCurrentMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimestampRef = useRef<number | null>(null);

  const onStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimestampRef.current = Date.now() - currentMilliseconds;
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
    setCurrentMilliseconds(0);
    startTimestampRef.current = null;
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  };

  const onChange = (seconds: number) => {
    setCurrentMilliseconds(seconds * 1000);
    if (seconds >= totalSeconds) {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        if (startTimestampRef.current !== null) {
          const elapsedTime = Date.now() - startTimestampRef.current;
          setCurrentMilliseconds(elapsedTime);

          if (elapsedTime >= totalSeconds * 1000) {
            clearInterval(timerRef.current as number);
            setIsRunning(false);
          }
        }
      }, 10); // 10 毫秒步长更新

    } else if (!isRunning && currentMilliseconds > 0) {
      setCurrentMilliseconds((prev) => prev);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, currentMilliseconds, totalSeconds]);

  const currentSeconds = Math.floor(currentMilliseconds / 1000);

  return { 
    currentMilliseconds, 
    currentSeconds,
    isRunning,
    onStart, 
    onPause, 
    onReset, 
    onChange 
  };
};

export default useTimer;
