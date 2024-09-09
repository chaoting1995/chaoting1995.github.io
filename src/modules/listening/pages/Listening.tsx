import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { FileText, NotePencil, UserCircle } from '@phosphor-icons/react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/constants';
import { styleSettingColor } from 'styles/variables.style';
import Layout from 'layouts/Layout';
import { HeadTags, Button } from 'components';
import useFormColumn from 'modules/form/useFormColumn';
import { Listening as TypeListening, ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
import { 
  DEFAULT_LISTENING, 
  ListeningRows as ListeningRowsEditor,
  useListenings,
  argumentStatusWording
 } from 'modules/listening';

const Listening: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const listeningsProvider = useListenings();

  const listening = React.useMemo(() => {
    if (!id) return DEFAULT_LISTENING;
    const _listening = listeningsProvider.getItem(id)
    if (!_listening) return DEFAULT_LISTENING;
    return _listening;
  }, [id, listeningsProvider]);

  const columnName = useFormColumn<string>({
    value: listening.name,
    defaultValue: '',
    placeholder: '戰場判斷表名稱，如：01/01 XXvsYY',
  });

  const columnOwner = useFormColumn<string>({
    value: listening.owner,
    defaultValue: '',
    placeholder: '撰寫者名稱',
  });

  // TODO
  const handleTrakingHeaderButtonToList = () => {
    // ServiceGA4.event(GA_EVENT.Header_Button_Timers);
  };

  const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    columnName.onChange(event.target.value);
  },[columnName]);

  const handleChangeOwner = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    columnOwner.onChange(event.target.value);
  },[columnOwner]);

  const [columnRows, setColumnRows] = React.useState<TypeListeningRow[]>(listening.rows);

  const handleSave = () => {
    // formListening 物件，轉換成 listening 物件
    const _listening: TypeListening = {
      ...JSON.parse(JSON.stringify(listening)) as TypeListening,
      // id: props.timer?.id || `debate-listening-${uuidv4()}`,
      id: listening.id || `debate-listening-${uuidv4()}`,
      name: columnName.value,
      owner: columnOwner.value,
      updatedAt: dayjs().valueOf(),
      rows: columnRows
    }

    if (!listening.id) {
      listeningsProvider.addItem(_listening);
    } else {
      listeningsProvider.editItem(_listening);
    };

    return _listening;
  };

  const handleUpload = async () => {
    const _listening = handleSave();

    const API_URL = 'https://script.google.com/macros/s/AKfycbwcCmdoryTnEG7Dwz61FhwzKvht0ZPYJw5H1lBp-uiO7CPvVKA5uJnrtJOXg4JxWaKw/exec';

    const rowsWithStatusWording = _listening.rows.map(item => ({ 
      ...item,
      column2: argumentStatusWording[item.column2],
    }));
    
    const queryParams = new URLSearchParams({
      id: _listening.id,
      name: _listening.name,
      owner: _listening.owner,
      updatedAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
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

  return <Layout 
    title={PAGE_TITLE.listening} 
    homeLink={pageLinks.listenings}
    mainClassName={cx('DT-Listening', style)}
    renderButtons={
      <IconButton component={Link} to={pageLinks.listenings} onClick={handleTrakingHeaderButtonToList}>
        <FileText size={28} weight="light" />
      </IconButton>
    }>
    <HeadTags title={PAGE_TITLE.listening} description={PAGE_DESCRIPTION.listening} />
    <Input
      className='listening-name'
      placeholder={columnName.placeholder}
      autoFocus
      value={columnName.value}
      onChange={handleChangeName}
      startAdornment={
        <InputAdornment position="start">
          <NotePencil size={28} weight="light" color={styleSettingColor.text.secondary} />
        </InputAdornment>
      }
    />
    <Input
      className='listening-name'
      placeholder={columnOwner.placeholder}
      value={columnOwner.value}
      onChange={handleChangeOwner}
      startAdornment={
        <InputAdornment position="start">
          <UserCircle size={28} weight="light" color={styleSettingColor.text.secondary} />
        </InputAdornment>
      }
    />
    <div className='listening-body'>
      {/* <div className='listening-hint-save-solution'>
        TODO 自動保存於本地端
      </div> */}
      <ListeningRowsEditor listeningRows={columnRows} setColumnRows={setColumnRows}/>
      <Button variant='outlined' className='save-button' onClick={handleSave}>保存</Button>
      <Button variant='outlined' className='send-button' onClick={handleUpload}>保存 & 送出</Button>
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
    
    &.MuiInputBase-root {
      font-size: 18px;
      padding: 8px 16px;
      box-sizing: border-box;

      &:after {
        border-bottom: unset;
      }

      &:hover:before,
      &:before {
        border-bottom: unset;
      }

      fieldset {
        border-width: 0;
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


  .save-button.MuiButton-root,
  .send-button.MuiButton-root {
    margin-top: 8px;
    width: 100%;
    min-width: 250px;
    font-size: 18px;
  }
  
  .send-button.MuiButton-root {
    background-color: ${styleSettingColor.background.dark}1a;
  }
`;