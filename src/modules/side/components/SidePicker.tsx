import React from 'react';
import { css, cx } from '@emotion/css';
import { CardActionArea } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';
import imgSidePositive from 'assets/img-side-positive.png';
import imgSideNegative from 'assets/img-side-negative.png';
import { Button } from 'components';
import { EnumSide } from 'modules/side/enums/enumSide';

const sideWording: Record<EnumSide, string> = {
  [EnumSide.Positive]: '正方',
  [EnumSide.Negative]: '反方'
};

type Props = {
  className?: string;
}

const SidePicker = (props: Props) => {
  const [currentSide, setCurrentSide] = React.useState<EnumSide | null>(null)
  const handleDraw = () => {};
  const handleChange = (side: EnumSide) => () => {
    console.log("ds")
    setCurrentSide(side);
  };

  React.useEffect(()=> {
    console.log({currentSide})
  },[currentSide])
  return (
    <div className={cx('DT-TopicController', props.className, style)}>
      <div className='side-picker-title'>持方</div>
      <div className='side-button-group'>
        <CardActionArea
          className={cx({ 'selected-side': currentSide === EnumSide.Positive})}
          onClick={handleChange(EnumSide.Positive)}
          disabled={!!currentSide}
        >
          <img src={imgSidePositive} alt='imgSidePositive'/>
          <div className='side-text'>{sideWording[EnumSide.Positive]}</div>
        </CardActionArea>
        <CardActionArea
          className={cx({ 'selected-side': currentSide === EnumSide.Negative})}
          onClick={handleChange(EnumSide.Negative)}
          disabled={!!currentSide}
        >
          <img src={imgSideNegative} alt='imgSideNegative'/>
          <div className='side-text'>{sideWording[EnumSide.Negative]}</div>
        </CardActionArea>
      </div>
     {!currentSide &&
      <Button variant='outlined' onClick={handleDraw}>
        抽籤
      </Button>
      }
    </div>
  )
}

export default SidePicker;

const style = css`
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .side-picker-title {
    font-size: 20px;
    font-weight: bold;
  }

  .side-button-group {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .MuiCardActionArea-root {
    background-color: rgba(217, 217, 217, 0.26);
    border: 1px solid #D9D9D9;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    &.selected-side,
    &.selected-side:hover {
      width: 50%;
      background-color: unset;
      border: unset;
    }

    &.Mui-disabled:not(.selected-side) {
      display: none;
    }

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }

    .side-text {
      color: ${styleSettingColor.text.secondary};
      font-size: 18px;
    }
  }
`;
