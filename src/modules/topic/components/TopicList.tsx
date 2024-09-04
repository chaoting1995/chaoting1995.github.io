import React from 'react'
import { css, cx } from '@emotion/css';
import { Eye, EyeSlash, Gear } from '@phosphor-icons/react';
import { List, ListItemButton, ListItem, ListItemSecondaryAction, IconButton } from '@mui/material';

import UtilAudio from 'utils/audio';
import { BottomDrawerHeader, BottomDrawerBody } from 'components';
import { styleLineEllipsis } from 'styles/basic.style';
import { styleSettingColor } from 'styles/variables.style';
import { Topic } from 'modules/topic/resources/topic.type';
import useTopic from 'modules/topic/context/Topic/useTopic';
import useDialog from 'hooks/useDialog';
import TopicListSetting from "modules/topic/components/TopicListSetting";

type Props = {
  className?: string;
  children?: React.ReactNode;
  topics: Topic[];
  onChangeTopic: (topic: Topic) => void;
}

const TopicList: React.FC<Props> = (props) => {
  const { topicDisabled, onChangeTopicDisabled } = useTopic();
  const [openSetting, handleOpenSetting, handleCloseSetting] = useDialog(false);

  const handleChangeTopic = React.useCallback((_topic: Topic) => () => {
    props.onChangeTopic(_topic);
    UtilAudio.audioClick();
  },[props]);

  const handleChangeTopicDisabled = React.useCallback((topicID: string, disabled: boolean) =>  () => {
    onChangeTopicDisabled(topicID, disabled)
  }, [onChangeTopicDisabled])

  const handleOpenSettingWithTraking = React.useCallback(() => {
    handleOpenSetting();
    // ServiceGA4.event(GA_EVENT.TimersEditor_Button_Settting);
  }, [handleOpenSetting]);

  if (openSetting) {
    return <TopicListSetting 
      className={cx(style, props.className)}
      onClose={handleCloseSetting}
    />
}

  return (
    <div className={cx('DT-TopicList', style, props.className)}>
      <BottomDrawerHeader
        children='辯題列表'
        rightSide={
          <IconButton onClick={handleOpenSettingWithTraking}>
            <Gear size={28} weight='light'/>
          </IconButton>
        }
      />
      <BottomDrawerBody>
        {props.topics.length === 0 &&
          <div className='empty-box'>
            <div>尚無辯題選項</div>
          </div>}
        <List disablePadding>
          {props.topics.map((item) => 
            <ListItem key={item.id} disablePadding className={cx({'topic-pull-off': topicDisabled.includes(item.id)})}>
              <ListItemButton onClick={handleChangeTopic(item)}>
                <div className='item-name'>{item.name}</div>
              </ListItemButton>
              <ListItemSecondaryAction className='item-actions'>
                {topicDisabled.includes(item.id) ? (
                  <IconButton onClick={handleChangeTopicDisabled(item.id, false)}>
                    <EyeSlash size={26} weight='light' />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleChangeTopicDisabled(item.id, true)}>
                    <Eye size={26} weight='light'/>
                  </IconButton>
                )}
              </ListItemSecondaryAction>
          </ListItem>)}
        </List>
    </BottomDrawerBody>
    </div>
  )
}

export default TopicList;

const style = css`
  overflow: hidden;
  border-radius: inherit;

  .MuiInput-root {
    font-size: 18px;
  }

  .MuiFormHelperText-root {
    position: absolute;
    bottom: -22px;
  }

  .empty-box {
    padding: 8px 16px;
    padding-top: 40px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
  }

  a {
    color: ${styleSettingColor.text.secondary};
  }

  .MuiListItem-root {
    padding-right: 0;
    
    &.topic-pull-off {
      background-color: ${styleSettingColor.gray};
      opacity: 0.6;
    }
  }

  .MuiListItem-root > .MuiListItemButton-root {
    padding-right: 16px;
    padding-left: 16px;
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px solid ${styleSettingColor.disabled};
  }

  .item-name {
    width: calc(100% - 42px);
    ${styleLineEllipsis(1)}
  }
    
  .item-actions {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .MuiIconButton-root {
    color: ${styleSettingColor.text.secondary};
  }
`;