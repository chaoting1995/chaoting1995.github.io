import React from 'react'
import { css, cx } from '@emotion/css';
import { Input, Select, MenuItem, IconButton } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { DotsSixVertical } from '@phosphor-icons/react';

import { BottomDrawer } from 'components';
import useDialog from 'hooks/useDialog';
import { styleSettingColor } from 'styles/variables.style';
import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';
import { ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
import { ListeningRowStatus, ListeningRowSetting, argumentStatusWording } from 'modules/listening';
import useDragClick from 'modules/listening/hooks/useDragClick';

type Option = { 
  value: EnumArgumentStatus; 
  label: string;
};

const options: Array<Option> = Object.keys(EnumArgumentStatus).map(item => {
  return {
    value: item as EnumArgumentStatus,
    label: argumentStatusWording[item as EnumArgumentStatus],
  }
});

type Prpos = {
  className?: string;
  index: number;
  listeningRow: TypeListeningRow;
  onChangeListeningRow: (listeningRow: TypeListeningRow) => void;
  setColumnRows: React.Dispatch<React.SetStateAction<TypeListeningRow[]>>;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

const ListeningRow: React.FC<Prpos> = (props) => {
  const [openSetting, handleOpenSetting, handleCloseSetting] = useDialog(false);
  const dragClick = useDragClick(handleOpenSetting);

  const handeChangeRowColumn1 = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newListeningRow: TypeListeningRow = {
      ...props.listeningRow,
      column1: event.target.value,
    }
    props.onChangeListeningRow(newListeningRow)
  },[props]);

  const handeChangeRowColumn2 = React.useCallback((event: SelectChangeEvent<EnumArgumentStatus>) => {
    const newListeningRow: TypeListeningRow = {
      ...props.listeningRow,
      column2: event.target.value as EnumArgumentStatus,
    }
    props.onChangeListeningRow(newListeningRow)
  },[props]);

  return <div 
    style={{ backgroundColor: props.listeningRow.bg }} 
    className={cx('DT-ListeningRow', style, props.className)}
  >
    <Input
      multiline
      id={`listening-row-column-title-${props.listeningRow.id}`}
      className='column column-1'
      value={props.listeningRow.column1} 
      onChange={handeChangeRowColumn1}
    />
    <Select
      className='column column-2'
      name={`listening-row-column-status-${props.listeningRow.id}`}
      value={props.listeningRow.column2}
      onChange={handeChangeRowColumn2}
    >
      {options.map((option) =>
        <MenuItem key={option.value} value={option.value} sx={{ minHeight: 'unset' }}>
          <ListeningRowStatus className='status-tag' status={option.value}>
            {option.label}
          </ListeningRowStatus>
        </MenuItem>
      )}
    </Select>
    <IconButton className='row-setting-button' onClick={handleOpenSetting}>
      設定
    </IconButton>
    <div 
      className='row-selector' 
      {...props.dragHandleProps}
      onMouseDown={dragClick.onMouseDown}
      onMouseUp={dragClick.onMouseUp}
      onTouchStart={dragClick.onTouchStart}
      onTouchEnd={dragClick.onTouchEnd}  
    >
      <DotsSixVertical size={16} weight='bold' />
    </div>
    <BottomDrawer open={openSetting} onOpen={handleOpenSetting} onClose={handleCloseSetting}>
      <ListeningRowSetting 
        index={props.index}
        listeningRow={props.listeningRow}
        onChangeListeningRow={props.onChangeListeningRow}
        setColumnRows={props.setColumnRows}
        onClose={handleCloseSetting}
      />
    </BottomDrawer>
  </div>;
}

export default ListeningRow;

export const style = css`
  width: 100%;
  display: flex;
  position: relative;
  gap: 1px;

  .column.column-head {
    font-size: 16px;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  &:not(:has(.Mui-focused)):focus-within {
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      outline: 1px solid ${styleSettingColor.background.dark};
      z-index: 1;
    }
  }

  // row 表單未聚焦時，.row-selector 隱藏
  .row-setting-button,
  .row-selector {
    opacity: 0;
    pointer-events: none;
  }

  // row 表單被聚焦時，.row-selector, .row-setting-button 出現
  &:focus-within .row-setting-button,
  &:focus-within .row-selector {
    opacity: 1;
    pointer-events: auto;
  }

  // row-selector 未點擊時，白色
  .row-selector {
    background-color: #FFFFFF;
    color: ${styleSettingColor.text.gray};

    // row-selector 被點擊時，藍色
    &:active {
      background-color: ${styleSettingColor.background.default};
      color: #FFFFFF;
    }
  }

  .row-setting-button,
  .row-setting-button:hover {
    padding: 3px 10px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity 150ms;
    font-size: 14px;
    white-space: nowrap;
    outline: 1px solid ${styleSettingColor.disabled};
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;

    position: absolute;
    right: 5px;
    top: -35px;
    /* z-index: 1;  */
  }

  .row-selector {
    width: 16px;
    height: 24px;
    padding: 4px 2px;
    box-sizing: border-box;
    border-radius: 5px;
    outline: 1px solid ${styleSettingColor.disabled};
    transition: opacity 150ms;
    cursor: pointer;

    position: absolute;
    left: -9px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    
    display: flex;
    justify-content: center;
    align-items: center;

    .drag-handle {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .column {
    min-height: 35px;
    height: 100%;
    box-sizing: border-box;
    outline: 1px solid ${styleSettingColor.disabled};
    border-radius: 0;
    vertical-align: middle;
    
    &.column-1 {
      width: 100%;
    }
    
    &.column-2 {
      white-space: nowrap;
      min-width: 130px;
      flex-shrink: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    
    &.MuiInputBase-root {
      font-size: 16px;
      padding: 5px 10px;
      box-sizing: border-box;

      &:after {
        border-bottom: unset;
      }

      &:hover:before,
      &:before {
        border-bottom: unset;
      }

      fieldset {
        border-width: 0;
      }
      
      &.Mui-focused {
        z-index: 1;
        border-radius: 0;
        outline: 1px solid ${styleSettingColor.background.dark};
      }

      .MuiInputBase-input {
        padding: 0;
      }
    }

    &.column-2.MuiInputBase-root {
      align-items: flex-start;
    }

    &.MuiInputBase-root .status-tag {
      width: 100%;
    }

    &.MuiInputBase-root .MuiSvgIcon-root {
      top: 5px;
      right: 10px;
    }

    &.column-2 {
      height: auto;
      
      .status-tag.${EnumArgumentStatus.Unselected} {
        display: none;
      }
    }
  }
`;
