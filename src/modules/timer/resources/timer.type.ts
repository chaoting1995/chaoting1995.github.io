import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode'

export type Timer = {
  id: string;
  mode: EnumTimerMode;
  name: string;
  ring: number[];
}