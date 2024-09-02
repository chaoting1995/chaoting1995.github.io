import React from 'react';
import { css, cx } from '@emotion/css';

import { TopicBox }  from 'modules/topic';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';
import useTopic from 'modules/topic/context/Topic/useTopic';
import UtilAudio from 'utils/audio';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

const topicmiddleItemModeContentWoding: Record<EnumTopicMiddleItemMode, string> = {
  [EnumTopicMiddleItemMode.Causal]: '有利於/有害於',
  [EnumTopicMiddleItemMode.Compare]: '重於',
};

const switchMiddleItemMode: Record<EnumTopicMiddleItemMode, EnumTopicMiddleItemMode> = {
  [EnumTopicMiddleItemMode.Causal]: EnumTopicMiddleItemMode.Compare,
  [EnumTopicMiddleItemMode.Compare]: EnumTopicMiddleItemMode.Causal,
};

const topicMiddleItemModeOnTracking: Record<EnumTopicMiddleItemMode, () => void> = {
  [EnumTopicMiddleItemMode.Causal]: () => ServiceGA4.event(GA_EVENT.TopicCreator_Button_TopicMiddleItemMode_Causal),
  [EnumTopicMiddleItemMode.Compare]: () => ServiceGA4.event(GA_EVENT.TopicCreator_Button_TopicMiddleItemMode_Compare)
}

type Props = {
  className?: string;
};

const TopicMiddleItemMode = (props: Props) => {
  const { topicMiddleItemMode, onChangeTopicMiddleItemMode } = useTopic();

  const handleChange = () => {
    onChangeTopicMiddleItemMode(switchMiddleItemMode[topicMiddleItemMode]);
    UtilAudio.audioClick();
    topicMiddleItemModeOnTracking[switchMiddleItemMode[topicMiddleItemMode]]();
  };

  return (
    <TopicBox 
      className={cx('DT-TopicMiddleItemMode', style, props.className)}
      onClick={handleChange}
    >
      {topicmiddleItemModeContentWoding[topicMiddleItemMode]}
    </TopicBox>
  );
};

export default TopicMiddleItemMode;

const style = css``;
