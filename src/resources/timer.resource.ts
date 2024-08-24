import { DEFAULT_TIMERS, LOCALSTORAGE_KEY_TIMERS } from 'resources/timer.constant';
import FactoryTimer from 'resources/timer.factory';
import { Timer } from 'resources/timer.type';

const getTimers = (): Timer[] => {
  const timersJSONString = localStorage.getItem(LOCALSTORAGE_KEY_TIMERS);
  if (!timersJSONString) return DEFAULT_TIMERS;
  return FactoryTimer.createTimers(JSON.parse(timersJSONString));
};

const updateTimers = (timers: Timer[]) => {
  const timersJSONString = JSON.stringify(timers);
  localStorage.setItem(LOCALSTORAGE_KEY_TIMERS, timersJSONString);
};

const ResourceTimer = {
  getTimers,
  updateTimers,
};

export default ResourceTimer;