import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';
import { Listening, ListeningRow } from 'modules/listening/resources/listening.type';

export const BG_DARK = '#BEBEBE';
export const BG_DEFAULT = '#FFFFFF';

export const DEFAULT_LISTENGING_ROW: ListeningRow = {
  id: '',
  column1: '',
  column2: EnumArgumentStatus.Unselected,
  bg : BG_DEFAULT,
}

export const DEFAULT_LISTENGING: Listening = {
  id: '',
  name: '',
  owner: '',
  updatedAt: 0,
  rows: []
}

export const LISTENGING_ROWS_HEAD = {
  id: 'thead',
  column1: '標題',
  column2: '狀態',
  bg: 'rgba(212, 212, 212, 0.49)'
};

export const LISTENGING_ROWS_TEMPLATE: ListeningRow[] = [
  {
    id: 'listening-positive',
    column1: '正方',
    column2: EnumArgumentStatus.Unselected,
    bg: BG_DARK
  },
  {
    id: 'listening-positive-1',
    column1: '',
    column2: EnumArgumentStatus.Unselected,
    bg: BG_DEFAULT
  },
  {
    id: 'listening-positive-2',
    column1: '',
    column2: EnumArgumentStatus.Unselected,
    bg: BG_DEFAULT
  },
  {
    id: 'listening-negative',
    column1: '反方',
    column2: EnumArgumentStatus.Unselected,
    bg: BG_DARK
  },
  {
    id: 'listening-negative-1',
    column1: '',
    column2: EnumArgumentStatus.Unselected,
    bg: BG_DEFAULT
  },
  {
    id: 'listening-negative-2',
    column1: '',
    column2: EnumArgumentStatus.Unselected,
    bg: BG_DEFAULT
  },
];

export const argumentStatusWording: Record<EnumArgumentStatus, string> = {
  [EnumArgumentStatus.Unselected]: '未選擇',
  [EnumArgumentStatus.HP100]: '完全成立',
  [EnumArgumentStatus.HP90]: '削弱',
  [EnumArgumentStatus.HP10]: '極大削弱',
  [EnumArgumentStatus.HP0Obfuscation]: '擊倒(打糊)',
  [EnumArgumentStatus.HP0Disassembly]: '擊倒(拆掉)',
  [EnumArgumentStatus.Lose]: '掉點',
  [EnumArgumentStatus.Unknown]: '未知',
  [EnumArgumentStatus.Other]: '其他',
};
