export enum EnumEnv {
  Development = 'development',
  // Local = 'local',
  Production = 'production'
}

export const IsEnumEnv = (input: unknown): input is EnumEnv => {
  return Object.values(EnumEnv).includes(input as EnumEnv) ? true : false;
};
