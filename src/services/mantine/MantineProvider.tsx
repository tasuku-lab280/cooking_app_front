import { useState } from 'react';
import {
  MantineProvider as Provider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

type Props = {
  children: React.ReactNode;
};

export const MantineProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <Provider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>{children}</NotificationsProvider>
      </Provider>
    </ColorSchemeProvider>
  );
};
