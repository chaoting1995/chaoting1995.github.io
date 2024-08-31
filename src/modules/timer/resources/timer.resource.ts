import { DEFAULT_TIMERS, LOCALSTORAGE_KEY_TIMERS } from 'modules/timer/resources/timer.constant';
import FactoryTimer from 'modules/timer/resources/timer.factory';
import { Timer } from 'modules/timer/resources/timer.type';

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