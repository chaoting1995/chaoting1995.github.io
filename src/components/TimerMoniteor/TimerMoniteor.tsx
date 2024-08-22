import React from 'react';
import { css, cx } from '@emotion/css';
import dayjs from 'dayjs';

type Props = {
  seconds: number;
};
const TimerRemaingTime = (props: Props) => {
  return <div className={cx('DT-TimerRemaingTime', style())}>
    {dayjs().startOf('day').second(props.seconds).format('HH:mm:ss')}
  </div>;
};

export default TimerRemaingTime;

const style = () => css`
  padding: 40px 16px 16px;
  box-sizing: border-box;
  width: 100%;
  font-size: 60px;
  text-align: center;
`;

