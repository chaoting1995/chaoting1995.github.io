import React from 'react';

import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';

export type TopicContextType = {
  topicMode: EnumTopicMode;
  onChangeTopicMode: (topicMode: EnumTopicMode) => void;
  topicMiddleItemMode: EnumTopicMiddleItemMode;
  onChangeTopicMiddleItemMode: (topicMode: EnumTopicMiddleItemMode) => void;
  topicDisabled: string[];
  onChangeTopicDisabled: (topicID: string, disabled: boolean) => void;
};

export const TopicContext = React.createContext({} as TopicContextType);