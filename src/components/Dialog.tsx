import React from 'react';
import { css, cx } from '@emotion/css';
import { Dialog, IconButton } from '@mui/material';
import { X } from '@phosphor-icons/react';

import { styleSettingZIndex, breakpoints } from 'styles/variables.style';
import { HandleClose } from 'hooks/useDialog';

type Props = {
  className?: string;
  children?: React.ReactNode;
  hideCloseButton?: boolean;
  open: boolean;
  onClose: HandleClose;
};

const CustomizedDialog = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose} className={cx(style, props.className)}>
      {!props.hideCloseButton && (
        <IconButton className='close-button' title='close' onClick={props.onClose}>
          <X size='small' />
        </IconButton>
      )}
      {props.children}
    </Dialog>
  );
};

export default CustomizedDialog;

const style = css`
  &.MuiDialog-root {
    z-index: ${styleSettingZIndex.popup};
  }

  &.MuiDialog-root .MuiPaper-root {
    /* margin: 16px; */
    max-width: ${breakpoints.sm};
    min-width: 100px;
    border-radius: 20px;
  }

  .close-button {
    position: absolute;
    right: 5px;
    top: 5px;

    border-radius: 999px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    padding: 3px;
  }
`;