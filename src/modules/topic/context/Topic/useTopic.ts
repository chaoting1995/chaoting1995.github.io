import React from 'react';

import { TopicContext } from "./Topic.context";

const useTopic = () => {
  const context = React.useContext(TopicContext);
  if (!context) {
    throw new Error('useTopic must be used within a TopicProvider');
  }
  return context;
};

export default useTopic;