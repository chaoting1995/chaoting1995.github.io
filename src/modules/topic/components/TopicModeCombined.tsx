import React from 'react';
import { css, cx } from '@emotion/css';

import { TopicBox, TopicDescription, TopicController }  from 'modules/topic';
import { DEFAULT_TOPIC_COMBINED } from 'modules/topic/resources/topic.constant';
import useSlotMachine from 'modules/topic/hooks/useSlotMachine';
import TopicMiddleItemMode from "modules/topic/components/TopicMiddleItemMode";

type Props = {
  className?: string;
};

const TopicModeCombined = (props: Props) => {
  const slotMachineTopicA = useSlotMachine(DEFAULT_TOPIC_COMBINED);
  const slotMachineTopicB = useSlotMachine(DEFAULT_TOPIC_COMBINED, 1);

  const handleSpin = () => {
    const chosenTopic = slotMachineTopicA.onSpin();
    slotMachineTopicB.onSpin(chosenTopic);
  };

  return (
    <div className={cx('DT-TopicModeCombined', style, props.className)}>
      <div className='top-section'>
        <TopicBox>{slotMachineTopicA.topic.name}</TopicBox>
        <TopicMiddleItemMode />
        <TopicBox>{slotMachineTopicB.topic.name}</TopicBox>
      </div>
      <div className='bottom-section'>
        <TopicDescription />
        <TopicController
          onSpin={handleSpin}
          disabledOnSpin={slotMachineTopicA.isSpinning || slotMachineTopicB.isSpinning}
        />
      </div>
    </div>
  );
};

export default TopicModeCombined;

const style = css`
  .top-section {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .bottom-section {
    width: 100%;
  }
`;
