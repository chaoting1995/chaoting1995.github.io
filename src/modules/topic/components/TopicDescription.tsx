import React from 'react';
import { css, cx } from '@emotion/css';

import { styleSettingColor } from 'styles/variables.style';
import { EnumTopicMode } from "modules/topic/enums/enumTopicMode";
import useTopic from 'modules/topic/context/Topic/useTopic';

const topicModeWording: Record<EnumTopicMode, string> = {
  [EnumTopicMode.Complete]: '完整辯題',
  [EnumTopicMode.Combined]: '組合辯題',
}

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const TopicDescription = (props: Props) => {
  const { topicMode } = useTopic();
  
  return <div className={cx('DT-TopicDescription', style, props.className)}>
    <div>辯題模式：{topicModeWording[topicMode]}</div>
    {props.children}
  </div>;
};

export default TopicDescription;

const style = css`
  width: 100%;
  margin-bottom: 20px;
  padding: 16px;
  box-sizing: border-box;
  background-color: ${styleSettingColor.background.light};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 18px;
`;