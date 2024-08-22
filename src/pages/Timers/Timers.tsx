import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { Trash, PencilSimple, Plus } from '@phosphor-icons/react';
import { IconButton, List, ListItem, ListItemButton } from '@mui/material';

import Layout from 'layouts/Layout';
import { styleSettingColor } from 'styles/variables.style';
import { styleLineEllipsis } from "styles/basic.style";
import { pageLinks } from 'routes/constants';
import { useTimers } from "provider/Timers/TimersProvider";
import { EnumTimerMode } from "enums/enumTimerMode";
import { Timer } from "resources/timer.type";

const Timers = () => {
  const location = useLocation();
  const { timers, addTimer, editTimer, deleteTimer } = useTimers();

  const newTimer: Timer = {
    id: 'new-id',
    mode: EnumTimerMode.Normal,
    name: 'New Timer',
    ring: [1, 2, 3],
  };

  return <Layout 
    mainClassName={cx('DT-Timers', style())}
    renderButton={[pageLinks.timers].includes(location.pathname) ? <>
      <IconButton className='header-to-timers' onClick={() => addTimer(newTimer)}>
        <Plus size={28} />
      </IconButton>
    </> : <></>}
    >
      <List disablePadding>
        {timers.map((item) => <ListItem
          key={item.id}
          disablePadding
          component={Link} 
          to={`${pageLinks.timerID.replace(":id", item.id)}`}
          secondaryAction={
            <div className="timer-item-actions">
            <IconButton onClick={() => editTimer(item.id, newTimer)}>
              <PencilSimple size={28} />
            </IconButton>
            <IconButton onClick={() => deleteTimer(item.id)}>
              <Trash size={28} />
            </IconButton>
          </div>
          }
        >
        <ListItemButton>
          <div className="timer-item-name">{item.name}</div>
        </ListItemButton>
      </ListItem>)}
     </List>
  </Layout>;
};

export default Timers;

const style = () => css`
  background-color: ${styleSettingColor.gray};
  color: ${styleSettingColor.text.secondary};
  font-size: 22px;
  
  a {
    color: ${styleSettingColor.text.secondary};
  }

  .MuiListItemButton-root {
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