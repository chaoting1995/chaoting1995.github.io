import React from 'react';
import { css, cx } from '@emotion/css';
import { styleSettingColor } from 'styles/variables.style';
import { EnumTopicMode } from "modules/topic/enums/enumTopicMode";

type Props = {
  className?: string;
  topicMode: EnumTopicMode;
  onChangeTopicMode: (topicMode: EnumTopicMode) => void;
};

const TopicDescription = (props: Props) => {
 

  return <div className={cx('DT-TopicDescription', style, props.className)}>
    <div className='info-name'>辯題模式</div>
    <div onClick={() => props.onChangeTopicMode(EnumTopicMode.Complete)}>{EnumTopicMode.Complete}</div>
    <div onClick={() => props.onChangeTopicMode(EnumTopicMode.Combined)}>{EnumTopicMode.Combined}</div>
  </div>;
};

export default TopicDescription;

const style = css`
  margin-bottom: 16px;
  width: 100%;
  padding: 16px 16px;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: ${styleSettingColor.background.light};
  
  .info-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .info-ring-time {
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
  }
`;