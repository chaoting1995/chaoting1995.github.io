
import React from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { Trash, PencilSimple, Plus, DotsSixVertical } from '@phosphor-icons/react';
import { IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction } from '@mui/material';

import ServiceRoute from 'routes/route.service';
import { styleSettingColor } from 'styles/variables.style';
import { styleLineEllipsis } from 'styles/basic.style';
import { DragDrog } from 'components';
import { PAGE_TITLE, PAGE_DESCRIPTION, pageLinks } from 'routes/route.constants';
import usePopup from 'context/Popup/usePopup';
import useDialog from 'hooks/useDialog';
import useTimers from 'modules/timer/context/Timers/useTimers';
import { Timer } from 'modules/timer/resources/timer.type';
import { EMPTY_TIMER } from 'modules/timer/resources/timer.constant';
import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import TimerEditor from 'modules/timer/components/TimerEditor';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import { BottomDrawer, Button } from 'components';

const ITEM_NAME = '計時器';

const Timers: React.FC = () => {
  const popup = usePopup();
  const [open, handleOpen, handleClose] = useDialog(false);
  const timersProvider = useTimers();
  const [selectedTimer, setSelectedTimer] = React.useState<Timer>(EMPTY_TIMER); 

  const trakingTimersItemToTimer = (name: string, mode: EnumTimerMode) => () => {
    const newGaEvent = {
      ...GA_EVENT.Timers_Item_To_Timer,
      label: `${GA_EVENT.Timers_Item_To_Timer.label}_Mode:${mode}_Name:${name}`
    }

    ServiceGA4.event(newGaEvent);
  };

  const handleOpenEditor = React.useCallback((timerID?: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    let _timer: Timer = EMPTY_TIMER;

    if (timerID) {
      _timer = timersProvider.list.find(item => item.id === timerID) || EMPTY_TIMER;
    };
    
    setSelectedTimer(_timer);
    handleOpen();
    
    if (timerID) {
      ServiceGA4.event(GA_EVENT.Timers_Button_Edit_Timer);
    } else {
      ServiceGA4.event(GA_EVENT.Header_Button_Add_Timer);
    }
  }, [handleOpen, timersProvider.list])

  const handleDelete = (timerID: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    
    const isConfirm = await popup.confirm({ 
      title: `確定刪除${ITEM_NAME}?`
    });
  
    if(!isConfirm) return;
    timersProvider.deleteItem(timerID);
    ServiceGA4.event(GA_EVENT.Timers_Button_Delete_Timer);
  }

  const handleDragEnd = (sourceIndex: number, destinationIndex: number) => {
    timersProvider.reorderList(sourceIndex, destinationIndex);
  };

  const handleSave =  React.useCallback((_timer: Timer) => {
    if (!selectedTimer.id) {
      timersProvider.addItem(_timer);
    } else {
      timersProvider.editItem(_timer);
    };

    handleClose();
  }, [timersProvider, selectedTimer, handleClose]);

  return <Layout
    mainClassName={cx('DT-Timers', style)}
    title={PAGE_TITLE.timers}
    homeLink={pageLinks.timer}
    renderButtons={
      <IconButton onClick={handleOpenEditor()}>
        <Plus size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags 
      title={`${PAGE_TITLE.timerWithVersion} | ${PAGE_TITLE.timers}`} 
      description={PAGE_DESCRIPTION.timer} />
    {timersProvider.list.length === 0 && <div className='list-empty-box'>
      <div>尚無{ITEM_NAME}</div>
      <Button variant='outlined' className='add-button' onClick={handleOpenEditor()}>新增{ITEM_NAME}</Button>
    </div>}
    <List disablePadding>
      <DragDrog
        className='list-drag-drog'
        onDragEnd={handleDragEnd}
        list={timersProvider.list}
        renderRow={(item, _, dragHandleProps) => (
          <ListItem key={item.id} disablePadding {...dragHandleProps}>
            <ListItemButton
              component={Link} 
              to={ServiceRoute.toPageLinkWithParams(pageLinks.timerID, { id: item.id })}
              onClick={trakingTimersItemToTimer(item.name, item.mode)}
            >
              <DotsSixVertical size={26} weight='light'/>
              <div className='item-name'>{item.name}</div>
            </ListItemButton>
            <ListItemSecondaryAction className='item-actions'>
              <IconButton onClick={handleOpenEditor(item.id)}>
                <PencilSimple size={26} weight='light'/>
              </IconButton>
              <IconButton onClick={handleDelete(item.id)}>
                <Trash size={26} weight='light' />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      />
    </List>
    {open && <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
      <TimerEditor timer={selectedTimer} onSave={handleSave} />
    </BottomDrawer>}
  </Layout>;
};

export default Timers;

const style = css`
  background-color: ${styleSettingColor.gray};
  color: ${styleSettingColor.text.secondary};
  font-size: 20px;
  
  .list-empty-box {
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

  .list-drag-drog {
    .dd-droppable {
      width: 100%;
  
      .dd-drappable {
        width: 100%;
      }

      .dd-drappable.dragging {
        .MuiListItem-root > .MuiListItemButton-root {
          background-color: ${styleSettingColor.gray};
          border-top: 1px solid ${styleSettingColor.disabled};
        }
      }
    }
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
    width: calc(100% - 42px - 42px);
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