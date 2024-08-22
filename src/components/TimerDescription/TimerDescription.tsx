import React from 'react';
import { css, cx } from '@emotion/css';
import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
import { styleSettingColor } from "styles/variables.style";
import { Timer } from 'resources/timer.type';

dayjs.extend(duration);

type Props = {
  timer: Timer;
};

const TimerDescription = (props: Props) => {
  const formatSeconds = (seconds: number): string => {
    return dayjs.duration(seconds, "seconds").format(
      seconds >= 3600
        ? "H時m分s秒"
        : seconds > 60 ? "m分s秒" : "s秒"
    );
  };

  return <div className={cx('DT-TimerDescription', style())}>
    <div className="info-name">{props.timer.name}</div>
    <div>
      {props.timer.ring.map((item, index) => <div key={index} className="info-ring-time">
        <div>第{index + 1}次鈴響：</div>
        <div>{formatSeconds(item)}</div>
      </div>
      )}
    </div>
  </div>;
};

export default TimerDescription;

const style = () => css`
  width: 100%;
  padding: 16px 16px;
  box-sizing: border-box;
  background-color: ${styleSettingColor.background.light};
  font-size: 22px;
  
  .info-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .info-ring-time {
    display: flex;
    justify-content: flex-start;
  }
`;

