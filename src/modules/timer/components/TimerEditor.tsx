import React from 'react';
import { css, cx } from '@emotion/css';
import { CallBell, Gear, XCircle } from '@phosphor-icons/react';
import {
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  FormControl,
  Select,
  FormHelperText,
  IconButton,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';

import { Timer } from 'modules/timer/resources/timer.type';
import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import { styleSettingColor, styleSettingZIndex } from 'styles/variables.style';
import { Status, STATUS_LOADED, STATUS_ERROR } from 'modules/form/form';
import useFormColumn from 'modules/form/useFormColumn';
import ServiceFormat from 'services/format.service';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';
import useDialog from 'hooks/useDialog';
import { BottomDrawerHeader, BottomDrawerBody } from 'components';
import { TimerEditorSetting } from 'modules/timer';

type ColumRingItemWithStatus = {
  id: string;
  seconds: number | '';
  status: Status;
};

const options: Array<{ value: EnumTimerMode; label: string }> = [
  {
    value: EnumTimerMode.Normal,
    label: '一般辯論',
  },
  {
    value: EnumTimerMode.Crossfire,
    label: '自由辯論',
  },
];

const ringTimesByColumnMode: Record<EnumTimerMode, number> = {
  [EnumTimerMode.Normal]: 3,
  [EnumTimerMode.Crossfire]: 2,
};

type Props = {
  className?: string;
  timer: Timer;
  onSave: (timer: Timer) => void;
};

const createRingItemWithStatus = (item: number | ''): ColumRingItemWithStatus => {
  return {
    id: uuidv4(),
    seconds: item,
    status: STATUS_LOADED,
  };
};

const TimerEditor = (props: Props) => {
  const [openSetting, handleOpenSetting, handleCloseSetting] = useDialog(false);

  const columnName = useFormColumn<string>({
    value: props.timer.name,
    defaultValue: '',
    verifyRules: { require: true },
  });

  const columnMode = useFormColumn<EnumTimerMode | '', typeof EnumTimerMode>({
    value: props.timer.id ? props.timer.mode : '',
    defaultValue: '',
    verifyRules: {
      requireSelect: true,
      enumTypeGuide: EnumTimerMode,
    },
  });

  const DEFAULT_RING_TIMES = 3;
  const [ringTimes, setRingTimes] = React.useState<number>(props.timer.ring.length || DEFAULT_RING_TIMES);
  const [columnRing, setColumnRing] = React.useState<ColumRingItemWithStatus[]>(
    Array(ringTimes).fill('').map((item, index) => {
        const ringItem = props.timer.ring[index] ? props.timer.ring[index] : item;
        return createRingItemWithStatus(ringItem);
      })
  );

  const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    columnName.onChange(event.target.value);
  },[columnName]);

  const handleChangeMode = React.useCallback((event: SelectChangeEvent<EnumTimerMode>) => {
    columnMode.onChange(event.target.value as EnumTimerMode);
  }, [columnMode]);

  const handleChangeRing = React.useCallback((ringID: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnRing((prevState) => {
      const newState: ColumRingItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
      newState.map((item) => {
        if (item.id !== ringID) return item;
        const newSeconds = event.target.value;

        const isPositiveInteger = /^\d+$/.test(newSeconds);
        const isEmptyString = newSeconds === '';
        if (!isPositiveInteger && !isEmptyString) return item;

        item.seconds = newSeconds as number | '';
        return item;
      });
      return newState;
    });
  }, []);

  const handleChangeRingTimes = React.useCallback((times: number) => () => {
    setRingTimes(times);
  }, []);

  const handleOpenSettingWithTraking = React.useCallback(() => {
    handleOpenSetting();
    ServiceGA4.event(GA_EVENT.TimersEditor_Button_Settting);
  }, [handleOpenSetting]);

  const handleUseTemplateTimer = React.useCallback((timer: Timer) => {
    columnName.onChange(timer.name);
    columnMode.onChange(timer.mode);
    setColumnRing(
      Array(ringTimesByColumnMode[timer.mode]).fill('').map((item, index) => {
          const ringItem = timer.ring[index] ? timer.ring[index] : item;
          return createRingItemWithStatus(ringItem);
        })
    );
    setRingTimes(ringTimesByColumnMode[timer.mode]);
    handleCloseSetting();
  }, [columnMode, columnName, handleCloseSetting]);

  const customVarifyRing = React.useCallback((): boolean => {
    const setRrrorStatus = (_id: string, message: string) => {
      setColumnRing((prevState) => {
        const newState: ColumRingItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
        newState.map((element) => {
          if (element.id !== _id) return element;
          element.status = { ...STATUS_ERROR, message };
          return element;
        });
        return newState;
      });
    };

    const removeRrrorStatus = (id: string) => {
      setColumnRing((prevState) => {
        const newState: ColumRingItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
        newState.map((element) => {
          if (element.id !== id) return element;
          element.status = STATUS_LOADED;
          return element;
        });
        return newState;
      });
    };

    let isValid = true;

    for (const item of columnRing) {
      const conditionEmptyString = item.seconds === '';
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
        setRrrorStatus(item.id, '此欄位不可超過 3600 秒');
        isValid = false;
        continue;
      }

      const hasEqualItem = <T,>(array: T[], item: T): boolean => {
        return array.some((arrayItem, index) => arrayItem === item && array.indexOf(item) !== index);
      };
      const conditionHasEqualItem = hasEqualItem<number | ''>(
        columnRing.map((item) => item.seconds),
        item.seconds
      );
      if (conditionHasEqualItem) {
        setRrrorStatus(item.id, '此欄位不可與其他欄位相同');
        isValid = false;
        continue;
      }
      if (isValid) removeRrrorStatus(item.id);
    }

    if (!isValid) return isValid; // 單一欄位未通過驗證時，提前回傳 isValid

    const isSorted = (array: number[]): boolean => {
      return array.every((value, index) => index === 0 || array[index - 1] < value);
    };
    const conditionIsNoSorted = !isSorted(columnRing.map((item) => ServiceFormat.toNumber(item.seconds)));
    if (conditionIsNoSorted) {
      columnRing.forEach((item) => {
        if (conditionIsNoSorted) {
          setRrrorStatus(item.id, '秒數要由小到大排序');
          isValid = false;
        }
      });
    }
    return isValid;
  }, [columnRing]);

  const handleSave = React.useCallback(() => {
    let isValid = true;
    if (!columnName.onVarify()) isValid = false;
    if (!columnMode.onVarify()) isValid = false;
    if (!customVarifyRing()) isValid = false;
    if (!isValid) return;

    // formTimer 物件，轉換成 timer 物件
    const newTimer: Timer = {
      id: props.timer?.id || `debate-timer-${uuidv4()}`,
      name: columnName.value,
      mode: columnMode.value as EnumTimerMode,
      ring: columnRing.map((item) => ServiceFormat.toNumber(item.seconds)),
    };

    props.onSave(newTimer);
    const newGaEvent = {
      ...GA_EVENT.TimersEditor_Button_Submit,
      label: `TimersEditor_Button_Submit${props.timer?.id ? '_Edit' : '_Add'}`,
    };
    ServiceGA4.event(newGaEvent);
  }, [columnMode, columnName, columnRing, customVarifyRing, props]);

  // 依照 ringTimes，決定 columnRing 表單欄位數量
  React.useEffect(() => {
    setColumnRing((prevState) =>
      Array(ringTimes).fill('').map((item, index) => {
          return prevState[index] ? prevState[index] : createRingItemWithStatus(item);
        })
    );
  }, [ringTimes]);

  if (openSetting) {
    return (<div className={cx('DT-TimerEditor', style, props.className)}>
      <BottomDrawerHeader>
        <div>進階設定</div>
        <IconButton className='drawer-title-button' onClick={handleCloseSetting}>
          <XCircle size={28} />
        </IconButton>
      </BottomDrawerHeader>
      <BottomDrawerBody className='drawer-body'>
        <TimerEditorSetting onUseTemplateTimer={handleUseTemplateTimer} />
      </BottomDrawerBody>
    </div>);
  }

  return (
    <div className={cx('DT-TimerEditor', style, props.className)}>
      <BottomDrawerHeader>
        <div>{!props.timer.id ? `新增計時器` : `編輯計時器`}</div>
        <IconButton className='drawer-title-button' onClick={handleOpenSettingWithTraking}>
          <Gear size={28} />
        </IconButton>
      </BottomDrawerHeader>
      <BottomDrawerBody className='drawer-body'>
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
            MenuProps={{ style: { zIndex: styleSettingZIndex.popupMenu } }}
            value={columnMode.value}
            onChange={handleChangeMode}>
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
        {columnRing.map((item, index) => (
          <TextField
            key={item.id}
            variant='standard'
            fullWidth
            margin='normal'
            type='number'
            inputProps={{ inputMode: 'numeric' }}
            placeholder={`第${index + 1}次鈴響(秒)`}
            InputProps={{
              inputProps: {
                min: 0,
                inputMode: 'numeric', // 显示数字键盘
                pattern: '[0-9]*', // 仅允许数字输入
              },
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
        ))}
        <div className='ring-times-button-group'>
          <Button
            variant='outlined'
            color='secondary'
            disabled={ringTimes <= 1}
            onClick={handleChangeRingTimes(ringTimes - 1)}>
            -
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            disabled={ringTimes >= 5}
            onClick={handleChangeRingTimes(ringTimes + 1)}>
            +
          </Button>
        </div>
        <Button variant='outlined' fullWidth className='save-button' onClick={handleSave}>
          儲存
        </Button>
      </BottomDrawerBody>
    </div>
  );
};

export default TimerEditor;

const style = css`
  .MuiDrawer-paper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  .drawer-title-button {
    color: ${styleSettingColor.text.gray};
    position: absolute;
    right: 16px;
  }

  .drawer-body {
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
  }

  .MuiInput-root {
    font-size: 18px;
  }

  .MuiFormHelperText-root {
    position: absolute;
    bottom: -22px;
  }

  .ring-times-button-group {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    .MuiButton-root,
    .MuiButton-root:hover {
      width: 100%;
      font-size: 18px;
    }
  }

  .save-button.MuiButton-root,
  .save-button.MuiButton-root:hover {
    margin-top: 10px;
    font-size: 18px;
    background-color: ${styleSettingColor.background.dark}1a;
  }
`;
