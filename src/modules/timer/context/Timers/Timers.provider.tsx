import React from 'react';

import { Timer } from 'modules/timer/resources/timer.type';
import ResourceTimer from 'modules/timer/resources/timer.resource';

import { TimersContext } from './Timers.context';

type Props = {
  children: React.ReactNode;
};

const TimersProvider = (props: Props) => {
  const [timers, setTimers] = React.useState<Timer[]>([]);

  React.useEffect(() => {
    setTimers(ResourceTimer.getTimers());
  }, []);

  const addTimer = (timer: Timer) => {
    const updatedTimers = [...timers, timer];
    setTimers(updatedTimers);
    ResourceTimer.updateTimers(updatedTimers);
  };

  const getTimer = (id: string) => {
    return timers.find(timer => timer.id === id);
  };

  const editTimer = (id: string, updatedTimer: Partial<Timer>) => {
    const updatedTimers = timers.map(timer =>
      timer.id === id ? { ...timer, ...updatedTimer } : timer
    );
    setTimers(updatedTimers);
    ResourceTimer.updateTimers(updatedTimers);
  };

  const deleteTimer = (id: string) => {
    const updatedTimers = timers.filter(timer => timer.id !== id);
    setTimers(updatedTimers);
    ResourceTimer.updateTimers(updatedTimers);
  };

  return (
    <TimersContext.Provider value={{ timers, addTimer, getTimer, editTimer, deleteTimer }}>
      {props.children}
    </TimersContext.Provider>
  );
};

export default TimersProvider;