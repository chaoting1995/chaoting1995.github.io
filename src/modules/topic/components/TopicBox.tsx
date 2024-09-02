import React from 'react'
import { css, cx } from '@emotion/css';
import { CardActionArea } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';

type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const TopicBox: React.FC<Props> = (props) => {
  return (
    <div className={cx('DT-TopicBox', style, props.className)}>
      <CardActionArea onClick={props.onClick}>
        {props.children}
      </CardActionArea>
    </div>
  )
}

export default TopicBox;

const style = css`
  width: 100%;

  .MuiCardActionArea-root {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 16px;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 30px;
    color: ${styleSettingColor.text.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;