import React from 'react'
import { css, cx } from '@emotion/css';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { List, ListItemButton, ListItem, ListItemSecondaryAction, IconButton } from '@mui/material';

import UtilAudio from 'utils/audio';
import { styleLineEllipsis } from 'styles/basic.style';
import { styleSettingColor } from 'styles/variables.style';
import { Topic } from 'modules/topic/resources/topic.type';
import useTopic from 'modules/topic/context/Topic/useTopic';

type Props = {
  className?: string;
  topics: Topic[];
  hideEmptyBox?: true;
  onChangeTopic: (topic: Topic) => void;
}

const TopicList: React.FC<Props> = (props) => {
  const { topicDisabled, onChangeTopicDisabled } = useTopic();

  const handleChangeTopic = React.useCallback((_topic: Topic) => () => {
    props.onChangeTopic(_topic);
    UtilAudio.audioClick();
  },[props]);

  const handleChangeTopicDisabled = React.useCallback((topicID: string, disabled: boolean) =>  () => {
    onChangeTopicDisabled(topicID, disabled)
  }, [onChangeTopicDisabled])

  if (props.topics.length === 0 && !props.hideEmptyBox) {
    return (
      <List disablePadding className={cx('DT-TopicList', style, props.className)}>
        <div className='empty-box'>
          <div>尚無辯題選項</div>
        </div>
      </List>
    )
  }

  return (
    <List disablePadding className={cx('DT-TopicList', style, props.className)}>
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
        </ListItem>
      )}
    </List>
  )
}

export default TopicList;

const style = css`
  .empty-box {
    padding: 8px 16px;
    padding-top: 40px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
  }

  .MuiListItem-root {
    padding-right: 0;
    
    &.topic-pull-off {
      color: ${styleSettingColor.disabled};
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