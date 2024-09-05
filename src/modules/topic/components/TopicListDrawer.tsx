import React from 'react'
import { css, cx } from '@emotion/css';
import { Gear } from '@phosphor-icons/react';
import { IconButton } from '@mui/material';

import { BottomDrawerHeader, BottomDrawerBody } from 'components';
import { Topic } from 'modules/topic/resources/topic.type';
import useDialog from 'hooks/useDialog';
import { TopicList, TopicListSetting } from 'modules/topic';

type Props = {
  className?: string;
  open?: boolean;
  children?: React.ReactNode;
  topics: Topic[];
  onChangeTopic: (topic: Topic) => void;
}

const TopicListDrawer: React.FC<Props> = (props) => {
  const [openSetting, handleOpenSetting, handleCloseSetting] = useDialog(false);

  const handleOpenSettingWithTraking = React.useCallback(() => {
    handleOpenSetting();
    // ServiceGA4.event(GA_EVENT.TimersEditor_Button_Settting);
  }, [handleOpenSetting]);

  // 依 props.open 判斷，每次開啟彈窗，就重置 openSetting
  React.useEffect(() => {
    if (props.open) handleCloseSetting();
  },[props.open, handleCloseSetting])

  if (openSetting) {
    return <TopicListSetting 
      className={cx(style, props.className)}
      onClose={handleCloseSetting}
    />
  }

  return (
    <div className={cx('DT-TopicListDrawer', style, props.className)}>
      <BottomDrawerHeader
        children='辯題列表'
        rightSide={
          <IconButton onClick={handleOpenSettingWithTraking}>
            <Gear size={28} weight='light'/>
          </IconButton>
        }
      />
      <BottomDrawerBody>
        <TopicList topics={props.topics} onChangeTopic={props.onChangeTopic} />
    </BottomDrawerBody>
    </div>
  )
}

export default TopicListDrawer;

const style = css`
  overflow: hidden;
  border-radius: inherit;
`;