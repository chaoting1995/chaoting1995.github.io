import { css } from "@emotion/css";
import {
  breakpoints,
  styleSettingColor,
} from "styles/variables.style";

export const stylePage = css`
  position: relative;

  .dd-page-title {
    margin-bottom: 8px;
    color: ${styleSettingColor.text.primary};
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
  }

  .dd-page-subtitle {
    margin-bottom: 8px;
    color: ${styleSettingColor.text.primary};
    font-weight: bold;
    font-size: 16px;
  }

  .dd-page-description {
    margin-bottom: 8px;
    color: ${styleSettingColor.text.secondary};
    font-size: 12px;

    text-align: center;
  }

  .dd-page-error-message,
  .dd-page-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const styleContainerSection = css`
  margin: 0 auto;
  width: 100%;
  max-width: ${breakpoints.sm};
  padding: 16px 8px;
  box-sizing: border-box;
`;

export const styleFullWidthSection = css`
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
`;
