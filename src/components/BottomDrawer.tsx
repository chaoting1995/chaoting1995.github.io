import React from "react";
import { css, cx } from "@emotion/css";
import { SwipeableDrawer } from "@mui/material";

import Loading from "components/Loading";
import { breakpoints, styleSettingZIndex } from "styles/variables.style";
import basicStyle from "styles/basic.style";

type Props = {
  className?: string;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: JSX.Element;
};

const BottomDrawer = (props: Props) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={props.open}
      onClose={props.onClose}
      onOpen={props.onOpen}
      className={cx(style, props.className)}
    >
      <React.Suspense fallback={<Loading className="dd-drawer-loading" />}>
        {props.children}
      </React.Suspense>
    </SwipeableDrawer>
  );
};

export default BottomDrawer;

const style = css`
  ${basicStyle}

  &.MuiDialog-root {
    z-index: ${styleSettingZIndex.popup};
  }

  .MuiDrawer-paper {
    background-color: #fff;
    overflow: inherit;
    max-height: 90%;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
    
    @media(min-width: ${breakpoints.sm}) {
        border-radius: 20px;
        width: ${breakpoints.sm};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)!important;
        height: fit-content;
        padding-left: 8px;
        padding-right: 8px;
        box-sizing: border-box;
    }

   .dd-drawer.dd-card {
      background-color: unset;

      .dd-card-divider {
        width: calc(100% + 32px);
        margin-left: -16px;
      }
    }
  }

  .dd-drawer-loading {
    min-height: 313px;
  }
`;