import { EnumEnv, IsEnumEnv } from 'env/enums/env.enum';

type EnvSetting = {
  // originAPI: string;
  evaluationID: string;
};

export const ALL_ENV_SETTING: Record<EnumEnv, EnvSetting> = {
  [EnumEnv.Development]: {
    evaluationID: '',
  },
  [EnumEnv.Production]: {
    evaluationID: 'G-G8B3ZHFC3Y',
  },
};

export const getENV = () => {
  let env: EnumEnv = EnumEnv.Development;

  if (IsEnumEnv(import.meta.env.VITE_APP_ENV)) {
    env = import.meta.env.VITE_APP_ENV;
  }

  return env;
};

export const isDev = getENV() === EnumEnv.Development;

const env = getENV();

export default ALL_ENV_SETTING[env];
