import React from 'react';
import { css, cx } from '@emotion/css';
import { Play, Pause, CallBell, ArrowCounterClockwise } from '@phosphor-icons/react';

import { styleSettingColor } from 'styles/variables.style';
import CircleButton from 'components/CircleButton';
import UtilAudio from 'utils/audio';

type Props = {
  className?: string,
  timerSeconds: number,
  isRunning: boolean;
  onStart: () => void,
  onPause: () => void,
  onReset: () => void,
};

const TimerController = (props: Props) => {
  const onTrigger = () => {
    if (props.isRunning) {
      props.onPause()
    } else {
      props.onStart();
    }
  };

  const onResetWithPuase = () => {
    props.onReset();
  };

  return <div className={cx('DT-TimerController', props.className, style())}>
    <CircleButton onClick={onTrigger}>
      {props.isRunning ? <Pause size={40} /> : <Play size={40} />}
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

