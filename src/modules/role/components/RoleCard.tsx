import React from 'react';
import { css, cx } from '@emotion/css';
import { CardActionArea, CardActionAreaProps } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';

type Options = {
  className?: string;
  roleImg?: string;
  roleText?: string;
  hideCardStyle?: boolean;
  hide?: boolean;
  children?: React.ReactNode;
}

type Props<C extends React.ElementType> = CardActionAreaProps<C, { component?: C }> & Options;

const RoleCard = <C extends React.ElementType>(props : Props<C>) => {
  const { hideCardStyle, hide, roleImg, roleText, className, ...rest } = props;

  return (
    <CardActionArea
      {...rest}
      className={
        cx('DT-RoleCard', style, { 
        'hide-card-style': hideCardStyle,
        'hide': hide,
        },
        className)
      }
    >
      {props.children}
      {roleImg && <img src={roleImg} alt={roleText} />}
      {roleText && <div className='role-text'>{roleText}</div>}
    </CardActionArea>
  )
}

export default RoleCard;

const style = css`
  &.MuiCardActionArea-root {
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    
    background-color: rgba(217, 217, 217, 0.26);
    border: 1px solid #D9D9D9;

    width: 50%;
    opacity: 1;
    transition: opacity 0.5s ease, width 0.5s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &.hide-card-style,
    &.hide-card-style:hover {
      background-color: unset;
      border: unset;
    }

    &.hide {
      width: 0;
      opacity: 0;
      padding: 0;

      .role-text {
        display: none;
      }
    }

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }

    .role-text {
      color: ${styleSettingColor.text.secondary};
      font-size: 18px;
    }
  }
`;
