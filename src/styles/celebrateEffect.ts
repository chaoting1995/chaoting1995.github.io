import { css } from "@emotion/css";
import imgRibbon from 'assets/img-ribbon.svg';

export const styleCelebrateEffect = css`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 573px;
    background-image: url(${imgRibbon});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    transform: translate(-50%, -50%) scale(0);
    animation-name: ribbon-effect;
    animation-duration: 1.5s;
    animation-timing-function: cubic-bezier(0.65, 0, 0.45, 1);
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes ribbon-effect {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }

    50% {
      transform: translate(-50%, -50%) scale(1);
    }
    
    100% {
      transform: translate(-50%, 150%) scale(1);
    }
  }
`;