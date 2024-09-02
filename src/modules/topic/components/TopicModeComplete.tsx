import React from 'react';
import { css, cx } from '@emotion/css';

import UtilAudio from 'utils/audio';
import { BottomDrawer } from 'components';
import useDialog from 'hooks/useDialog';
import useSlotMachine from 'modules/topic/hooks/useSlotMachine';
import { TopicBox, TopicList, TopicDescription, TopicController }  from 'modules/topic';
import { DEFAULT_TOPIC_COMPLETE } from 'modules/topic/resources/topic.constant';
import { Topic } from 'modules/topic/resources/topic.type';

type Props = {
  className?: string;
};

const TopicModeComplete = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);
  const slotMachine = useSlotMachine(DEFAULT_TOPIC_COMPLETE);

  const handleClickTopicBox = () => {
    handleOpen();
    UtilAudio.audioClick();
  };

  const handleChangeTopic = (_topic: Topic) => {
    slotMachine.onChange(_topic);
    handleClose();
  };

  return (
    <div className={cx('DT-TopicModeComplete', style, props.className)}>
      <div className='top-section'>
        <TopicBox className='complete-topic' onClick={handleClickTopicBox} >{slotMachine.topic.name}</TopicBox>
      </div>
      <div className='bottom-section'>
        <TopicDescription />
        <TopicController onSpin={slotMachine.onSpin} disabledOnSpin={slotMachine.isSpinning} />
      </div>
      <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
        <TopicList topics={DEFAULT_TOPIC_COMPLETE} onChangeTopic={handleChangeTopic}/>
    </BottomDrawer>
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
