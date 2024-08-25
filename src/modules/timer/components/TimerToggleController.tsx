import React from 'react';
import { css, cx } from '@emotion/css';
import { ArrowsLeftRight } from "@phosphor-icons/react";
import { IconButton } from "@mui/material";

import { styleSettingColor } from "styles/variables.style";

type Props = {
  className?: string;
  onClick: () => void;
};

const TimerToggleController = (props: Props) => {

  return <IconButton className={cx('DT-TimerToggleController', style(), props.className)} onClick={props.onClick}>
    <ArrowsLeftRight size={45} />
  </IconButton>;
};

export default TimerToggleController;

const style = () => css`
  &.MuiIconButton-root {
    margin: 0 auto 16px auto;
    width: 180px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 15px;
    border: 1px solid ${styleSettingColor.text.primary};
    display: flex;
    justify-content: center;
    gap: 20px;
    color: ${styleSettingColor.text.primary};
  }
`;

