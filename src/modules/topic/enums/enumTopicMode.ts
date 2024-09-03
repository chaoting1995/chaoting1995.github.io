export enum EnumTopicMode {
  Combined = 'combined', // 組合辯題
  Complete = 'complete', // 完整辯題
}

export const IsEnumTopicMode = (input: EnumTopicMode): input is EnumTopicMode => {
  return Object.values(EnumTopicMode).includes(input) ? true : false;
};
