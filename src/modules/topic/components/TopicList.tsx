import React from 'react'
import { css, cx } from '@emotion/css';
// import { Eye } from '@phosphor-icons/react';
import { List, ListItemButton, ListItem, ListItemSecondaryAction } from '@mui/material';

import useInnerHeight from 'hooks/useInnerHeight';
import { styleLineEllipsis } from 'styles/basic.style';
import { styleSettingColor } from 'styles/variables.style';
import { Topic } from 'modules/topic/resources/topic.type';

type Props = {
  className?: string;
  children?: React.ReactNode;
  topics: Topic[];
}

const TopicList: React.FC<Props> = (props) => {
  const [innerHeight] = useInnerHeight();

  return (
    <div className={cx('DT-TopicList', style(innerHeight), props.className)}>
      <div className='drawer-header'>
        <div className='drawer-title'>辯題列表</div>
      </div>
      <div className='drawer-body'>
      {props.topics.length === 0 && <div className='empty-box'>
        <div>尚無計時器</div>
      </div>}
       <List disablePadding>
        {props.topics.map((item) => 
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={()=> {}}>
              <div className='item-name'>{item.name}</div>
              <ListItemSecondaryAction className='item-actions'>
                {/* <IconButton onClick={() => {}}>
                  <Eye size={26} weight='light'/>
                  <EyeSlash size={26} weight='light' />
                </IconButton> */}
              </ListItemSecondaryAction>
            </ListItemButton>
        </ListItem>)}
      </List>
    </div>
    </div>
  )
}

export default TopicList;

const style = (_innerHeight: number) => css`
  width: 100%;
  color: ${styleSettingColor.text.secondary};
  font-size: 18px;
  overflow: hidden;
  border-radius: inherit;
  
  .MuiDrawer-paper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  .drawer-header,
  .drawer-body {
    width: 100%;
  }

  .drawer-header {
    padding: 16px;
    
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid ${styleSettingColor.background.light};

    .drawer-title {
      color: ${styleSettingColor.background.dark};
      font-size: 22px;
      margin: 0 auto;
    }
  }

  .drawer-body {
    max-height: calc(${_innerHeight}px * 0.9 - 32px - 32px);
    overflow-y: auto;
    padding-bottom: 32px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 5px;

    .MuiInput-root {
      font-size: 18px;
    }

    .MuiFormHelperText-root {
      position: absolute;
      bottom: -22px;
    }
  }

  .empty-box {
    padding: 8px 16px;
    padding-top: 40px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;

    .add-button {
      margin-top: 10px;
      font-size: 18px;
    }
  }

  a {
    color: ${styleSettingColor.text.secondary};
  }

  .MuiListItem-root {
    padding-right: 0;
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