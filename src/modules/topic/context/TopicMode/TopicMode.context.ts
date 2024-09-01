import React from 'react';

import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';

export type TopicModeContextType = {
  topicMode: EnumTopicMode;
  onChangeTopicMode: (topicMode: EnumTopicMode) => void;
};

export const TopicModeContext = React.createContext({} as TopicModeContextType);