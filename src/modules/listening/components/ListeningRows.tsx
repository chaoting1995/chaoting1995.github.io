import React from 'react'
import { css, cx } from '@emotion/css';
import { v4 as uuidv4 } from 'uuid';

import { styleSettingColor } from 'styles/variables.style';
import { Button, DragDrog } from 'components';
import { 
  LISTENGING_ROWS_HEAD, 
  ListeningRow,
  DEFAULT_LISTENGING_ROW
} from 'modules/listening';
import { ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
import { style as styleRow } from 'modules/listening/components/ListeningRow';

type Prpos = {
  className?: string;
  listeningRows: TypeListeningRow[];
  setColumnRows: React.Dispatch<React.SetStateAction<TypeListeningRow[]>>;
}

const ListeningRows: React.FC<Prpos> = (props) => {

  const handeChangeListeningRowByIndex = React.useCallback((index: number) => (listeningRow: TypeListeningRow) => {
    props.setColumnRows(prevState => {
      const newState =[...prevState];
      if (newState[index]) newState[index] = listeningRow;
      return newState;
    })
  },[props]);

  const handleChangeRowAmount = React.useCallback((key: 'add' | 'minus') => () => {
    props.setColumnRows(prevState => {
      const newState = [...prevState];
      if(key === 'add') newState.push({ ...DEFAULT_LISTENGING_ROW, id: uuidv4()});
      if(key === 'minus') newState.pop();
      return newState;
    })
  }, [props]);

  const handleDragEnd = React.useCallback((sourceIndex: number, destinationIndex: number) => {
    props.setColumnRows(prevState => {
      // 拷貝新的 listData (來自 state) 
      const newState = Array.from(prevState);
      // 從 source.index 剪下被拖曳的元素
      const [removed] = newState.splice(sourceIndex, 1);
      //在 destination.index 位置貼上被拖曳的元素
      newState.splice(destinationIndex, 0, removed);
      // 更新狀態
      return newState;
    }); 
  }, [props]);
  
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
              onChangeListeningRow={handeChangeListeningRowByIndex(index)}
              dragHandleProps={dragHandleProps}
              setColumnRows={props.setColumnRows}
            />
          )}
        />
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
