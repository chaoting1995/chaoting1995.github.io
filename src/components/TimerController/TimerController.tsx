import React from 'react';
import { css, cx } from '@emotion/css';
import { Play, Pause, CallBell, ArrowCounterClockwise } from "@phosphor-icons/react";

import { styleSettingColor } from "styles/variables.style";
// import { Timer } from 'resources/timer.type';
import CircleButton from 'components/CircleButton/CircleButton';
import UtilAudio from "utils/audio";

type Props = {
  className?: string,
  timerSeconds: number,
  currentSeconds: number,
  onStart: () => void,
  onPause: () => void,
  onReset: () => void,
};

const TimerController = (props: Props) => {
  const [isPlay, setIsPlay] = React.useState<boolean>(false);

  const onTrigger = () => {
    setIsPlay(prevState => !prevState);
    if (isPlay) {
      props.onPause()
    } else {
      props.onStart();
    }
  };

  const onResetWithPuase = () => {
    setIsPlay(false);
    props.onReset();
  };

  return <div className={cx('DT-TimerController', props.className, style())}>
    <CircleButton onClick={onTrigger}>
      {isPlay ? <Pause size={40} /> : <Play size={40} />}
    </CircleButton>
    <CircleButton onClick={onResetWithPuase}>
      <ArrowCounterClockwise size={40} />
    </CircleButton>
    <CircleButton onClick={UtilAudio.audioBell}>
      <CallBell size={40} />
    </CircleButton>
  </div>;
};

export default TimerController;

const style = () => css`
  padding: 40px 16px 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  gap: 20px;

  .MuiIconButton-root {
    height: 85px;
    width: 85px;
    min-width: 85px;
    border: 1px solid ${styleSettingColor.text.primary};
    color: ${styleSettingColor.text.primary};
  }
`;

