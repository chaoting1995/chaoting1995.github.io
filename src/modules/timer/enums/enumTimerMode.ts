export enum EnumTimerMode {
  Normal = "normal",
  Crossfire = "crossfire"
}


export const IsEnumTimerMode = (input: EnumTimerMode): input is EnumTimerMode => {
  return Object.values(EnumTimerMode).includes(input) ? true : false;
};
