import React from 'react';
import { css, cx } from '@emotion/css';

import { isDev } from 'modules/env/env';
import { styleSettingColor } from 'styles/variables.style';
type Props = {
  className?: string;
}

const TestTag = (props: Props) => {
  return (
    isDev ? <div className={cx('DT-TestTag', style, props.className)}>TEST</div> : <></>
  )
}

export default TestTag;

const style = css`
  margin-left: 5px;
  background-color: ${styleSettingColor.warning};
  color: ${styleSettingColor.text.secondary};
  border-radius: 5px;
  padding: 3px 6px;
  box-sizing: border-box;
  font-size: 10px;
`;

