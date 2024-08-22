import React from 'react';
import { css, cx } from '@emotion/css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';


import { styleSettingHeight } from "styles/variables.style";
import { Timer } from 'resources/timer.type';
import TimerRemaingTime from 'components/TimerMoniteor/TimerMoniteor';
import TimerDescription from 'components/TimerDescription/TimerDescription';
import TimerController from 'components/TimerController/TimerController';
import useAutoRing from "hooks/useAutoRing";
import useTimer from "hooks/useTimer";
import useInnerHeight from "hooks/useInnerHeight";

dayjs.extend(duration);

type Props = {
  timer: Timer;
};
const TimerNormal = (props: Props) => {
  const [innerHeight] = useInnerHeight();
  const timerSeconds = props.timer.ring.at(-1) || 0;
  const { onStart, onPause, onReset, currentSeconds } = useTimer(timerSeconds);
  useAutoRing(props.timer.ring, currentSeconds);

  return <div className={cx('DT-TimerNormal', style(innerHeight))}>
    <TimerRemaingTime seconds={currentSeconds} />
    <div className="bottom-section">
    <TimerDescription timer={props.timer} />
    <TimerController 
      timerSeconds={timerSeconds}
      currentSeconds={currentSeconds}
      onStart={onStart}
      onPause={onPause}
      onReset={onReset}
      />
    </div>
  </div>;
};

export default TimerNormal;

const style = (_innerHeight: number) => css`
  min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .bottom-section {
    width: 100%;
  }
`;

