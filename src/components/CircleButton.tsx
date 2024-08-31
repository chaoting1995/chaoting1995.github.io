import React from 'react';
import { css, cx } from '@emotion/css';
import { IconButton, IconButtonProps } from "@mui/material";

type PropsCircleButton<C extends React.ElementType> = IconButtonProps<C, { component?: C }>;

const CircleButton = <C extends React.ElementType>(props: PropsCircleButton<C>) => {
  return <IconButton {...props} className={cx('DT-CircleButton', style())} onClick={props.onClick}>
    {props.children}
  </IconButton>;
};

export default CircleButton;

const style = () => css``;