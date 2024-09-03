import React from 'react';

import { Topic } from 'modules/topic/resources/topic.type';
import { EMPTY_TOPIC } from 'modules/topic/resources/topic.constant';
import useTopic from 'modules/topic/context/Topic/useTopic';
import usePopup from 'context/Popup/usePopup';

export type UseSlotMachine = {
  topic: Topic;
  isSpinning: boolean;
  onSpin: (excludeTopic?: Topic) => Topic | undefined;
  onChange: (topic: Topic) => void;
}

const useSlotMachine = (topics: Topic[], defaultIndex?: number): UseSlotMachine => {
  const popup = usePopup();
  const { topicDisabled } = useTopic();
  const newTopics = React.useMemo(() => {
    return topics.filter(item => !topicDisabled.includes(item.id));
  }, [topics, topicDisabled])

  const [isSpinning, setIsSpinning] = React.useState(false);
  const defaultItem = React.useMemo(() => {
    if (topics.length === 0) return EMPTY_TOPIC;
    if (!defaultIndex || !topics[defaultIndex]) return topics[0];
    return topics[defaultIndex];
  }, [topics, defaultIndex])

  const [topic, setTopic] = React.useState<Topic>(defaultItem);

  const onChange = React.useCallback((_topic: Topic) => {
    setTopic(_topic);
  }, []);

  const onSpin = React.useCallback((excludeTopic?: Topic) => {
    if (newTopics.length <= 1) {
      popup.notice(({ message: '無法抽題，辯題可選數量 < 2', severity: 'warning' }));
      return;
    }

    const _topics = newTopics.filter(item => item.id !== excludeTopic?.id);
    const randomIndex = Math.floor(Math.random() * _topics.length);
    const chosenTopic = _topics[randomIndex];

    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setTopic(chosenTopic);
    }, 2000);

    return chosenTopic;
  }, [popup, newTopics]);

  React.useEffect(() => {
    if (isSpinning) {
      const intervalID = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * newTopics.length);
        const randomTopic = newTopics[randomIndex];
        setTopic(randomTopic);
      }, 80);

      return () => clearInterval(intervalID);
    }
  }, [isSpinning, newTopics]);

  return {
    topic,
    onChange,
    isSpinning,
    onSpin,
  }
}

export default useSlotMachine;