import React from 'react'
import { css, cx } from '@emotion/css';
import { v4 as uuidv4 } from 'uuid';
import { DotsSixVertical } from '@phosphor-icons/react';

import { BottomDrawer } from 'components';
import useDialog from 'hooks/useDialog';

import { styleSettingColor } from 'styles/variables.style';
import { Button, DragDrog } from 'components';
import { 
  LISTENGING_ROWS_HEAD, 
  ListeningRow,
  DEFAULT_LISTENGING_ROW,
  ListeningRowSetting
} from 'modules/listening';
import { ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
import { style as styleRow } from 'modules/listening/components/ListeningRow';

type Prpos = {
  className?: string;
  listeningRows: TypeListeningRow[];
  onChangeListeningRows: React.Dispatch<React.SetStateAction<TypeListeningRow[]>>;
}

const ListeningRows: React.FC<Prpos> = (props) => {
  const { onChangeListeningRows } = props;
  const [openSetting, handleOpenSetting, handleCloseSetting] = useDialog(false);

  const handeonChangeListeningRowByIndex = React.useCallback((index: number) => (listeningRow: TypeListeningRow) => {
    onChangeListeningRows(prevState => {
      const newState: TypeListeningRow[] = JSON.parse(JSON.stringify(prevState));
      if (newState[index]) newState[index] = listeningRow;
      return newState;
    });
  },[onChangeListeningRows]);

  const handleChangeRowAmount = React.useCallback((key: 'add' | 'minus') => {
    onChangeListeningRows(prevState => {
      const newState = [...prevState];
      if(key === 'add') newState.push({ ...DEFAULT_LISTENGING_ROW, id: uuidv4()});
      if(key === 'minus') newState.pop();
      return newState;
    })
  }, [onChangeListeningRows]);

  const handleDragEnd = React.useCallback((sourceIndex: number, destinationIndex: number) => {
    onChangeListeningRows(prevState => {
      // 拷貝新的 listData (來自 state) 
      const newState = Array.from(prevState);
      // 從 source.index 剪下被拖曳的元素
      const [removed] = newState.splice(sourceIndex, 1);
      //在 destination.index 位置貼上被拖曳的元素
      newState.splice(destinationIndex, 0, removed);
      // 更新状态
      return newState;
    }); 
  }, [onChangeListeningRows]);

  return <div className={cx('DT-ListeningRows', style, props.className)}>
    <div className='listening-table'>
      <div className={styleRow} style={{ backgroundColor: LISTENGING_ROWS_HEAD.bg || 'unset' }}>
          <div className='column column-head column-1'>{LISTENGING_ROWS_HEAD.column1}</div>
          <div className='column column-head column-2'>{LISTENGING_ROWS_HEAD.column2}</div>
      </div>
      <div className='listening-table-body'>
        <DragDrog
          className='listening-drag-drog'
          onDragEnd={handleDragEnd}
          list={props.listeningRows}
          renderRow={(item, index, dragHandleProps) => (
            <ListeningRow 
              key={item.id}
              index={index}
              listeningRow={item}
              onChangeListeningRow={handeonChangeListeningRowByIndex(index)}
              renderRowSelector={(onFocus, onBlur) => (
                <>
                  <div className='row-selector' onClick={handleOpenSetting} {...dragHandleProps}>
                    <DotsSixVertical size={16} weight='bold' />
                    <input 
                      onFocus={onFocus}
                      onBlur={onBlur}
                      />
                  </div>
                  <BottomDrawer open={openSetting} onOpen={handleOpenSetting} onClose={handleCloseSetting}>
                    <ListeningRowSetting 
                      index={index}
                      listeningRow={item}
                      onChangeListeningRow={handeonChangeListeningRowByIndex(index)}
                      onChangeListeningRows={props.onChangeListeningRows}
                      onClose={handleCloseSetting}
                      />
                  </BottomDrawer>
                </>
              )}
            />
          )}
        />
        {/* {props.listeningRows.map((item, index) => 
          <ListeningRow 
            key={item.id}
            index={index}
            listeningRow={item} 
            onChangeListeningRows={props.onChangeListeningRows}
          />
        )} */}
      </div>
    </div>
    <div className='row-amount-button-group'>
      {[
        { label: '-', action: handleChangeRowAmount('minus') },
        { label: '+', action: handleChangeRowAmount('add') },
      ].map(item => (
        <Button key={item.label} variant='contained' size='small' color='secondary' onClick={item.action}>
          {item.label}
        </Button>
      ))}
    </div>
  </div>
}

export default ListeningRows;

const style = css`
  width: 100%;

  .listening-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }

  .listening-table-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }

  .MuiInput-root {
    font-size: 16px;
  }
  
  .listening-drag-drog {
    .dd-droppable {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
  
      .dd-drappable {
        width: 100%;
      }
    }
  }

  .row-amount-button-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    
    .MuiButton-root {
      margin-top: 8px;
      width: 100%;
      margin-bottom: 16px;
      font-weight: bold;
      
      &:not(.Mui-disabled) {
        background-color: ${styleSettingColor.disabled};
      }
    }
  }
`;
