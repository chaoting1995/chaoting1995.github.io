import React from 'react';
import { css, cx } from '@emotion/css';

import { Timer } from 'resources/timer.type';
import TimerMoniteor from 'modules/timer/components/TimerMoniteor';
import TimerSlider from 'modules/timer/components/TimerSlider';
import TimerDescription from 'modules/timer/components/TimerDescription';
import TimerController from 'modules/timer/components/TimerController';
import TimerToggleController from 'modules/timer/components/TimerToggleController';
import useAutoRing from "hooks/useAutoRing";
import useTimer from "modules/timer/hooks/useTimer";
import { EnumSide } from "modules/timer/enums/enumSide";
import usePopup from "context/Popup/usePopup";

type Props = {
  timer: Timer;
  className?: string;
};

const TimerModeCrossfire = (props: Props) => {
  const popup = usePopup();
  const [currentSide, setCurrentSide] = React.useState<EnumSide>(EnumSide.Positive);

  const timerSeconds = props.timer.ring.at(-1) || 0;
  const positiveSide = useTimer(timerSeconds);
  const negativeSide = useTimer(timerSeconds);
  useAutoRing(props.timer.ring, positiveSide.currentSeconds);
  useAutoRing(props.timer.ring, negativeSide.currentSeconds);
  
  const handleStart = () => {
    const creator: Record<EnumSide, () => void> = {
      [EnumSide.Positive]: positiveSide.onStart,
      [EnumSide.Negative]: negativeSide.onStart,
    }
    creator[currentSide]();
  }

  const handleReset = () => {
    setCurrentSide(EnumSide.Positive);
    positiveSide.onReset();
    negativeSide.onReset();
  }
  
  const handlePause = () => {
    positiveSide.onPause();
    negativeSide.onPause();
  }

  const handleToggleStart = () => {
    if (!positiveSide.isRunning && !negativeSide.isRunning) {
      popup.notice(({ 
        message: "無計時器在運作", 
        severity: "warning",
      }));
      return;
    }
    const creator: Record<EnumSide, () => void> = {
      [EnumSide.Negative]: () => {
        negativeSide.onPause();
        positiveSide.onStart();
        setCurrentSide(EnumSide.Positive);
      },
      [EnumSide.Positive]: () => {
        positiveSide.onPause();
        negativeSide.onStart();
        setCurrentSide(EnumSide.Negative);
      }
    }
    creator[currentSide]();
  }

  return <div className={cx('DT-TimerModeCrossfire', style(), props.className)}>
    <div>
      <TimerMoniteor milliseconds={positiveSide.currentMilliseconds} />
      <TimerMoniteor milliseconds={negativeSide.currentMilliseconds} />
    </div>
    <div className="bottom-section">
      <TimerSlider 
        timerSeconds={timerSeconds}
        currentSeconds={positiveSide.currentSeconds}
        onChange={positiveSide.onChange}
      />
      <TimerSlider 
        timerSeconds={timerSeconds}
        currentSeconds={negativeSide.currentSeconds}
        onChange={negativeSide.onChange}
      />
      <TimerDescription timer={props.timer} />
      <TimerToggleController onClick={handleToggleStart} />
      <TimerController 
        timerSeconds={timerSeconds}
        isRunning={positiveSide.isRunning || negativeSide.isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
      />
    </div>
  </div>;
};

export default TimerModeCrossfire;

const style = () => css`
  .bottom-section {
    width: 100%;
  }
`;