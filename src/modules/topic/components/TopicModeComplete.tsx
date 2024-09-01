import React from 'react';
import { css, cx } from '@emotion/css';

import TopicBox from 'modules/topic/components/TopicBox';
import TopicController from 'modules/topic/components/TopicController';
import useSlotMachine from 'modules/topic/hooks/useSlotMachine';
import { DEFAULT_TOPIC_COMPLETE } from 'modules/topic/resources/topic.constant';

type Props = {
  className?: string;
  renderSection?: React.ReactNode;
};

const TopicModeComplete = (props: Props) => {
  const slotMachine = useSlotMachine(DEFAULT_TOPIC_COMPLETE);

  return (
    <div className={cx('DT-TopicModeComplete', style, props.className)}>
      <div className='top-section'>
        <TopicBox className='complete-topic'>{slotMachine.topic.name}</TopicBox>
      </div>
      <div className='bottom-section'>
        {props.renderSection}
        <TopicController onSpin={slotMachine.onSpin} disabledOnSpin={slotMachine.isSpinning} />
      </div>
    </div>
  )
}

export default TopicModeComplete;

const style = css`
  .top-section {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .complete-topic {
      min-height: 84px;
    }
  }
  
  .bottom-section {
    width: 100%;
  }
`;
