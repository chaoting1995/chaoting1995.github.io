import React from 'react';

import { Topic } from 'modules/topic/resources/topic.type';
import { EMPTY_TOPIC } from 'modules/topic/resources/topic.constant';
import useTopic from 'modules/topic/context/Topic/useTopic';

export type UseSlotMachine = {
  enableTopics: Topic[];
  topic: Topic;
  isSpinning: boolean;
  onSpin: (excludeTopic?: Topic) => Topic | undefined;
  onChange: (topic: Topic) => void;
}

const useSlotMachine = (topics: Topic[], topicBackItem?: boolean): UseSlotMachine => {
  const { topicDisabled } = useTopic();
  const enableTopics = React.useMemo(() => {
    return topics.filter(item => !topicDisabled.includes(item.id));
  }, [topics, topicDisabled])

  const [isSpinning, setIsSpinning] = React.useState(false);
  const defaultItem = React.useMemo(() => {
    if (enableTopics.length === 0) return EMPTY_TOPIC;

    const defaultFrontItem = enableTopics[0];
    const defaultBackItem = enableTopics[1]
    if (!topicBackItem) return defaultFrontItem;
    if (!defaultBackItem) return defaultFrontItem;
    return defaultBackItem;
  }, [enableTopics, topicBackItem])

  const [topic, setTopic] = React.useState<Topic>(defaultItem);

  const onChange = React.useCallback((_topic: Topic) => {
    setTopic(_topic);
  }, []);

  const onSpin = React.useCallback((excludeTopic?: Topic) => {
    if (enableTopics.length <= 1) {
      return;
    }

    const newTopics = enableTopics.filter(item => item.id !== excludeTopic?.id);
    const randomIndex = Math.floor(Math.random() * newTopics.length);
    const chosenTopic = newTopics[randomIndex];

    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setTopic(chosenTopic);
    }, 2000);

    return chosenTopic;
  }, [enableTopics]);

  React.useEffect(() => {
    if (isSpinning) {
      const intervalID = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enableTopics.length);
        const randomTopic = enableTopics[randomIndex];
        setTopic(randomTopic);
      }, 80);

      return () => clearInterval(intervalID);
    }
  }, [isSpinning, enableTopics]);

  return {
    enableTopics,
    topic,
    onChange,
    isSpinning,
    onSpin,
  }
}

export default useSlotMachine;