export enum EnumTopicItem {
  FrontItem = 'frontItem', // 辯題前項
  BackItem = 'backItem'    // 辯題後項
}

export const IsEnumTopicItem = (input: EnumTopicItem): input is EnumTopicItem => {
  return Object.values(EnumTopicItem).includes(input) ? true : false;
};
