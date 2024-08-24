import React from 'react';
import { css, cx } from '@emotion/css';

import { Timer } from 'resources/timer.type';
import TimerMonitor from 'modules/timer/components/TimerMoniteor';
import TimerSlider from 'modules/timer/components/TimerSlider';
import TimerDescription from 'modules/timer/components/TimerDescription';
import TimerController from 'modules/timer/components/TimerController';
import useAutoRing from 'hooks/useAutoRing';
import useTimer from 'modules/timer/hooks/useTimer';

type Props = {
  timer: Timer;
  className?: string;
};
const TimerModeNormal = (props: Props) => {
  const timerSeconds = props.timer.ring.at(-1) || 0;
  const { onStart, onPause, onReset, onChange, currentSeconds, currentMilliseconds, isRunning } = useTimer(timerSeconds);
  useAutoRing(props.timer.ring, currentSeconds);

  return <div className={cx('DT-TimerModeNormal', style(), props.className)}>
    <TimerMonitor milliseconds={currentMilliseconds} />
    <div className='bottom-section'>
      <TimerSlider 
        timerSeconds={timerSeconds}
        currentSeconds={currentSeconds}
        onChange={onChange}
      />
      <TimerDescription timer={props.timer} />
      <TimerController
        timerSeconds={timerSeconds}
        isRunning={isRunning}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
      />
    </div>
  </div>;
};

export default TimerModeNormal;

const style = () => css`
  .bottom-section {
    width: 100%;
  }
`;