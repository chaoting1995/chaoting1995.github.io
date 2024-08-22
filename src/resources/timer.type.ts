import { EnumTimerMode } from "enums/enumTimerMode"

export type Timer = {
  id: string;
  mode: EnumTimerMode;
  name: string;
  ring: number[];
  active: boolean;
}