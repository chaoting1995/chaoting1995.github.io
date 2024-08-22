import { useEffect, useRef } from 'react';

type Callback = () => void;
function useInterval(callback: Callback, delay: null | number) {
  const savedCallback = useRef<Callback | null>(null);

  // save new callback
  useEffect(() => {
    savedCallback.current = callback;
  });

  // create interval
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;