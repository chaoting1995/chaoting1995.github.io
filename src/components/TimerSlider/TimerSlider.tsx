import React from 'react';
import { css, cx } from '@emotion/css';
import { Timer } from "@phosphor-icons/react";
import Slider from '@mui/material/Slider';

import { styleSettingColor } from "styles/variables.style";

type Props = {
  className?: string,
  timerSeconds: number,
  currentSeconds: number,
  onChange: (seconds: number) => void;
};

const TimerSlider = (props: Props) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    props.onChange(newValue as number);
  };

  return <div className={cx('DT-TimerSlider', props.className, style())}>
   <Timer size={32} />
   <Slider   
    size="small"
    max={props.timerSeconds}
    value={props.currentSeconds} 
    onChange={handleChange}
  />
  </div>;
};

export default TimerSlider;

const style = () => css`
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