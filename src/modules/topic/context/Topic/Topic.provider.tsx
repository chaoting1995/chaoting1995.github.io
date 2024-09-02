import React from 'react';

import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';

import { TopicContext } from './Topic.context';

type Props = {
  children: React.ReactNode;
};

const TopicProvider = (props: Props) => {
  const [topicMode, setTopicMode] = React.useState(EnumTopicMode.Complete);
  const [topicMiddleItemMode, setTopicMiddleItemMode] = React.useState(EnumTopicMiddleItemMode.Causal);

  const onChangeTopicMode = React.useCallback((_topicMode: EnumTopicMode) => {
    setTopicMode(_topicMode);
    // ResourceTimer.updateTimers(updatedTimers);
  }, []);
  
  const onChangeTopicMiddleItemMode = React.useCallback((_topicMiddleItemMode: EnumTopicMiddleItemMode) => {
    setTopicMiddleItemMode(_topicMiddleItemMode);
    // ResourceTimer.updateTimers(updatedTimers);
  },[]);

  return (
    <TopicContext.Provider 
      value={{ 
        topicMode, 
        onChangeTopicMode,
        topicMiddleItemMode,
        onChangeTopicMiddleItemMode,
      }}
    >
      {props.children}
    </TopicContext.Provider>
  );
};

export default TopicProvider;