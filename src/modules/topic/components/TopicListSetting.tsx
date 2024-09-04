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
      <BottomDrawerBody center paddingTop paddingHorizental>
        <Button variant='outlined' className='download-button' href={TOPIC_GOOGLE_SHEET_URL}>
          檔案下載
        </Button>
      </BottomDrawerBody>
    </div>
  )
}

export default TopicListSetting;

const style = css`    
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
  
  .download-button.MuiButton-root {
    width: fit-content;
    color: ${styleSettingColor.background.dark};
  }

  .template-button-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

