import React from "react";
import { css, cx } from "@emotion/css";

import Layout from "layouts/Layout";
import { DEFAULT_TIMER } from "resources/timer.constant";
import { Timer as TypeTimer } from "resources/timer.type";
import TimerNormal from "components/TimerNormal/TimerNormal";
import { EnumTimerMode } from "enums/enumTimerMode";

const Timer = () => {
  const [timer] = React.useState<TypeTimer>(DEFAULT_TIMER);

  const creator: Record<EnumTimerMode, React.ReactNode> = {
    [EnumTimerMode.Normal]: <TimerNormal timer={timer}/>,
    [EnumTimerMode.Crossfire]: <TimerNormal timer={timer}/>
  }

  return <Layout mainClassName={cx("DT-Timer", style())}>
    {creator[timer.mode]}
  </Layout>;
};

export default Timer;

const style = () => css``;