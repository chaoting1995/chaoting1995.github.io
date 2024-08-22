
import { css } from "@emotion/css";
import basicStyle from "styles/basic.style";
import { breakpoints, styleSettingZIndex } from "styles/variables.style";

export const styleDialog = css`
  ${basicStyle}

  &.MuiDialog-root {
    z-index: ${styleSettingZIndex.popup};
  }

  .MuiPaper-root {
    background-color: #fff;
    width: 100%;
    max-width: ${breakpoints.sm};
    max-height: 370px;
    border-radius: 20px;
  }
`;