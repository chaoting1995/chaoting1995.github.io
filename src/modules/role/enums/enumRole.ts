export enum EnumRole {
  Judge = 'judge', // 裁判
  Player = 'player' // 選手
}

export const IsEnumRole = (input: EnumRole): input is EnumRole => {
  return Object.values(EnumRole).includes(input) ? true : false;
};
