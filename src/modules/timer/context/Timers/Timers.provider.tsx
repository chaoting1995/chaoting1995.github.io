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

  const addTimer = (newTimer: Timer) => {
    const _timers = ResourceTimer.getTimers();
    _timers.push(newTimer);

    ResourceTimer.updateTimers(_timers);
    setTimers(_timers);
  };

  const editTimer =  React.useCallback((id: string, updatedTimer: Timer) => {
    const _timers = ResourceTimer.getTimers();
    const index = _timers.findIndex(item => item.id === id);
    if (index === -1) return;
    _timers.splice(index, 1, updatedTimer);
    
    ResourceTimer.updateTimers(_timers);
    setTimers(_timers);
  }, []);

  const deleteTimer = React.useCallback((id: string) => {
    const _timers = ResourceTimer.getTimers();
    const index = _timers.findIndex(item => item.id === id);
    if (index === -1) return;
    _timers.splice(index, 1);

    ResourceTimer.updateTimers(_timers);
    setTimers(_timers);
  }, []);

  const reorderTimers = React.useCallback((sourceIndex: number, destinationIndex: number) => {
    const _timers = ResourceTimer.getTimers();
    // 從 source.index 剪下被拖曳的元素
    const [removed] = _timers.splice(sourceIndex, 1);
    //在 destination.index 位置貼上被拖曳的元素
    _timers.splice(destinationIndex, 0, removed);

    ResourceTimer.updateTimers(_timers);
    setTimers(_timers);
  }, []);

  return (
    <TimersContext.Provider value={{ timers, addTimer, editTimer, deleteTimer, reorderTimers }}>
      {props.children}
    </TimersContext.Provider>
  );
};

export default TimersProvider;