import React from "react";
import UtilAudio from "utils/audio";

function useAutoRing(ring: number[], currentSeconds: number) {
  
  React.useEffect(() => {
    const times = ring.findIndex((time) => time === currentSeconds) + 1;

    if (times >= 0) {
      for (let i = 0; i < times; i++) {
        setTimeout(() => {
          UtilAudio.audioBell()
        }, i * 500);
      }
    }
  }, [ring, currentSeconds]);
}

export default useAutoRing;