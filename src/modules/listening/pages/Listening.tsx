import React from 'react'
import { css, cx } from '@emotion/css';
import { TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { styleSettingColor } from 'styles/variables.style';
import { PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/constants';
import Layout from 'layouts/Layout';
import { HeadTags, Button } from 'components';
import { DEFAULT_LISTENGING, LISTENGING_ROWS_HEAD, LISTENGING_ROWS_TEMPLATE, ListeningRow } from 'modules/listening';
import useFormColumn from 'modules/form/useFormColumn';
import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';
import { Listening as TypeListening, ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
import { style as styleRow } from 'modules/listening/components/ListeningRow';
import { argumentStatusWording } from 'modules/listening';

const Listening: React.FC = () => {
  const [listening, setListening] = React.useState<TypeListening>(DEFAULT_LISTENGING);

  const columnName = useFormColumn<string>({
    value: listening.name,
    defaultValue: '',
    placeholder: '戰場判斷表名稱',
  });

  const columnOwner = useFormColumn<string>({
    value: '',
    defaultValue: '',
    placeholder: '撰寫者名稱',
  });

  const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    columnName.onChange(event.target.value);
  },[columnName]);


  const handleChangeOwner = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    columnOwner.onChange(event.target.value);
  },[columnOwner]);

  const [columnRows, setColumnRows] = React.useState<TypeListeningRow[]>(LISTENGING_ROWS_TEMPLATE);

  const handeChangeRowColumn1 = React.useCallback((_index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnRows(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      if (!newState[_index]) return;
      newState[_index].column1 = event.target.value;
      return newState;
    });
  },[]);

  const handeChangeRowColumn2 = React.useCallback((_index: number) => (event: SelectChangeEvent<EnumArgumentStatus>) => {
    setColumnRows(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      if (!newState[_index]) return;
      newState[_index].column2 = event.target.value;
      return newState;
    });
  },[]);

  const handleUpdateState = (): TypeListening => {
    const newListening: TypeListening = {
      ...JSON.parse(JSON.stringify(listening)) as TypeListening,
      id: uuidv4(),
      name: columnName.value,
      owner: columnOwner.value,
      updatedAt: dayjs().valueOf(),
      rows: columnRows
    }

    setListening(newListening);
    return newListening;
  }

  const handleUpload = async () => {
    const _listening = handleUpdateState();
    console.log({_listening})

    //  const API_URL = 'https://script.google.com/macros/s/AKfycbzFmLzsE1ObYE971Gpm5dzRWEi7iJ0GRWoAfKz8ZC8uTQ0grW1gTebi55oOCnCBr69s/exec';
     const API_URL = 'https://script.google.com/macros/s/AKfycbyzDZiAMG1-_iJTw_89eoKVXVKMTyiFNpx9MYXCI_wLEqNeHysWB5iuVOVgAiKHWnih/exec';
   
    const rowsWithStatusWording = _listening.rows.map(item => ({ 
      ...item,
      column2: argumentStatusWording[item.column2],
    }));
    
    const queryParams = new URLSearchParams({
      id: _listening.id,
      name: _listening.name,
      owner: _listening.owner,
      updatedAt: dayjs().format('YYYY/sMM/DD HH:mm:ss'),
      rows: JSON.stringify(rowsWithStatusWording)
    }).toString();

    try {
      const response = await fetch(`${API_URL}?${queryParams}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      const result = await response.json();
      console.log('result',result);
      if (result.status === '成功') {
        alert('資料已成功傳送到 Google Sheets');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // window.handleResponse = (res) => {
  //   console.log(res)
  // }

  // const handleUpload1 = () => {
  //   const data = { 
  //     name: dayjs().format('YYYY/sMM/DD HH:mm:ss'), 
  //     phone: columnRows[0].column1,
  //     demand: argumentStatusWording[columnRows[0].column2],
  //   };
  //   const queryString = Object.keys(data)
  //     .map((key) => key + '=' + data[key])
  //     .join('&');

  //   const script = document.createElement('script');

  //   const API_URL = 'https://script.google.com/macros/s/AKfycbzeJVxqA9wMb72uF0AjMo6I35jnH1lDRgA6rBFI1sjhDG5Oi92MQLnqvZRfjgbnDxEA/exec';
  //   script.src = API_URL + '?' + queryString + '&callback=handleResponse';
  //   document.body.appendChild(script);
  // }

  return <Layout title={PAGE_TITLE.listening} mainClassName={cx('DT-Listening', style)}>
    <HeadTags title={PAGE_TITLE.listening} description={PAGE_DESCRIPTION.listening} />
    <TextField 
      fullWidth
      className='listening-name'
      placeholder={columnName.placeholder}
      autoFocus
      value={columnName.value}
      onChange={handleChangeName}
    />
    <TextField 
      fullWidth
      className='listening-name'
      placeholder={columnOwner.placeholder}
      value={columnOwner.value}
      onChange={handleChangeOwner}
    />
    <div className='listening-body'>
      <div className='listening-hint-save-solution'>
        自動保存於本地端{listening.updatedAt ? `, 上次發送時間 ${dayjs(listening.updatedAt).format('YYYY/MM/DD HH:mm:ss')}`: ''}
      </div>
      <div className='listening-table'>
        <div className={styleRow} style={{ backgroundColor: LISTENGING_ROWS_HEAD.bg || 'unset' }}>
            <div className='column column-head column-1'>{LISTENGING_ROWS_HEAD.column1}</div>
            <div className='column column-head column-2'>{LISTENGING_ROWS_HEAD.column2}</div>
        </div>
        {columnRows.map((item, index) => 
          <ListeningRow 
            key={item.id}
            {...item} 
            onChangeColumn1={handeChangeRowColumn1(index)}
            onChangeColumn2={handeChangeRowColumn2(index)}
          />
        )}
      </div>
      <Button variant='outlined' className='send-button' onClick={handleUpload}>送出</Button>
    </div>
  </Layout>;
}

export default Listening;

const style = css`
  background-color: ${styleSettingColor.background.white};
  color: ${styleSettingColor.text.secondary};

  .listening-name {
    border-bottom: 1px solid ${styleSettingColor.disabled};
    
    .MuiInputBase-root {
      font-size: 18px;
      padding: 8px 16px;
      box-sizing: border-box;

      fieldset {
        border: none;
      }

      .MuiInputBase-input {
        padding: 0;
      }
    }
  }

  .listening-body {
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .listening-hint-save-solution {
    width: 100%;
    margin-bottom: 8px;
    font-size: 12px;
    color: ${styleSettingColor.text.gray};
  }

  .listening-table {
    width: 100%;
    margin-bottom: 16px;
  }

  .MuiInput-root {
    font-size: 16px;
  }

  .MuiButton-root.send-button {
    min-width: 300px;
  }
`;