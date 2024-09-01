import React from 'react';
import { css, cx } from '@emotion/css';
import { MenuItem, TextField } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';
import { EnumTopicMode } from "modules/topic/enums/enumTopicMode";

type TopicModeOption = {
  value: EnumTopicMode;
  label: string;
};

const options: TopicModeOption[] = [
  {
    value: EnumTopicMode.Complete,
    label: '完整辯題',
  },
  {
    value: EnumTopicMode.Combined,
    label: '組合辯題',
  }
]

type Props = {
  className?: string;
  topicMode: EnumTopicMode;
  onChangeTopicMode: (topicMode: EnumTopicMode) => void;
};

const TopicDescription = (props: Props) => {

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    props.onChangeTopicMode(event.target.value as EnumTopicMode);
  };

  return <div className={cx('DT-TopicDescription', style, props.className)}>
    <div className='label-topic-mode'>辯題模式：</div>
    <TextField
      select
      value={props.topicMode}
      onChange={handleChange}
      variant="standard"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </div>;
};

export default TopicDescription;

const style = css`
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: ${styleSettingColor.background.light};
  display: flex;
  justify-content: flex-start;

  .label-topic-mode,
  .MuiInput-root {
    font-size: 20px;
    color: ${styleSettingColor.text.primary};
  }
  
  .label-topic-mode {
    padding: 4px 0 5px;
    box-sizing: border-box;
  }

  .MuiSvgIcon-root {
    color: ${styleSettingColor.text.primary};
  }
  
  .MuiInput-root::before {
    content: unset;
  }

  .MuiInput-root:hover:not(.Mui-disabled, .Mui-error)::before {
    border-bottom: 2px solid ${styleSettingColor.text.primary};
  }

`;