import { css, keyframes } from '@emotion/css';
import {
  headShake,
  rubberBand,
  bounceOut,
  bounceInDown,
} from 'react-animations';

import { styleButton } from 'styles/button.style';
import { stylePage } from 'styles/page.style';
import { styleSettingColor } from 'styles/variables.style';
import { styleCard } from 'styles/card.style';
import { styleInput } from 'styles/input.style';

const basicStyle = css`
  font-family: 'Inter', sans-serif, -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;

  // remove the blue box that appears on click when use android mobile
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .color {
    // className color-primary
    &-primary {
      color: ${styleSettingColor.primary};
    }

    // className color-secondary
    &-secondary {
      color: ${styleSettingColor.secondary};
    }
  }

  .text {
    // className text-danger
    &-danger {
      color: ${styleSettingColor.danger};
    }

    // className text-info
    &-info {
      color: #03a9f4;
    }

    // className text-white
    &-white {
      color: #ffffff;
    }

    // className text-right
    &-right {
      text-align: right;
    }

    &-left {
      text-align: end;
    }
  }

  .bg {
    // className bg-info
    &-secondary {
      background-color: ${styleSettingColor.secondary} !important; // for bootstrap
    }

    // className bg-info
    &-info {
      background-color: ${styleSettingColor.info} !important; // for bootstrap
    }

    // className bg-white
    &-white {
      background-color: #fff; // for bootstrap
    }
  }

  .dd-divider {
    background-color: ${styleSettingColor.gray};
    width: 100%;
    height: 2px;
  }

  .dd-chip {
    background-color: #f0f0f0;
    box-shadow: 0 2.8px 2.2px 0 rgb(178 183 219 / 1%),
      0 6.7px 5.3px 0 rgb(178 183 219 / 2%),
      0 12.5px 10px 0 rgb(178 183 219 / 3%),
      0 22.3px 17.9px 0 rgb(178 183 219 / 3%),
      0 41.8px 33.4px 0 rgb(178 183 219 / 4%),
      0 100px 80px 0 rgb(178 183 219 / 5%);
    height: unset;
    .MuiChip-icon {
      margin-left: 3px;
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }

  .animate {
    // className animate-head-shake
    &-head-shake {
      animation: 1s ${keyframes`${headShake}`};
    }
    // className animate-rubber-band
    &-rubber-band {
      animation: 1s ${keyframes`${rubberBand}`};
    }
    // className animate-bounce-out
    &-bounce-out {
      animation: 1s ${keyframes`${bounceOut}`};
    }
    // className animate-bounce-in-down
    &-bounce-in-down {
      animation: 1s ${keyframes`${bounceInDown}`};
    }
  }

  .dd-hide {
    visibility: hidden;
  }

  .dd-d-none {
    display: none;
  }

  .skeleton-rounded.MuiSkeleton-root {
    border-radius: 4px;
  }

  ${styleInput}
  ${stylePage}
  ${styleCard}
`;

export const styleLineEllipsis = (number: number = 1): string => css`
  /* display: -webkit-box; */
  -webkit-line-clamp: ${number};
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default basicStyle;
