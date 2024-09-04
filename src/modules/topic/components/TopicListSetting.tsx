import React from 'react'
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';

import { styleSettingColor } from 'styles/variables.style';
import { BottomDrawerHeader, BottomDrawerBody, Button } from 'components';
import { TOPIC_GOOGLE_SHEET_URL } from 'modules/topic/resources/topic.constant';

type Props = {
  className?: string;
  onClose: () => void;
}

const TopicListSetting = (props: Props) => {

  return (
    <div className={cx('DT-TopicListSetting', style, props.className)}>
      <BottomDrawerHeader
        children='進階設定'
        rightSide={
          <IconButton onClick={props.onClose}>
            <XCircle size={28} weight='light' />
          </IconButton>
        }
      />
      <BottomDrawerBody className='drawer-body'>
        <div className='setting-title'>使用模板</div>
        <Button variant='outlined' href={TOPIC_GOOGLE_SHEET_URL}>
          檔案下載
        </Button>
      </BottomDrawerBody>
    </div>
  )
}

export default TopicListSetting;

const style = css`
  .drawer-body {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    box-sizing: border-box;
    
    .setting-title {
      margin-bottom: 10px;
      font-size: 18px;
      color: ${styleSettingColor.background.dark};
    }
    
    .setting-subtitle {
      margin-top: -10px;
      margin-bottom: 10px;
      font-size: 14px;
      color: ${styleSettingColor.text.secondary};
    }
    
    .template-button-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
`;

