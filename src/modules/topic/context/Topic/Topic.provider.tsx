import React from 'react';

import { ResourceTopic } from 'modules/topic';
import { TopicSetting } from 'modules/topic/resources/topic.type';
import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';

import { TopicContext } from './Topic.context';

type Props = {
  children: React.ReactNode;
};

const TopicProvider = (props: Props) => {
  const _topicSetting: TopicSetting = ResourceTopic.getTopiSetting();
  const [topicMode, setTopicMode] = React.useState<EnumTopicMode>(_topicSetting.topicMode);
  const [topicMiddleItemMode, setTopicMiddleItemMode] = React.useState<EnumTopicMiddleItemMode>(_topicSetting.topicMiddleItemMode);
  const [topicDisabled, setTopicDisabled] = React.useState<string[]>(_topicSetting.topicDisabled);
  
  const onChangeTopicMode = React.useCallback((_topicMode: EnumTopicMode) => {
    setTopicMode(_topicMode);
    ResourceTopic.updateTopicSettingTopicMode(_topicMode);
  }, []);
  
  const onChangeTopicMiddleItemMode = React.useCallback((_topicMiddleItemMode: EnumTopicMiddleItemMode) => {
    setTopicMiddleItemMode(_topicMiddleItemMode);
    ResourceTopic.updateTopicSettingTopicMiddleItemMode(_topicMiddleItemMode);
  }, []);

  const onChangeTopicDisabled = React.useCallback((topicID: string, disabled: boolean) => {
    const newTopicDisabled = ResourceTopic.updateTopicSettingTopicDisabled(topicID, disabled);
    setTopicDisabled(newTopicDisabled);
  }, []);

  return (
    <TopicContext.Provider 
      value={{ 
        topicMode, 
        onChangeTopicMode,
        topicMiddleItemMode,
        onChangeTopicMiddleItemMode,
        topicDisabled,
        onChangeTopicDisabled
      }}
    >
      {props.children}
    </TopicContext.Provider>
  );
};

export default TopicProvider;