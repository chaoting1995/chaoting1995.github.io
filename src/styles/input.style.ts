import { css } from "@emotion/css";
import { styleSettingColor } from "styles/variables.style";

export const styleInput = css`
  .dd-input {
    /* margin: 0 4px; */
    height: 35px;
    width: 100%;
    border-radius: 6px;
    border: 0.5px solid ${styleSettingColor.disabled};

    &.disabled {
      border: 0.5px solid ${styleSettingColor.disabled};
      opacity: 0.5;
    }

    .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline,
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 0 solid rgba(0, 0, 0, 0);
      height: 100%;
    }

    .MuiInputBase-root {
      width: 100%;
      height: 100%;
      padding: 0px;

      &.Mui-focused {
        border: 1px solid ${styleSettingColor.primary};
      }

      input {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
      }
    }
  }
`;