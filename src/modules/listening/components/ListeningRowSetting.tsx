import React from 'react'
import { css, cx } from '@emotion/css';
import { List, ListItemButton, ListItem } from '@mui/material';
import { PaintRoller, ArrowUp, ArrowDown, Copy, Broom, Trash } from '@phosphor-icons/react';
import { v4 as uuidv4 } from 'uuid';

import { BottomDrawerHeader, BottomDrawerBody } from 'components';
import { ListeningRow } from 'modules/listening/resources/listening.type';
import { BG_DARK, BG_DEFAULT, DEFAULT_LISTENING_ROW } from 'modules/listening';

type Props = {
  className?: string;
  index: number;
  listeningRow: ListeningRow;
  onChangeListeningRow: (listeningRow: ListeningRow) => void;
  setColumnRows: React.Dispatch<React.SetStateAction<ListeningRow[]>>;
  onClose: () => void;
  onInsertAbove: () => void;
  onInsertBelow: () => void;
}

const ListeningRowSetting: React.FC<Props> = (props) => {

  const hadleBackgoundColor = (bg: typeof BG_DARK | typeof BG_DEFAULT) => () => {
    props.onChangeListeningRow({ ...props.listeningRow, bg });
    props.onClose();
  }

  const hadleDuplicate = () => {
    props.setColumnRows(prevState => {
      const newState = [...prevState];
      const newItem = { ...prevState[props.index], id: uuidv4() };
      newState.splice(props.index + 1, 0, newItem);
      return newState;
    })
    props.onClose();
  }
  
  const hadleClearContents = () => {
    props.onChangeListeningRow({ ...DEFAULT_LISTENING_ROW, id: props.listeningRow.id });
    props.onClose();
  }
  
  const hadleDelete = () => {
    props.setColumnRows(prevState => {
      const newState = [...prevState];
      newState.splice(props.index, 1);
      return newState;
    })
    props.onClose();
  }

  const bgAction = props.listeningRow.bg === BG_DEFAULT ? {
    icon: <PaintRoller weight='duotone' />,
    label: '深色背景',
    action: hadleBackgoundColor(BG_DARK)
  } : {
    icon: <PaintRoller />,
    label: '預設背景',
    action: hadleBackgoundColor(BG_DEFAULT)
  };

  const actionOptions = [
    bgAction,
    {
      icon: <ArrowUp />,
      label: '向上新增',
      action: props.onInsertAbove
    },
    {
      icon: <ArrowDown />,
      label: '向下新增',
      action: props.onInsertBelow
    },
    {
      icon: <Copy />,
      label: '建立副本',
      action: hadleDuplicate
    },
    {
      icon: <Broom />,
      label: '清除',
      action: hadleClearContents
    },
    {
      icon: <Trash />,
      label: '刪除',
      action: hadleDelete
    },
  ]

  return (
    <div className={cx('DT-ListeningRowSetting', style, props.className)}>
      <BottomDrawerHeader children='單列設定' />
      <BottomDrawerBody>
        <List disablePadding>
          {actionOptions.map((item) => 
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={item.action}>
                {item.icon}
                <div className='item-label'>{item.label}</div>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </BottomDrawerBody>
    </div>
  )
}

export default ListeningRowSetting;

const style = css`
  overflow: hidden;
  border-radius: inherit;
  
  .item-label {
    margin-left: 10px;
  }

  .MuiListItem-root > .MuiListItemButton-root {
    font-size: 16px;
    min-height: 40px;
  }
`;