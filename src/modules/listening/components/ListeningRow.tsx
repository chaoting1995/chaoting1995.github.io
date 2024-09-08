import React from 'react'
import { css, cx } from '@emotion/css';
import { Input, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { DotsSixVertical } from '@phosphor-icons/react';

import { BottomDrawer } from 'components';
import useDialog from 'hooks/useDialog';
import { styleSettingColor } from 'styles/variables.style';
import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';
import { ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
import { 
  ListeningRowStatus, 
  ListeningRowSetting,
  argumentStatusWording,
 } from 'modules/listening';

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
  const [focusRowSelector, setFocusRowSelector] = React.useState<boolean>(false);

  const handleFocusRowSelector = React.useCallback((eventKey: 'focus' | 'blur') => () => {
    if(eventKey === 'focus') setFocusRowSelector(true);
    if(eventKey === 'blur') setFocusRowSelector(false);
  }, []);

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
    style={{ backgroundColor: props.listeningRow.bg || 'unset' }} 
    className={cx('DT-ListeningRow', style, props.className, {'focus-row-selector': focusRowSelector})}
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
        <MenuItem key={option.value} value={option.value}>
          <ListeningRowStatus className='status-tag' status={option.value}>
            {option.label}
          </ListeningRowStatus>
        </MenuItem>
      )}
    </Select>
    <div className='row-selector' onClick={handleOpenSetting} {...props.dragHandleProps}>
      <DotsSixVertical size={16} weight='bold' />
      <input
        id={`row-selector-input-${props.listeningRow.id}`}
        onFocus={handleFocusRowSelector('focus')}
        onBlur={handleFocusRowSelector('blur')}
      />
    </div>
    {<BottomDrawer open={openSetting} onOpen={handleOpenSetting} onClose={handleCloseSetting}>
      <ListeningRowSetting 
        index={props.index}
        listeningRow={props.listeningRow}
        onChangeListeningRow={props.onChangeListeningRow}
        setColumnRows={props.setColumnRows}
        onClose={handleCloseSetting}
        />
    </BottomDrawer>}
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

  &:focus-within {
    .row-selector {
      opacity: 1;
      pointer-events: visible;
    }
  }

  &.focus-row-selector {    
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

  .row-selector {
    opacity: 0;
    pointer-events: none;
    width: 16px;
    height: 24px;
    padding: 4px 2px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #FFFFFF;
    outline: 1px solid ${styleSettingColor.disabled};
    transition: opacity 150ms;
    color: ${styleSettingColor.text.gray};
    cursor: pointer;

    position: absolute;
    left: -9px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    
    display: flex;
    justify-content: center;
    align-items: center;

    &.row-selector:focus-within,
    &.show.row-selector {
      opacity: 1;
      pointer-events: visible;
    }

    &.row-selector:focus-within {
      background-color: ${styleSettingColor.background.default};
      color: #FFFFFF;
    }
    
    input {
      cursor: pointer;
      /* user-select: none;  */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      padding: 0;
      border: 0;
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
