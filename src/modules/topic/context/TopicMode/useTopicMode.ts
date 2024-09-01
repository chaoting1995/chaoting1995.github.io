import React from 'react';

import { TopicModeContext } from "./TopicMode.context";

const useTopicMode = () => {
  const context = React.useContext(TopicModeContext);
  if (!context) {
    throw new Error('useTopicMode must be used within a TopicModeProvider');
  }
  return context;
};

export default useTopicMode;