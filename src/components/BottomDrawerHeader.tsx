import React from "react";
import { css, cx } from "@emotion/css";

import { styleSettingColor } from "styles/variables.style";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const BottomDrawerHeader = (props: Props) => {
  return (
    <div className={cx('DT-BottomDrawerHeader', style, props.className)}>
      {props.children}
    </div>
  );
};

export default BottomDrawerHeader;

const style = css`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid ${styleSettingColor.background.light};
  
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  font-size: 22px;
  color: ${styleSettingColor.background.dark};
`;