import React from 'react';
import { useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';

import Layout from 'layouts/Layout';
import { DEFAULT_TIMER } from 'resources/timer.constant';
import { Timer as TypeTimer } from 'resources/timer.type';
import TimerModeNormal from 'modules/timer/components/TimerModeNormal';
import TimerModeCrossfire from 'modules/timer/components/TimerModeCrossfire';
import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import useInnerHeight from 'hooks/useInnerHeight';
import useTimers from 'context/Timers/useTimers';

const Timer = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const { timers } = useTimers();
  const [timer, setTimer] = React.useState<TypeTimer>(DEFAULT_TIMER);

  const creator: Record<EnumTimerMode, React.ReactNode> = {
    [EnumTimerMode.Normal]: <TimerModeNormal timer={timer} className='timer-mode' />,
    [EnumTimerMode.Crossfire]: <TimerModeCrossfire timer={timer} className='timer-mode' />
  }

  React.useEffect(() => {
    if (!id) return;
    const currentTimer = timers.find(item => item.id === id);
    if (!currentTimer) return;
    setTimer(currentTimer);
  }, [id, timers]);

  return <Layout mainClassName={cx('DT-Timer', style(innerHeight))}>
    {creator[timer.mode]}
  </Layout>;
};

export default Timer;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.default};
  color: ${styleSettingColor.text.primary};

  .timer-mode {
    padding: 20px 0;
    box-sizing: border-box;
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;