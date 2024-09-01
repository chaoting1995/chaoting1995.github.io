import React from 'react';

import usePopup from 'context/Popup/usePopup';
import { css, cx } from '@emotion/css';
import { Button } from '@mui/material';
import { WifiSlash } from '@phosphor-icons/react';

// import ImgError from 'assets/img-error.svg?react';
import { styleSettingZIndex } from 'styles/variables.style';
import basicStyle from 'styles/basic.style';

const offlineTitle = '無網路連線';
const onlineTitle = '網路連線成功!';
const OfflineHandle = () => {
  const popup = usePopup();

  const [isOffLine, setIsOffLine] = React.useState(false);

  const eventHandler = React.useCallback(
    (event: Event) => {
      const severity = event.type === 'offline' ? 'error' : 'success';
      const message = severity === 'error' ? offlineTitle : onlineTitle;

      popup.notice(({ message, severity }));

      if (event.type !== 'offline') {
        setIsOffLine(event.type === 'offline');
        return;
      }

      setTimeout(() => {
        setIsOffLine(event.type === 'offline');
      }, 1500);
    },
    [popup]
  );

  const handleRetry = () => window.location.reload();

  React.useEffect(() => {
    setIsOffLine(!navigator.onLine);

    window.addEventListener('offline', eventHandler);
    window.addEventListener('online', eventHandler);
    return () => {
      window.removeEventListener('offline', eventHandler);
      window.removeEventListener('online', eventHandler);
    };
  }, [eventHandler]);

  if (!isOffLine) return <></>;

  return (
    <div className={cx('OfflineHandle', style)}>
      {/* <div className='img-box'>
        <ImgError />
      </div> */}
      <WifiSlash size={40} />
      <div className='message-error'>{offlineTitle}</div>
      <br/>
      <Button variant='outlined' onClick={handleRetry} >重試</Button>
    </div>
  );
};

export default OfflineHandle;

const style = css`
  ${basicStyle}

  width: 100vw;
  position: fixed;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  transform: translateX(-50%);
  background-color: #ffffffbd;
  z-index: ${styleSettingZIndex.offlineHandle};
  transition: position 2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 20px;
  font-weight: 700;
  color: #888888;

  .MuiSvgIcon-root {
    margin-right: 15px;
    font-size: 40px;
  }
  
  .message-error {
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .img-box {
    width: 200px;
    height: 200px;

    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      -webkit-filter: grayscale(75%);
      filter: grayscale(75%);
    }
  }
`;
