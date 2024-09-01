import React from 'react';

import { Topic } from 'modules/topic/resources/topic.type';
import { EMPTY_TOPIC } from 'modules/topic/resources/topic.constant';

export type UseSlotMachine = {
  topic: Topic;
  isSpinning: boolean;
  onSpin: (excludeTopic?: Topic) => Topic;
}

const useSlotMachine = (topics: Topic[]): UseSlotMachine => {
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [topic, setTopic] = React.useState<Topic>(topics.length === 0 ? EMPTY_TOPIC : topics[0]);

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
    isSpinning,
    onSpin,
  }
}

export default useSlotMachine;