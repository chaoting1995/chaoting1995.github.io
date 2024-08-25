import React from 'react';
import { css, cx } from '@emotion/css';
import { CallBell } from '@phosphor-icons/react';
import { TextField, MenuItem, InputAdornment, Button, FormControl, Select, FormHelperText } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { v4 as uuidv4 } from 'uuid';
import { Timer } from 'resources/timer.type';
import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import { breakpoints, styleSettingColor, styleSettingZIndex } from 'styles/variables.style';
import { Status, STATUS_LOADED, STATUS_ERROR } from 'modules/form/form';
import useFormColumn from 'modules/form/useFormColumn';
import ServiceFormat from "services/format.service";
// import useDialog from 'hooks/useDialog';
// import BottomDrawer from 'components/BottomDrawer';

type ColumRingItemWithStatus = {
  id: string;
  seconds: number | '';  
  status: Status;  
}

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

type Props = {
  className?: string;
  timer: Timer;
  onSave: (timer: Timer) => void;
};

const createRingItemWithStatus = (item: number | ''): ColumRingItemWithStatus => { 
  return {
    id: uuidv4(), 
    seconds: item,
    status: STATUS_LOADED
  }
}

const TimerEditor = (props: Props) => {
  // const [open, handleOpen, handleClose] = useDialog(false);

  const columnName = useFormColumn<string>({ 
    value: props.timer.name, 
    defaultValue: '',
    verifyRules: { require: true }
  });

  const columnMode = useFormColumn<EnumTimerMode | '', typeof EnumTimerMode>({ 
    value: props.timer.id ? props.timer.mode : '', 
    defaultValue: '',
    verifyRules: { 
      requireSelect: true, 
      enumTypeGuide: EnumTimerMode
    }
  });

 const DEFAULT_RING_TIMES = 3;
  const [ringTimes, setRingTimes] = React.useState<number>(props.timer.ring.length || DEFAULT_RING_TIMES);
  const [columnRing, setColumnRing] = React.useState<ColumRingItemWithStatus[]>(
    Array(ringTimes).fill('').map((item, index) => {
      return createRingItemWithStatus(
        props.timer.ring[index] ? props.timer.ring[index]: item
      )
    })
  );
  
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    columnName.onChange(event.target.value);
  };

  const handleChangeMode = (event: SelectChangeEvent<EnumTimerMode>) => {
    // if(!IsEnumTimerMode(event.target.value as EnumTimerMode)) return;
    columnMode.onChange(event.target.value as EnumTimerMode);
  };

  const handleChangeRing = (ringID: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnRing(prevState => {
      const newState: ColumRingItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
      newState.map(item => {
        if (item.id !== ringID) return item;
        const newSeconds = event.target.value;

        const isPositiveInteger = /^\d+$/.test(newSeconds);
        const isEmptyString = newSeconds === "";
        if (!isPositiveInteger && !isEmptyString) return item;

        item.seconds = newSeconds as number | '';
        return item;
      })
      return newState;
    })
  };

  const customVarifyRing = React.useCallback((): boolean => {
    const setRrrorStatus = (_id: string, message: string) => {
      setColumnRing(prevState => {
        const newState: ColumRingItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
        newState.map(element => {
          if (element.id !== _id) return element;
          element.status = {...STATUS_ERROR, message };
          return element;
        })
        return newState
      });
    }

    const removeRrrorStatus = (id: string) => {
      setColumnRing(prevState => {
        const newState: ColumRingItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
        newState.map(element => {
          if (element.id !== id) return element;
          element.status = STATUS_LOADED;
          return element;
        })
        return newState
      });
    }

    let isValid = true;
    const isSorted = (array: number[]): boolean => {
      return array.every((value, index) => index === 0 || array[index - 1] < value);
    };
    const conditionIsNoSorted = !isSorted(columnRing.map(item => ServiceFormat.toNumber(item.seconds)))
    if (conditionIsNoSorted) {
      columnRing.forEach(item => {
        if (conditionIsNoSorted) {
          setRrrorStatus(item.id, '秒數要由小到大排序');
          isValid = false;
        }
      })
    }

    for (const item of columnRing) {
      const conditionEmptyString = item.seconds === "";
      if (conditionEmptyString) { 
        setRrrorStatus(item.id, '此欄位必填');
        isValid = false; 
        continue; 
      }

      const conditionISZero = item.seconds === 0;
      if (conditionISZero) { 
        setRrrorStatus(item.id, '此欄位不可為 0');
        isValid = false;
        continue; 
      }

      const conditionMoreThan3600s = ServiceFormat.toNumber(item.seconds) > 3600;
      if (conditionMoreThan3600s) { 
        setRrrorStatus(item.id, '此欄位不可超過 3600 秒')
        isValid = false; 
        continue; 
      }

      const hasEqualItem = <T,>(array: T[], item: T): boolean => {
        return array.some((arrayItem, index) => arrayItem === item && array.indexOf(item) !== index);
      };
      const conditionHasEqualItem = hasEqualItem<number | ''>(columnRing.map(item => item.seconds), item.seconds)
      if (conditionHasEqualItem) { 
        setRrrorStatus(item.id, '此欄位不可與其他欄位相同')
        isValid = false; 
        continue; 
      }
      if (isValid) removeRrrorStatus(item.id);
    }
    
    return isValid;
  },[columnRing])

  const handleSave = () => {
    let isValid = true;
    if (!columnName.onVarify()) isValid = false;
    if (!columnMode.onVarify()) isValid = false;
    if (!customVarifyRing()) isValid = false;
    if (!isValid) return;

    // formTimer 物件，轉換乘 timer 物件
    const newTimer: Timer = {
      id: props.timer?.id || `debate-timer-${uuidv4()}`,
      name: columnName.value,
      mode: columnMode.value as EnumTimerMode,
      ring: columnRing.map(item => ServiceFormat.toNumber(item.seconds))
    }

    props.onSave(newTimer);
  }

  React.useEffect(() => {
    if (columnMode.value === EnumTimerMode.Crossfire) {
      setRingTimes(2);
      setColumnRing(prevState => {
        return Array(2).fill('').map((item, index) => {
          return prevState[index] ? prevState[index] : createRingItemWithStatus(item)
        })
      })
    };
    
    if (columnMode.value === EnumTimerMode.Normal) {
      setRingTimes(3);
      setColumnRing(prevState => {
        return Array(3).fill('').map((item, index) => {
          return prevState[index] ? prevState[index] : createRingItemWithStatus(item)
        })
      })
    };
  }, [columnMode.value, props.timer.ring])

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
        value={columnName.value}
        onChange={handleChangeName}
        error={columnName.status.hasError}
        helperText={columnName.status.message}
      />
      <FormControl variant='standard' fullWidth error={columnMode.status.hasError}>
        <Select
          displayEmpty
          MenuProps={{
            style: { zIndex: styleSettingZIndex.popupMenu }
          }}
          value={columnMode.value}
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
        {columnMode.status.hasError && <FormHelperText>{columnMode.status.message}</FormHelperText>}
      </FormControl>
      {columnRing.map((item, index) => <React.Fragment key={item.id}>
        <TextField
          variant='standard'
          fullWidth
          margin='normal'
          type='number'
          inputProps={{ inputMode: 'numeric' }}
          placeholder={`第${index + 1}次鈴響(秒)`}
          InputProps={{
            inputProps: { min: 0 },
            startAdornment: (
              <InputAdornment position='start'>
                <CallBell size={22} />
              </InputAdornment>
            ),
          }}
          value={item.seconds}
          onChange={handleChangeRing(item.id)}
          error={columnRing[index].status.hasError}
          helperText={columnRing[index].status.message}
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
    gap: 5px;
    
    .MuiPopover-root.MuiMenu-root.MuiModal-root {
      z-index: ${styleSettingZIndex.popupMenu};
    }
    
    .MuiInput-root {
      font-size: 22px;
    }

    .MuiFormHelperText-root {
      position: absolute;
      bottom: -22px;
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
    margin-top: 10px;
    font-size: 20px;
    border: 1px solid ${styleSettingColor.background.dark};
    color: ${styleSettingColor.background.dark};
    background-color: ${styleSettingColor.background.dark}1a;
  }
`;
