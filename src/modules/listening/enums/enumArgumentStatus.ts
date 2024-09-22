export enum EnumArgumentStatus {
  Unselected = 'Unselected',                   // 未選擇
  HP100 = 'HP100',                             // 完全成立
  HP90 = 'HP90',                               // 削弱
  HP10 = 'HP10',                               // 極大削弱
  HP0_Obfuscation = 'HP0_Obfuscation',         // 擊倒(打糊)
  HP0_InitFail = 'HP0_InitFail',               // 初步不成立
  HP0_Disassembly = 'HP0_Disassembly',         // 擊倒(拆掉)
  Lose = 'Lose',                               // 掉點
  Unknown = 'Unknown',                         // 未知
  Other = 'Other',                             // 其他
}

export const IsEnumArgumentStatus = (input: EnumArgumentStatus): input is EnumArgumentStatus => {
  return Object.values(EnumArgumentStatus).includes(input) ? true : false;
};
