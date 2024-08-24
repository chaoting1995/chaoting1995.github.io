import React from 'react';
import { css, cx } from '@emotion/css';
import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

type Props = {
  milliseconds: number;
};
const TimerMoniteor = (props: Props) => {

// 获取毫秒部分，保留两位数（四舍五入）
const milliseconds = (milliseconds: number) => String(Math.floor(dayjs(milliseconds).millisecond() / 10)).padStart(2, '0');

  return <div className={cx('DT-TimerMoniteor', style())}>
    {dayjs.duration(props.milliseconds, "milliseconds").format('mm:ss')}:{milliseconds(props.milliseconds)}
  </div>;
};

export default TimerMoniteor;

const style = () => css`
  padding: 0 16px;
  box-sizing: border-box;
  width: 100%;
  font-size: 60px;
  text-align: center;
`;

