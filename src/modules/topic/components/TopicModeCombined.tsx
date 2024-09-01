import React from 'react';
import { css, cx } from '@emotion/css';

import TopicBox from 'modules/topic/components/TopicBox';
import TopicController from 'modules/topic/components/TopicController';
import { EnumMiddleItem } from 'modules/topic/enums/enumMiddleItem';
import { DEFAULT_TOPIC_COMBINED } from 'modules/topic/resources/topic.constant';
import useSlotMachine from 'modules/topic/hooks/useSlotMachine';

const middleItemWoding: Record<EnumMiddleItem, string> = {
  [EnumMiddleItem.Causal]: '有利於/有害於',
  [EnumMiddleItem.Compare]: '重於',
};

const switchMiddleItem: Record<EnumMiddleItem, EnumMiddleItem> = {
  [EnumMiddleItem.Causal]: EnumMiddleItem.Compare,
  [EnumMiddleItem.Compare]: EnumMiddleItem.Causal,
};

type Props = {
  className?: string;
  renderSection?: React.ReactNode;
};

const TopicModeCombined = (props: Props) => {
  const [currentMiddleItem, setCurrentMiddleItem] = React.useState(EnumMiddleItem.Causal);
  const slotMachineTopicA = useSlotMachine(DEFAULT_TOPIC_COMBINED);
  const slotMachineTopicB = useSlotMachine(DEFAULT_TOPIC_COMBINED);

  const handleChange = (middleItem: EnumMiddleItem) => () => {
    console.log('middleItem', middleItem);
    setCurrentMiddleItem(middleItem);
  };

  const handleSpin = () => {
    const chosenTopic = slotMachineTopicA.onSpin();
    slotMachineTopicB.onSpin(chosenTopic);
  };

  return (
    <div className={cx('DT-TopicModeCombined', style, props.className)}>
      <div className='top-section'>
        <TopicBox className='combined-topic'>{slotMachineTopicA.topic.name}</TopicBox>
        <TopicBox className='combined-topic-middle' onClick={handleChange(switchMiddleItem[currentMiddleItem])}>
          {middleItemWoding[currentMiddleItem]}
        </TopicBox>
        <TopicBox className='combined-topic'>{slotMachineTopicB.topic.name}</TopicBox>
      </div>
      <div className='bottom-section'>
        {props.renderSection}
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
