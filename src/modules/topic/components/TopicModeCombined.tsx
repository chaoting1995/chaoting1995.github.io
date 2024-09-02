import React from 'react';
import { css, cx } from '@emotion/css';

import UtilAudio from 'utils/audio';
import { BottomDrawer } from 'components';
import useDialog from 'hooks/useDialog';
import useSlotMachine from 'modules/topic/hooks/useSlotMachine';
import { TopicMiddleItemMode } from 'modules/topic';
import { TopicBox, TopicList, TopicDescription, TopicController }  from 'modules/topic';
import { DEFAULT_TOPIC_COMBINED } from 'modules/topic/resources/topic.constant';

type Props = {
  className?: string;
};

const TopicModeCombined = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);
  const slotMachineTopicFrontItem = useSlotMachine(DEFAULT_TOPIC_COMBINED);
  const slotMachineTopicBackItem = useSlotMachine(DEFAULT_TOPIC_COMBINED, 1);

  const handleSpin = () => {
    const chosenTopic = slotMachineTopicFrontItem.onSpin();
    slotMachineTopicBackItem.onSpin(chosenTopic);
  };

  const handleOpenWithAudio = () => {
    handleOpen();
    UtilAudio.audioClick();
  };

  return (
    <div className={cx('DT-TopicModeCombined', style, props.className)}>
      <div className='top-section'>
        <TopicBox onClick={handleOpenWithAudio}>{slotMachineTopicFrontItem.topic.name}</TopicBox>
        <TopicMiddleItemMode />
        <TopicBox onClick={handleOpenWithAudio}>{slotMachineTopicBackItem.topic.name}</TopicBox>
      </div>
      <div className='bottom-section'>
        <TopicDescription />
        <TopicController
          onSpin={handleSpin}
          disabledOnSpin={slotMachineTopicFrontItem.isSpinning || slotMachineTopicBackItem.isSpinning}
        />
      </div>
      <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
        <TopicList topics={DEFAULT_TOPIC_COMBINED} />
      </BottomDrawer>
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
