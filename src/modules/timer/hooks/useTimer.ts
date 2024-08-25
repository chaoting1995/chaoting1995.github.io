import React  from 'react';

export interface UseTimer {
  currentMilliseconds: number;
  currentSeconds: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onChange: (seconds: number) => void;
}

const useTimer = (totalSeconds: number): UseTimer => {
  const [currentMilliseconds, setCurrentMilliseconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);
  const startTimestampRef = React.useRef<number | null>(null);

  const onStart = React.useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      startTimestampRef.current = Date.now() - currentMilliseconds;
    }
  }, [isRunning, currentMilliseconds]);

  const onPause = React.useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    }
  }, [isRunning]);

  const onReset = React.useCallback(() => {
    setIsRunning(false);
    setCurrentMilliseconds(0);
    startTimestampRef.current = null;
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  }, []);

  const onChange = React.useCallback((seconds: number) => {
    setCurrentMilliseconds(seconds * 1000);
    if (seconds >= totalSeconds) {
      setIsRunning(false);
    }
  }, [totalSeconds]);

  React.useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        if (startTimestampRef.current !== null) {
          const elapsedTime = Date.now() - startTimestampRef.current;
          const updatedMilliseconds = Math.min(elapsedTime, totalSeconds * 1000);
          setCurrentMilliseconds(updatedMilliseconds);

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
