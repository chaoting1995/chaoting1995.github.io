import React from 'react';
import { TimersContext } from "context/Timers/Timers.context";

const useTimers = () => {
  const context = React.useContext(TimersContext);
  if (!context) {
    throw new Error('useTimers must be used within a TimersProvider');
  }
  return context;
};

export default useTimers;