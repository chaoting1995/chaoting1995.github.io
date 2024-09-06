import React from 'react'
import { css, cx } from '@emotion/css';
import { TextField, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { styleSettingColor } from 'styles/variables.style';
import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';
import { ListeningArgumentStatus, argumentStatusWording } from 'modules/listening';

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
  column1: string; 
  column2: EnumArgumentStatus;
  bg?: string;
  onChangeColumn1: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColumn2: (event: SelectChangeEvent<EnumArgumentStatus>) => void;
}

const ListeningRow: React.FC<Prpos> = (props) => {
  
  return <div style={{ backgroundColor: props.bg || 'unset' }} className={cx('DT-ListeningRow', style, props.className)}>
    <TextField
      multiline
      className='column column-1'
      value={props.column1} 
      onChange={props.onChangeColumn1}
    />
    <Select
      className='column column-2'
      value={props.column2}
      onChange={props.onChangeColumn2}
    >
      {options.map((option) =>
        <MenuItem key={option.value} value={option.value}>
          <ListeningArgumentStatus className='status-tag' status={option.value}>
            {option.label}
          </ListeningArgumentStatus>
        </MenuItem>
      )}
    </Select>
  </div>;
}

export default ListeningRow;

export const style = css`
  display: flex;
  
  .column.column-head {
    font-size: 16px;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .column {
    min-height: 45px;
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
      width: 130px;
      flex-shrink: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    
    &.MuiInputBase-root,
    .MuiInputBase-root {
      font-size: 16px;
      padding: 10px;
      box-sizing: border-box;
      align-items: flex-start;

      fieldset {
        border-width: 0;
      }
      
      &.Mui-focused {
        z-index: 1;
        border-radius: 0;
        outline: 2px solid ${styleSettingColor.background.dark};
      }

      .MuiInputBase-input {
        padding: 0;
      }
    }

    &.MuiInputBase-root .status-tag {
      width: 100%;
    }

    &.MuiInputBase-root .MuiSvgIcon-root {
      top: .7rem;
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
