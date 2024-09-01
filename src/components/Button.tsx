import React from "react";
import { css, cx } from "@emotion/css";
import { Button, ButtonProps, CircularProgress } from "@mui/material";

import { styleSettingColor } from "styles/variables.style";

interface ButtonOptions {
  loading?: boolean;
}

type Props<C extends React.ElementType> = ButtonProps<C, { component?: C }> & ButtonOptions;

const CustomizedButton = <C extends React.ElementType>(props: Props<C>) => {

  return (
    <Button
      {...props}
      className={cx(style, props.className, {
        center: props.center,
        underline: props.underline,
      })}
      startIcon={props.loading ? <CircularProgress color="inherit" size={24} /> : props.startIcon}
    >
      {props.children}
    </Button>
  );
};

export default CustomizedButton;

const style = css`
  &.MuiButton-root {
    text-transform: none;
    white-space: nowrap;
    border-radius: 10px;
    font-weight: normal;
    
    &.Mui-disabled {
      background-color: ${styleSettingColor.disabled};
    }
  }
`;
