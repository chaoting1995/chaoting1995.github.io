import React from 'react';
import { css, cx } from '@emotion/css';

import imgSidePositive from 'assets/img-role-positive.png';
import imgSideNegative from 'assets/img-role-negative.png';
import { EnumSide } from 'modules/role/enums/enumSide';
import { RoleCard } from 'modules/role';
import UtilAudio from 'utils/audio';

const sideWording: Record<EnumSide, string> = {
  [EnumSide.Positive]: '正方',
  [EnumSide.Negative]: '反方'
};

export type EnumSideWithNull = EnumSide | null;

type Props = {
  className?: string;
  side: EnumSide | null;
  onChange: (_side: EnumSideWithNull) => void;
  disabled?: boolean;
}

const SidePicker = (props: Props) => {
  const handleChange = (_side: EnumSideWithNull) => () => {
    props.onChange(_side);
    UtilAudio.audioClick();
  };

  return (
    <div className={cx('DT-SidePicker', props.className, style, { 'selected': !!props.side })}>
      <RoleCard
        roleImg={imgSidePositive}
        roleText={sideWording[EnumSide.Positive]}
        hideCardStyle={!!props.side}
        hide={props.side === EnumSide.Negative}
        disabled={props.disabled}
        onClick={handleChange(EnumSide.Positive)}
      />
      <RoleCard
        roleImg={imgSideNegative}
        roleText={sideWording[EnumSide.Negative]}
        hideCardStyle={!!props.side}
        hide={props.side === EnumSide.Positive}
        disabled={props.disabled}
        onClick={handleChange(EnumSide.Negative)}
      />
    </div>
  )
}

export default SidePicker;

const style = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
  
  &.selected {
    gap: unset;
  }
`;
