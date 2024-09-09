import React from 'react';

// 在同一個按鈕上，區分是觸發「點擊」或「拖曳」事件，callback註冊於「點擊」事件
const useDragClick = (callback: () => void, threshold = 5) => {
  const start = React.useRef({ x: 0, y: 0 });

  const handleStart = (x: number, y: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    start.current = { x, y };
  };

  const handleEnd = (x: number, y: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { x: startX, y: startY } = start.current;
    const diffX = Math.abs(x - startX);
    const diffY = Math.abs(y - startY);

    // 當拖曳距離小於閾值，視為點擊，觸發 handleOpenSetting
    if (diffX < threshold && diffY < threshold) {
      callback();
    }
  };

  return {
    onMouseDown: (e: React.MouseEvent) => handleStart(e.clientX, e.clientY, e),
    onMouseUp: (e: React.MouseEvent) => handleEnd(e.clientX, e.clientY, e),
    onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY, e),
    onTouchEnd: (e: React.TouchEvent) => handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY, e),
  };
};

export default useDragClick;