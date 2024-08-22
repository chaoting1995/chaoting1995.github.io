import React from 'react';
import { css, cx } from '@emotion/css';

import { Timer } from 'resources/timer.type';

type Props = {
  timer: Timer
}

const TimerCrossfire = (props: Props) => {
  return <div className={cx('DT-TimerCrossfire', style())}>
    {props.timer.id}
  </div>;
};

export default TimerCrossfire;

const style = () => css``;