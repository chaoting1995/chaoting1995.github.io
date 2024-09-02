import React from 'react';

import { Topic } from 'modules/topic/resources/topic.type';
import { EMPTY_TOPIC } from 'modules/topic/resources/topic.constant';

export type UseSlotMachine = {
  topic: Topic;
  isSpinning: boolean;
  onSpin: (excludeTopic?: Topic) => Topic;
  onChange: (topic: Topic) => void;
}

const useSlotMachine = (topics: Topic[], defaultIndex?: number): UseSlotMachine => {
  const [isSpinning, setIsSpinning] = React.useState(false);
  const defaultItem = React.useMemo(() => {
    if (topics.length === 0) return EMPTY_TOPIC;
    if (!defaultIndex || !topics[defaultIndex]) return topics[0];
    return topics[defaultIndex];
  }, [topics, defaultIndex])

  const [topic, setTopic] = React.useState<Topic>(defaultItem);

  const onChange = (_topic: Topic) => {
    setTopic(_topic);
  };

  const onSpin = (excludeTopic?: Topic) => {
    const newTopics = topics.filter(item => excludeTopic ? item.id !== excludeTopic.id : item);
    const chosenTopic = newTopics[Math.floor(Math.random() * topics.length)];

    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      setTopic(chosenTopic);
    }, 2000);

    return chosenTopic;
  };

  React.useEffect(() => {
    if (isSpinning) {
      const intervalID = setInterval(() => {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        setTopic(randomTopic);
      }, 80);

      return () => clearInterval(intervalID);
    }
  }, [isSpinning, topics]);

  return {
    topic,
    onChange,
    isSpinning,
    onSpin,
  }
}

export default useSlotMachine;