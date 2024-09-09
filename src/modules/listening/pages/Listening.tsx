import React from 'react'
import { css, cx } from '@emotion/css';
import { TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { styleSettingColor } from 'styles/variables.style';
import { PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/constants';
import Layout from 'layouts/Layout';
import { HeadTags, Button } from 'components';
import { DEFAULT_LISTENGING, LISTENGING_ROWS_TEMPLATE, ListeningRows as ListeningRowsEditor } from 'modules/listening';
import useFormColumn from 'modules/form/useFormColumn';
import { Listening as TypeListening, ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
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

    const API_URL = 'https://script.google.com/macros/s/AKfycbwcCmdoryTnEG7Dwz61FhwzKvht0ZPYJw5H1lBp-uiO7CPvVKA5uJnrtJOXg4JxWaKw/exec';

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
      if (result.status === '成功') {
        alert('資料已成功傳送到 Google Sheets');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return <Layout title={PAGE_TITLE.listening} mainClassName={cx('DT-Listening', style)}>
    <HeadTags title={PAGE_TITLE.listening} description={PAGE_DESCRIPTION.listening} />
    <TextField
      className='listening-name'
      placeholder={columnName.placeholder}
      autoFocus
      value={columnName.value}
      onChange={handleChangeName}
    />
    <TextField
      className='listening-name'
      placeholder={columnOwner.placeholder}
      value={columnOwner.value}
      onChange={handleChangeOwner}
    />
    <div className='listening-body'>
      <div className='listening-hint-save-solution'>
        自動保存於本地端
      </div>
      <ListeningRowsEditor listeningRows={columnRows} setColumnRows={setColumnRows}/>
      <Button variant='outlined' className='send-button' onClick={handleUpload}>送出</Button>
      <div className='listening-hint-save-solution-bottom'>
        {listening.updatedAt ? `上次發送時間 ${dayjs(listening.updatedAt).format('YYYY/MM/DD HH:mm:ss')}`: ''}
      </div>
    </div>
  </Layout>;
}

export default Listening;

const style = css`
  background-color: ${styleSettingColor.background.white};
  color: ${styleSettingColor.text.secondary};

  .listening-name {
    width: 100%;
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


  .listening-hint-save-solution-bottom,
  .listening-hint-save-solution {
    width: 100%;
    margin-top: 8px;
    font-size: 12px;
    color: ${styleSettingColor.text.gray};
  }

  .listening-hint-save-solution {
    margin-top: -8px;
    margin-bottom: 8px;
  }


  .send-button.MuiButton-root {
    width: 100%;
    min-width: 250px;
  }
`;