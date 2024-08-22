export enum EnumSide {
  Positive, // 正方
  Negative // 反方
}

export const IsEnumSide = (input: EnumSide): input is EnumSide => {
  return Object.values(EnumSide).includes(input) ? true : false;
};
