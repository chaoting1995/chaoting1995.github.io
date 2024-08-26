import { createTheme } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';

export const theme = createTheme({
  palette: {
    primary: {
      main: styleSettingColor.background.dark
    },
  },
});
