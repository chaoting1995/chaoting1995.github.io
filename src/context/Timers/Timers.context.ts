import React from "react";
import { Timer } from 'modules/timer/resources/timer.type';

export type TimersContextType = {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  getTimer: (id: string) => Timer | undefined;
  editTimer: (id: string, updatedTimer: Partial<Timer>) => void;
  deleteTimer: (id: string) => void;
};

export const TimersContext = React.createContext({} as TimersContextType);