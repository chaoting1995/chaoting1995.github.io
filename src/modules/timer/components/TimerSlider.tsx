import React from 'react';
import { css, cx } from '@emotion/css';
import { Timer } from "@phosphor-icons/react";
import Slider from '@mui/material/Slider';

import usePopup from 'context/Popup/usePopup';
import { styleSettingColor } from "styles/variables.style";

type Props = {
  className?: string;
  timerSeconds: number;
  currentSeconds: number;
  isRunning: boolean;
  // onStart: () => void;
  // onPause: () => void;
  onChange: (seconds: number) => void;
};

const TimerSlider = (props: Props) => {
  const popup = usePopup();
  // const [isChangeInRunning, setIsChangeInRunning ] = React.useState<boolean>(false)

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (props.isRunning) {
      popup.notice(({ message: '不能調整，計時器運作中', severity: 'warning' }));
      return;
    };

    props.onChange(newValue as number);
  };

  // const  handleMouseDown = () => {
  //   if (props.isRunning) {
  //     setIsChangeInRunning(true);
  //     props.onPause();
  //   }
  // }

  // const  handleMouseUp = () => {
  //   if (isChangeInRunning) props.onStart();
  //   setIsChangeInRunning(false);
  // }

  return <div className={cx('DT-TimerSlider', props.className, style)}>
   <Timer size={32} />
   <Slider   
    size="small"
    max={props.timerSeconds}
    value={props.currentSeconds}
    onChange={handleChange}
    // onMouseDown={handleMouseDown}
    // onMouseUp={handleMouseUp}
    // onTouchStart={handleMouseDown}
    // onTouchEnd={handleMouseUp}
  />
  </div>;
};

export default TimerSlider;

const style = css`
  width: 100%;
  padding: 16px 16px 4px;
  box-sizing: border-box;
  background-color: ${styleSettingColor.background.light};
  font-size: 22px;
  display: flex;
  justify-content: center;
  gap: 24px;

  .MuiSlider-root {
    color: ${styleSettingColor.background.dark}
  }

  .MuiSlider-thumb.Mui-focusVisible,
  .MuiSlider-thumb {
    width: 18px;
    height: 18px;
    box-shadow: 0px 0px 0px 15px ${styleSettingColor.background.dark}40;
   
    &:hover, &:focus, &:active {
      box-shadow: 0px 0px 0px 15px ${styleSettingColor.background.dark}60;
    }
  }
`;