import React from "react";
import { css, cx } from "@emotion/css";

import useInnerHeight from 'hooks/useInnerHeight';
import { styleSettingColor } from "styles/variables.style";

type Props = {
  className?: string;
  children: React.ReactNode;
  center?: boolean;
};

const BottomDrawerBody = (props: Props) => {
  const [innerHeight] = useInnerHeight();

  return (
    <div className={cx(
      'DT-BottomDrawerBody', 
      style(innerHeight), 
      props.className,
      { 'center': props.center }
    )}>
      {props.children}
    </div>
  );
};

export default BottomDrawerBody;

const style = (_innerHeight: number) => css`
  width: 100%;
  max-height: calc(${_innerHeight}px * 0.9 - 32px - 32px);
  overflow-y: auto;
  padding-bottom: 32px;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;
  gap: 5px;

  &.center {
    align-items: center;
  }
  
  font-size: 18px;
  color: ${styleSettingColor.text.secondary};
  
  .MuiButton-root,
  .MuiButton-root:hover {
    font-size: 18px;
    font-weight: normal;
  }
  
`;