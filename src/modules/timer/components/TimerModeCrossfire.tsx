import React from 'react';
import { css, cx } from '@emotion/css';

import { Timer } from 'modules/timer/resources/timer.type';
import TimerMoniteor from 'modules/timer/components/TimerMoniteor';
import TimerSlider from 'modules/timer/components/TimerSlider';
import TimerDescription from 'modules/timer/components/TimerDescription';
import TimerController from 'modules/timer/components/TimerController';
import TimerToggleController from 'modules/timer/components/TimerToggleController';
import useAutoRing from 'hooks/useAutoRing';
import useTimer, { UseTimer } from 'modules/timer/hooks/useTimer';
import { EnumSide } from 'modules/role/enums/enumSide';
import usePopup from 'context/Popup/usePopup';
import UtilAudio from 'utils/audio';

type Props = {
  timer: Timer;
  className?: string;
};

const TimerModeCrossfire = (props: Props) => {
  const popup = usePopup();
  const [currentSide, setCurrentSide] = React.useState<EnumSide>(EnumSide.Positive);
  const otherSide: Record<EnumSide, EnumSide> = React.useMemo(() => ({
    [EnumSide.Negative]: EnumSide.Positive,
    [EnumSide.Positive]: EnumSide.Negative,
  }),[])

  const timerSeconds = props.timer.ring.at(-1) || 0; // 計時器，總時長
  const positiveSide = useTimer(timerSeconds); // 正方計時器
  const negativeSide = useTimer(timerSeconds); // 反方計時器
  const creator: Record<EnumSide, UseTimer> = React.useMemo(() => ({
    [EnumSide.Positive]: positiveSide,
    [EnumSide.Negative]: negativeSide,
  }),[positiveSide, negativeSide])
  
  // 自動響鈴
  useAutoRing(props.timer.ring, positiveSide.currentSeconds);
  useAutoRing(props.timer.ring, negativeSide.currentSeconds);

  const handleStart = React.useCallback((side: EnumSide) => () => {
    if (positiveSide.currentMilliseconds === 0) UtilAudio.audioBell();
    if (creator[side].currentSeconds >= timerSeconds) {
      popup.notice(({ message: '計時器已結束', severity: 'warning' }));
      return;
    }

    creator[side].onStart();
  }, [creator, popup, positiveSide.currentMilliseconds, timerSeconds])

  const handleReset = React.useCallback(() => {
    setCurrentSide(EnumSide.Positive);
    positiveSide.onReset();
    negativeSide.onReset();
  },[negativeSide, positiveSide])
  
  const handlePause = React.useCallback(() => {
    creator[currentSide].onPause();
  },[creator, currentSide]);

  const handleToggleStart = React.useCallback(() => {
    if (!positiveSide.isRunning && !negativeSide.isRunning) {
      popup.notice(({  message: '不能切換，所有計時器已停止', severity: 'warning' }));
      return;
    }

    const newSide = otherSide[currentSide];
    if (creator[newSide].currentSeconds >= timerSeconds) {
      popup.notice(({  message: '不能切換，另一邊計時器已結束', severity: 'warning' }));
      return;
    }
    creator[currentSide].onPause(); // 暫停「當前計時器」
    handleStart(newSide)(); // 啟動「另一邊計時器」
    setCurrentSide(newSide); // 切換當前持方
  },[creator, currentSide, handleStart, negativeSide.isRunning, otherSide, popup, positiveSide.isRunning, timerSeconds])

  React.useEffect(() => {
    const newSide = otherSide[currentSide];

    // 「當前計時器」結束，自動切換到「另一邊計時器」
    if (
      creator[currentSide].currentSeconds >= timerSeconds 
      && creator[newSide].currentSeconds < timerSeconds
    ) {
      handleStart(newSide)(); // 啟動「另一邊計時器」
      setCurrentSide(newSide); // 切換當前持方
    }
  }, [currentSide, creator, handleStart, otherSide, timerSeconds]);

  return <div className={cx('DT-TimerModeCrossfire', style, props.className)}>
    <div>
      <TimerMoniteor milliseconds={positiveSide.currentMilliseconds} />
      <TimerMoniteor milliseconds={negativeSide.currentMilliseconds} />
    </div>
    <div className='bottom-section'>
      <TimerSlider 
        isRunning={positiveSide.isRunning}
        timerSeconds={timerSeconds}
        currentSeconds={positiveSide.currentSeconds}
        onChange={positiveSide.onChange}
      />
      <TimerSlider
        isRunning={negativeSide.isRunning}
        timerSeconds={timerSeconds}
        currentSeconds={negativeSide.currentSeconds}
        onChange={negativeSide.onChange}
      />
      <TimerDescription timer={props.timer} />
      <TimerToggleController onClick={handleToggleStart} />
      <TimerController 
        isRunning={positiveSide.isRunning || negativeSide.isRunning}
        onStart={handleStart(currentSide)}
        onPause={handlePause}
        onReset={handleReset}
      />
    </div>
  </div>;
};

export default TimerModeCrossfire;

const style = css`
  .bottom-section {
    width: 100%;
  }
`;