export enum EnumTopicMiddleItemMode {
  Causal = 'causal',   // 因果性辯題
  Compare = 'compare', // 比較性辯題
}

export const IsEnumTopicMiddleItemMode = (input: EnumTopicMiddleItemMode): input is EnumTopicMiddleItemMode => {
  return Object.values(EnumTopicMiddleItemMode).includes(input) ? true : false;
};
