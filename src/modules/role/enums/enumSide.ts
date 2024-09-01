export enum EnumSide {
  Positive = 'positive', // 正方
  Negative = 'negative' // 反方
}

export const IsEnumSide = (input: EnumSide): input is EnumSide => {
  return Object.values(EnumSide).includes(input) ? true : false;
};
