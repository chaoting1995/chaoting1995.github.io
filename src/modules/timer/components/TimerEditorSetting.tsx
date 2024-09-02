import React from 'react'
import { css, cx } from '@emotion/css';
import { Button } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';
import { TEMPLATE_TIMERS } from 'modules/timer/resources/timer.constant';
import { Timer } from 'modules/timer/resources/timer.type';

type Props = {
  className?: string;
  onUseTemplateTimer: (timer: Timer) => void;
}

const TimerEditorSetting = (props: Props) => {
  const handleUseTemplateTimer = (timer: Timer) => () => {
    props.onUseTemplateTimer(timer);
  }

  return (
    <div className={cx('DT-TimerEditorSetting', style, props.className)}>
      <div className="setting-title">使用模板</div>
      <div className='template-button-group'>
        {TEMPLATE_TIMERS.map((item) => (
          <Button key={item.name} variant='outlined' color="secondary" onClick={handleUseTemplateTimer(item)}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default TimerEditorSetting;

const style = css`
  padding-top: 16px;
  box-sizing: border-box;
  
  .setting-title {
    margin-bottom: 10px;
    font-size: 18px;
    color: ${styleSettingColor.background.dark};
  }
  
  .setting-subtitle {
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 14px;
    color: ${styleSettingColor.text.secondary};
  }

  .template-button-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

