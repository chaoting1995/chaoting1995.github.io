import React from 'react';
import { css, cx } from '@emotion/css';
import Realistic from "react-canvas-confetti/dist/presets/realistic";

import imgJudge from 'assets/img-role-judge.png';
import { RoleCard, SidePicker, type EnumSideWithNull } from 'modules/role';
import UtilAudio from 'utils/audio';

type Props = {
  className?: string;
}

const ResultPicker = (props: Props) => {
  const [startJudge, setStartJudge] = React.useState<boolean>(false);
  const [side, setSide] = React.useState<EnumSideWithNull>(null);

  const handelStartJudge = () => {
    setStartJudge(prevState => !prevState)
  }

  const handleChangeSide = (_side: EnumSideWithNull) => {
    // if (!startJudge) return;
    setSide(prevState => {
      if(prevState === _side) return null;
      UtilAudio.audioCelebration();
      return _side;
    });
  };

  return (
    <div className={cx('DT-ResultPicker', props.className, style, { 'selected': !!startJudge })}>
      <div className='result-picker-title'>{!side ? '判決' : '勝方'}</div>
      <div className='role-card-group'>
        <RoleCard
          className='judge-role-card'
          roleImg={imgJudge}
          roleText='裁判'
          hide={startJudge}
          hideCardStyle
          onClick={handelStartJudge}
          />
        <SidePicker
          className={cx({ 'hide-side-picker': !startJudge })}
          side={side} 
          onChange={handleChangeSide}
          disabled={!startJudge}
        />
      </div>
      {side && <Realistic autorun={{ speed: 1, duration: 2000 }} />}
    </div>
  )
}

export default ResultPicker;

const style = css`
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: 1s;

  &.selected {
    gap: 10px;
  }

  .result-picker-title {
    font-size: 20px;
    font-weight: bold;
  }

  .role-card-group {
    display: flex;
    justify-content: center;
  }

  .judge-role-card {
    padding: 10px 0px;
    img {
      width: 115%;
    }
  }

  .hide-side-picker {
    width: 0;
    opacity: 0;
    padding: 0;
    user-select: none;
  }
`;
