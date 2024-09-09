import React from "react";
import { Timer } from 'modules/timer/resources/timer.type';

export type TimersContextType = {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  editTimer: (id: string, updatedTimer: Timer) => void;
  deleteTimer: (id: string) => void;
  reorderTimers: (sourceIndex: number, destinationIndex: number) => void;
};

export const TimersContext = React.createContext({} as TimersContextType);