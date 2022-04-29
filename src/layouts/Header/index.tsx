import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Header as MantineHeader,
  MediaQuery,
  Button,
  Burger,
  Drawer,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { Logo } from './logo';
import { Navbar } from 'layouts/Navbar';

export const Header = () => {
  const [opened, setOpened] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const matches = useMediaQuery('(max-width: 768px)');

  return (
    <MantineHeader height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened(true)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Logo colorScheme={colorScheme} />
        {!isAuthenticated && (
          <Button
            className="ml-auto"
            color="teal"
            radius="xl"
            onClick={loginWithRedirect}
          >
            ログイン
          </Button>
        )}
      </div>

      <Drawer
        classNames={{ title: 'font-bold' }}
        opened={matches && opened}
        onClose={() => setOpened(false)}
        title="メニュー"
        padding="xl"
        size="75%"
      >
        <Navbar isDrawer />
      </Drawer>
    </MantineHeader>
  );
};
