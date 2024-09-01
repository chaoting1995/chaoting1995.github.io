import React from 'react';

import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';

import { TopicModeContext } from './TopicMode.context';

type Props = {
  children: React.ReactNode;
};

const TopicModeProvider = (props: Props) => {
  const [topicMode, setTopicMode] = React.useState(EnumTopicMode.Complete);

  const onChangeTopicMode = (topicMode: EnumTopicMode) => {
    setTopicMode(topicMode);
    // ResourceTimer.updateTimers(updatedTimers);
  };

  return (
    <TopicModeContext.Provider value={{ topicMode, onChangeTopicMode }}>
      {props.children}
    </TopicModeContext.Provider>
  );
};

export default TopicModeProvider;