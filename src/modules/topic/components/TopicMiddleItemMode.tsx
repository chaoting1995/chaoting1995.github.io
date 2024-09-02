import React from 'react';
import { css, cx } from '@emotion/css';

import { TopicBox }  from 'modules/topic';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';
import useTopic from 'modules/topic/context/Topic/useTopic';
import UtilAudio from 'utils/audio';

const topicmiddleItemModeContentWoding: Record<EnumTopicMiddleItemMode, string> = {
  [EnumTopicMiddleItemMode.Causal]: '有利於/有害於',
  [EnumTopicMiddleItemMode.Compare]: '重於',
};

const switchMiddleItem: Record<EnumTopicMiddleItemMode, EnumTopicMiddleItemMode> = {
  [EnumTopicMiddleItemMode.Causal]: EnumTopicMiddleItemMode.Compare,
  [EnumTopicMiddleItemMode.Compare]: EnumTopicMiddleItemMode.Causal,
};

type Props = {
  className?: string;
};

const TopicMiddleItemMode = (props: Props) => {
  const { topicMiddleItemMode, onChangeTopicMiddleItemMode } = useTopic();

  const handleChange = (topicmiddleItemMode: EnumTopicMiddleItemMode) => () => {
    onChangeTopicMiddleItemMode(topicmiddleItemMode);
    UtilAudio.audioClick();
  };

  return (
    <TopicBox 
      className={cx('DT-TopicMiddleItemMode', style, props.className)}
      onClick={handleChange(switchMiddleItem[topicMiddleItemMode])}
    >
      {topicmiddleItemModeContentWoding[topicMiddleItemMode]}
    </TopicBox>
  );
};

export default TopicMiddleItemMode;

const style = css``;
