
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { Trash, PencilSimple, Plus } from '@phosphor-icons/react';
import { IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';
import { styleLineEllipsis } from 'styles/basic.style';
import { pageLinks } from 'routes/constants';
import useTimers from 'context/Timers/useTimers';
import { Timer } from 'resources/timer.type';
import usePopup from 'context/Popup/usePopup';
import useDialog from 'hooks/useDialog';
import { EMPTY_TIMER } from 'resources/timer.constant';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';
import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import Layout from 'layouts/Layout';
import BottomDrawer from 'components/BottomDrawer';
import TimerEditor from 'modules/timer/components/TimerEditor';
import HeadTags from 'components/HeadTags';

const Timers = () => {
  const location = useLocation();
  const popup = usePopup();
  const [open, handleOpen, handleClose] = useDialog(false);
  const { timers, addTimer, editTimer, deleteTimer } = useTimers();
  const [selectedTimer, setSelectedTimer] = React.useState<Timer>(EMPTY_TIMER); 
  
  const handleTrakingTimersItemToTimer = (name: string, mode: EnumTimerMode) => () => {
    const newGaEvent = {
      ...GA_EVENT.DT_Timers_Item_To_Timer,
      label: `${GA_EVENT.DT_Timers_Item_To_Timer.label}_Mode:${mode}_Name:${name}`
    }

    ServiceGA4.event(newGaEvent);
  };

  const handleOpenEditor = React.useCallback((timerID?: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    let _timer: Timer = EMPTY_TIMER;

    if (timerID) {
      _timer = timers.find(item => item.id === timerID) || EMPTY_TIMER;
    };
    
    setSelectedTimer(_timer);
    handleOpen();
    
    if (timerID) {
      ServiceGA4.event(GA_EVENT.DT_Timers_Button_Edit_Timer);
    } else {
      ServiceGA4.event(GA_EVENT.DT_Header_Button_Add_Timer);
    }
  }, [handleOpen, timers])

  const handleSave =  React.useCallback((timer: Timer) => {
    if (!selectedTimer.id) {
      addTimer(timer);
    } else {
      editTimer(timer.id, timer);
    };

    handleClose();
  }, [addTimer, editTimer, selectedTimer, handleClose]);

  const handleDelete = (timerID: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    
    const isConfirm = await popup.confirm({ 
      title: '確定刪除計時器?',
      message: '',
    });
  
    if(!isConfirm) return;
    deleteTimer(timerID)
  }

  return <Layout
    mainClassName={cx('DT-Timers', style)}
    renderButtons={[pageLinks.timers].includes(location.pathname) ? <>
      <IconButton onClick={handleOpenEditor()}>
        <Plus size={28} />
      </IconButton>
    </> : <></>}
  >
    <HeadTags titleWithPrefixBrand='自定計時器' />
    <List disablePadding>
      {timers.map((item) => <ListItem key={item.id} disablePadding>
        <ListItemButton 
          component={Link} 
          to={`${pageLinks.timerID.replace(':id', item.id)}`}
          onClick={handleTrakingTimersItemToTimer(item.name, item.mode)}
        >
          <div className='timer-item-name'>{item.name}</div>
        </ListItemButton>
        <ListItemSecondaryAction className='timer-item-actions'>
          <IconButton onClick={handleOpenEditor(item.id)}>
            <PencilSimple size={28} />
          </IconButton>
          <IconButton onClick={handleDelete(item.id)}>
            <Trash size={28} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>)}
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
  font-size: 22px;
  
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

  .timer-item {
    padding: 0px 16px;
    box-sizing: border-box;

    &-name {
      ${styleLineEllipsis(1)}
    }
    
    &-actions {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .MuiIconButton-root {
    color: ${styleSettingColor.text.secondary};
  }
`;