import React from 'react';
import { css, cx } from '@emotion/css';

import { Timer } from 'resources/timer.type';
import TimerRemaingTime from 'components/TimerMoniteor/TimerMoniteor';
import TimerSlider from 'components/TimerSlider/TimerSlider';
import TimerDescription from 'components/TimerDescription/TimerDescription';
import TimerController from 'components/TimerController/TimerController';
import useAutoRing from "hooks/useAutoRing";
import useTimer from "hooks/useTimer";

type Props = {
  timer: Timer;
  className?: string;
};
const TimerNormal = (props: Props) => {
  const timerSeconds = props.timer.ring.at(-1) || 0;
  const { onStart, onPause, onReset, onChange, currentSeconds, currentMilliseconds, isRunning } = useTimer(timerSeconds);
  useAutoRing(props.timer.ring, currentSeconds);

  return <div className={cx('DT-TimerNormal', style(), props.className)}>
    <TimerRemaingTime milliseconds={currentMilliseconds} />
    <div className="bottom-section">
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

export default TimerNormal;

const style = () => css`
  .bottom-section {
    width: 100%;
  }
`;