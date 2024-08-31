import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import { Timer } from 'modules/timer/resources/timer.type';

export const LOCALSTORAGE_KEY_TIMERS = 'DT_LOCALSTORAGE_KEY_TIMERS';

export const DEFAULT_TIMERS: Array<Timer> = [
  {
    id: 'debate-timer-001',
    mode: EnumTimerMode.Normal,
    name: '新式奧瑞岡333制',
    ring: [150, 180, 210]
  },
  {
    id: 'debate-timer-002',
    mode: EnumTimerMode.Normal,
    name: '新式奧瑞岡444制',
    ring: [210, 240, 270]
  },
  {
    id: 'debate-timer-003',
    mode: EnumTimerMode.Crossfire,
    name: '自由辯論',
    ring: [210, 240]
  },
]

export const TEMPLATE_TIMERS: Array<Timer> = [
  {
    id: '',
    mode: EnumTimerMode.Normal,
    name: '新式奧瑞岡333制',
    ring: [150, 180, 210]
  },
  {
    id: '',
    mode: EnumTimerMode.Normal,
    name: '新式奧瑞岡444制',
    ring: [210, 240, 270]
  },
  {
    id: '',
    mode: EnumTimerMode.Crossfire,
    name: '自由辯論',
    ring: [210, 240]
  },
]

export const DEFAULT_TIMER: Timer = {
  id: 'debate-timer-000',
  mode: EnumTimerMode.Normal,
  name: '(目前無設定計時器)',
  ring: [5, 10, 15]
};

export const EMPTY_TIMER: Timer = {
  id: '',
  mode: EnumTimerMode.Normal,
  name: '',
  ring: []
};