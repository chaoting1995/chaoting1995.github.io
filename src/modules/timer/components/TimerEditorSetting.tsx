import React from 'react'
import { css, cx } from '@emotion/css';
import { Button } from '@mui/material';

import { breakpoints, styleSettingColor } from 'styles/variables.style';
import { TEMPLATE_TIMERS } from 'resources/timer.constant';
import { Timer } from 'resources/timer.type';

type Props = {
  className?: string;
  ringTimes: number;
  onChangeRingTimes: (times: number) => void;
  onUseTemplateTimer: (timer: Timer) => void;
  onCloseSetting: () => void;
}

const TimerEditorSetting = (props: Props) => {
  const handleChangeRingTimes = (times: number) => () => {
    props.onChangeRingTimes(times);
  };

  const handleUseTemplateTimer = (timer: Timer) => () => {
    props.onUseTemplateTimer(timer);
    props.onCloseSetting();
  }

  return (
    <div className={cx('DT-TimerEditorSetting', style, props.className)}>
      <div className="setting-title">鈴響次數</div>
      <div className="setting-subtitle">注意：請先選擇完「計時器模式」</div>
      <div className='ring-times-button-group'>
        <Button 
          variant='outlined' 
          color="secondary" 
          className='ring-times-button' 
          disabled={props.ringTimes <= 1}
          onClick={handleChangeRingTimes(props.ringTimes - 1)}
        >
          -
        </Button>
        <div className="info-ring-times">{props.ringTimes}</div>
        <Button 
          variant='outlined' 
          color="secondary" 
          className='ring-times-button' 
          disabled={props.ringTimes >= 5}
          onClick={handleChangeRingTimes(props.ringTimes + 1)}
        >
          +
        </Button>
      </div>
      <div className="setting-title">使用模板</div>
      <div className='template-button-group'>
        {TEMPLATE_TIMERS.map((item) => (
          <Button variant='outlined' color="secondary" className='template-button' onClick={handleUseTemplateTimer(item)}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default TimerEditorSetting;

const style = css`
  padding: 0 16px;
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media(min-width: ${breakpoints.sm}) {
    padding: 0 32px;
    padding-top: 16px;
  }
  
  .setting-title {
    margin-bottom: 10px;
    font-size: 22px;
    color: ${styleSettingColor.background.dark};
  }
  
  .setting-subtitle {
    margin-bottom: 10px;
    font-size: 16px;
    color: ${styleSettingColor.text.secondary};
  }

  .template-button-group {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;

    .template-button.MuiButton-root,
    .template-button.MuiButton-root:hover {
      font-size: 20px;
    }
  }
  
  .ring-times-button-group {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    .info-ring-times {
      width: 100%;
      font-size: 20px;
      text-align: center;
    };
  
    .ring-times-button.MuiButton-root,
    .ring-times-button.MuiButton-root:hover {
      width: 100%;
      font-size: 20px;
    }
  }
`;

