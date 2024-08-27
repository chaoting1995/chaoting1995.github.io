import type { StoryFn } from "@storybook/react";

import ThemeProviderWrapper from "./ThemeProviderWrapper";

const withThemeProvider = (Story: StoryFn) => {
  return (
    <ThemeProviderWrapper>
      <Story />
    </ThemeProviderWrapper>
  );
};

export const decorators = [withThemeProvider];

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
