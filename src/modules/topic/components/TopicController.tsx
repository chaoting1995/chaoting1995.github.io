import React from 'react';
import { css, cx } from '@emotion/css';
import { ArrowsClockwise, MaskHappy, Gavel } from '@phosphor-icons/react';

import { styleSettingColor } from 'styles/variables.style';
import CircleButton from 'components/CircleButton';

type Props = {
  className?: string;
  onSpin: () => void;
  disabledOnSpin?: boolean;
};

const TopicController = (props: Props) => {

  return <div className={cx('DT-TopicController', props.className, style)}>
    <CircleButton onClick={props.onSpin} disabled={props.disabledOnSpin}>
      <ArrowsClockwise size={40}/>
    </CircleButton>
    <CircleButton onClick={()=>{}}>
      <MaskHappy size={40} />
    </CircleButton>
    <CircleButton onClick={()=>{}}>
      <Gavel size={40} />
    </CircleButton>
  </div>;
};

export default TopicController;

const style = css`
  display: flex;
  justify-content: center;
  gap: 20px;

  .MuiIconButton-root {
    height: 85px;
    width: 85px;
    min-width: 85px;
    border: 1px solid ${styleSettingColor.text.primary};
    color: ${styleSettingColor.text.primary};

    &.Mui-disabled {
      color: ${styleSettingColor.text.primary};
      opacity: 0.5;
    }
  }
`;

