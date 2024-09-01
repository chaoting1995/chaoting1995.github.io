import React from 'react';
import { css, cx } from '@emotion/css';

import { styleSettingColor } from 'styles/variables.style';
import { EnumTopicMode } from "modules/topic/enums/enumTopicMode";
import useTopicMode from 'modules/topic/context/TopicMode/useTopicMode';

const topicModeWording: Record<EnumTopicMode, string> = {
  [EnumTopicMode.Complete]: '完整辯題',
  [EnumTopicMode.Combined]: '組合辯題',
}

type Props = {
  className?: string;
};

const TopicDescription = (props: Props) => {
  const { topicMode } = useTopicMode();

  return <div className={cx('DT-TopicDescription', style, props.className)}>
    <div className='label-topic-mode'>辯題模式：{topicModeWording[topicMode]}</div>
  </div>;
};

export default TopicDescription;

const style = css`
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: ${styleSettingColor.background.light};
  display: flex;
  justify-content: flex-start;

  .label-topic-mode {
    font-size: 20px;
    color: ${styleSettingColor.text.primary};
  }
`;