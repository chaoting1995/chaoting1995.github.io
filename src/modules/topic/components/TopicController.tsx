import React from 'react';
import { css, cx } from '@emotion/css';
import { 
  ArrowsClockwise, 
  MaskHappy,
  // Orange,
  // OrangeSlice,
  Circle,
  ChartPieSlice,
  // ChartPie,
 } from '@phosphor-icons/react';

import { styleSettingColor } from 'styles/variables.style';
import { CircleButton, Dialog } from 'components';
import UtilAudio from 'utils/audio';
import useDialog from 'hooks/useDialog';
import { RolePicker } from 'modules/role';
import useTopicMode from 'modules/topic/context/TopicMode/useTopicMode';
import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';

const switchTopicMode:  Record<EnumTopicMode, EnumTopicMode> = {
  [EnumTopicMode.Complete]: EnumTopicMode.Combined,
  [EnumTopicMode.Combined]: EnumTopicMode.Complete
}

type Props = {
  className?: string;
  onSpin: () => void;
  disabledOnSpin?: boolean;
};

const TopicController = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);
  
  const { topicMode, onChangeTopicMode } = useTopicMode();
  const topicModeIconCreator: Record<EnumTopicMode, React.ReactNode> = {
    [EnumTopicMode.Complete]: <Circle size={40} weight="thin"/>,
    [EnumTopicMode.Combined]: <ChartPieSlice size={40} weight="thin"/>
  }

  const handleToggle = () => {
    onChangeTopicMode(switchTopicMode[topicMode]);
  };

  const handleSpin = () => {
    props.onSpin();
    UtilAudio.audioRolling();
  };

  return (
    <div className={cx('DT-TopicController', props.className, style)}>
      <CircleButton onClick={handleToggle}>
        {topicModeIconCreator[topicMode]}
      </CircleButton>
      <CircleButton onClick={handleSpin} disabled={props.disabledOnSpin}>
        <ArrowsClockwise size={40} weight="thin"/>
      </CircleButton>
      <CircleButton onClick={handleOpen}>
        <MaskHappy size={40} weight="thin"/>
      </CircleButton>
      {open && 
        <Dialog 
          className={styleDialog}
          open={open}
          onClose={handleClose}
          hideCloseButton
        >
          <RolePicker />
        </Dialog>
      }
    </div>
  );
};

export default TopicController;

const style = css`
  display: flex;
  justify-content: center;
  gap: 20px;

  .MuiIconButton-root {
    height: 85px;
    width: 85px;
    min-width: 85px;
    border: 1px solid ${styleSettingColor.text.primary};
    color: ${styleSettingColor.text.primary};

    &.Mui-disabled {
      color: ${styleSettingColor.text.primary};
      opacity: 0.5;
    }

    @media(max-width: 300px) {
      height: 65px;
      width: 65px;
      min-width: 65px;
    }
  }
`;

const styleDialog = css`
  .MuiPaper-root.MuiDialog-paper {
    min-width: 250px;
    overflow: visible;
  }
`;
