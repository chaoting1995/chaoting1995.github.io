export enum EnumMiddleItem {
  Causal = 'causal',   // 因果性辯題
  Compare = 'compare', // 比較性辯題
}

export const IsEnumMiddleItem = (input: EnumMiddleItem): input is EnumMiddleItem => {
  return Object.values(EnumMiddleItem).includes(input) ? true : false;
};
