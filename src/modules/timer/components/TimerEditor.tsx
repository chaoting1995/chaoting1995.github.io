import React from 'react';
import { css, cx } from '@emotion/css';
import { CallBell } from '@phosphor-icons/react';
import { TextField, MenuItem, InputAdornment, Button, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { Timer } from 'resources/timer.type';
import { EnumTimerMode, IsEnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import { breakpoints, styleSettingColor, styleSettingZIndex } from 'styles/variables.style';
// import useDialog from 'hooks/useDialog';
// import BottomDrawer from 'components/BottomDrawer';

type Props = {
  className?: string;
  timer: Timer | null | undefined
  onSave: (timer: Timer) => void;
};

const options: Array<{ value: EnumTimerMode, label: string; }> = [
  {
    value: EnumTimerMode.Normal,
    label: '一般辯論',
  },
  {
    value: EnumTimerMode.Crossfire,
    label: '自由辯論'
  }
];

type FormTimer = {
  name: string;
  mode: '' | EnumTimerMode;
  ring: number[];
}

const DEFAULT_FORM_TIMER: FormTimer = {
  name: '',
  mode: '',
  ring: []
};

const TimerEditor = (props: Props) => {
  const id = React.useId();
  // const [open, handleOpen, handleClose] = useDialog(false);

  const [formTimer, setFormTimer] = React.useState<FormTimer>(DEFAULT_FORM_TIMER);
  const [ringTimes] = React.useState<number>(formTimer.ring.length || 3);
  
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTimer(prevState => ({...prevState, name: event.target.value }))
  };

  const handleChangeMode = (event: SelectChangeEvent<EnumTimerMode>) => {
    if(!event.target.value) return;
    if(!IsEnumTimerMode(event.target.value as EnumTimerMode)) return;
    setFormTimer(prevState => ({ ...prevState, mode: (event.target.value as EnumTimerMode)}))
  };

  const handleChangeRing = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {    
    setFormTimer(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.ring[index] = event.target.value as EnumTimerMode;
      return newState;
    })
  };

  const handleSave = () => {
    // valid
    if (!formTimer.name) {
      //
      return;
    }

    if (!IsEnumTimerMode(formTimer.mode as EnumTimerMode)) {
      //
      return;
    }

    if (formTimer.ring.length === 0) {
      //
      return;
    }

    // formTimer 物件，轉換乘 timer 物件
    const newTimer: Timer = {
      id: props.timer?.id || id,
      name: formTimer.name,
      mode: formTimer.mode as EnumTimerMode,
      ring: formTimer.ring
    }

    props.onSave(newTimer);
  }
  
  // 結束時，重置
  React.useEffect(() => {
    return () => {
      setFormTimer(DEFAULT_FORM_TIMER)
    }
  }, [])

  // timer 物件，轉換成 formTimer 物件
  React.useEffect(() => {
    if (!props.timer) return;

    setFormTimer({
      name: props.timer.name,
      mode: props.timer.mode,
      ring: props.timer.ring
    });
  }, [props.timer])

  return <div className={cx('DT-TimerEditor', style)}>
    <div className='drawer-header'>
      <div className='drawer-title'>{!props.timer ? `新增計時器` : `編輯計時器`}</div>
      {/* <IconButton>
        <Gear size={28} className='icon-gear'/>
      </IconButton>
      <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
        <div className='ring-times-button-group'>
        <Button variant='outlined' className='ring-times-button' onClick={handleSave}>
          -
        </Button>
        <Button variant='outlined' className='ring-times-button' onClick={handleSave}>
          +
        </Button>
      </div>
      </BottomDrawer> */}
    </div>
    <form className='drawer-body'>
      <TextField 
        variant='standard' 
        fullWidth  
        margin='normal' 
        placeholder='計時器名稱' 
        value={formTimer.name}
        onChange={handleChangeName}
      />
      <FormControl variant='standard' fullWidth>
        <Select
          displayEmpty
          MenuProps={{
            style: { zIndex: styleSettingZIndex.popupMenu }
          }}
          value={formTimer.mode}
          onChange={handleChangeMode}
        >
          <MenuItem value='' disabled sx={{ display: 'none' }}>
            <em>選擇計時器模式</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {Array(ringTimes).fill('')
        .map((item, index) => item = formTimer.ring[index])
        .map((item, index) => <React.Fragment key={index}>
        <TextField
          variant='standard' 
          fullWidth
          margin='normal'
          type='number'
          placeholder={`第${index + 1}次鈴響(秒)`} 
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CallBell size={22} />
              </InputAdornment>
            ),
          }}
          value={item}
          onChange={handleChangeRing(index)}
        />
      </React.Fragment>)}
      <Button variant='outlined' fullWidth className='save-button' onClick={handleSave}>
        儲存
      </Button>
    </form>
  </div>;
};

export default TimerEditor;

const style = css`
  .MuiDrawer-paper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
  }

  .drawer-header,
  .drawer-body {
    width: 100%;
    padding: 0 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
    
    @media(min-width: ${breakpoints.sm}) {
      padding: 0 32px;
      padding-bottom: 16px;
    }
  }

  .drawer-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid  ${styleSettingColor.background.light}; 
    
    .drawer-title {
      color: ${styleSettingColor.background.dark};
      font-size: 24px;
      margin: 0 auto; 
    }

    .icon-gear {
      color: ${styleSettingColor.text.gray};
    }
  }

  .drawer-body {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .MuiPopover-root.MuiMenu-root.MuiModal-root {
      z-index: ${styleSettingZIndex.popupMenu};
    }
    
    .MuiInput-root {
      font-size: 22px;
    }
  }

  .ring-times-button-group {
    display: flex;
    justify-content: center;
    gap: 16px;

    .ring-times-button.MuiButton-root,
    .ring-times-button.MuiButton-root:hover {
      width: 100%;
      font-size: 18px;
      border: 1px solid ${styleSettingColor.background.dark};
      color: ${styleSettingColor.background.dark};
    }
  }

  .save-button.MuiButton-root,
  .save-button.MuiButton-root:hover {
    font-size: 20px;
    border: 1px solid ${styleSettingColor.background.dark};
    color: ${styleSettingColor.background.dark};
    background-color: ${styleSettingColor.background.dark}1a;
  }
`;
