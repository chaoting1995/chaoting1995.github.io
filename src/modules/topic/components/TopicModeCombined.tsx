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
  const slotMachineTopicFrontItem = useSlotMachine(DEFAULT_TOPIC_COMBINED);
  const slotMachineTopicBackItem = useSlotMachine(DEFAULT_TOPIC_COMBINED, 1);

  const handleSpin = () => {
    const chosenTopic = slotMachineTopicFrontItem.onSpin();
    slotMachineTopicBackItem.onSpin(chosenTopic);
  };

  return (
    <div className={cx('DT-TopicModeCombined', style, props.className)}>
      <div className='top-section'>
        <TopicBox>{slotMachineTopicFrontItem.topic.name}</TopicBox>
        <TopicMiddleItemMode />
        <TopicBox>{slotMachineTopicBackItem.topic.name}</TopicBox>
      </div>
      <div className='bottom-section'>
        <TopicDescription />
        <TopicController
          onSpin={handleSpin}
          disabledOnSpin={slotMachineTopicFrontItem.isSpinning || slotMachineTopicBackItem.isSpinning}
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
