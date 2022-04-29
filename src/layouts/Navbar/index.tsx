import { useAuth0 } from '@auth0/auth0-react';
import { Navbar as MantineNavbar, Button } from '@mantine/core';

import { UserInfo } from './UserInfo';
import { Menu } from './Menu';

type Props = {
  isDrawer?: boolean;
};

export const Navbar = (props: Props) => {
  const { isAuthenticated, logout } = useAuth0();
  const { isDrawer } = props;

  return (
    <MantineNavbar
      p="md"
      width={{ sm: 200, lg: 300 }}
      hiddenBreakpoint={isDrawer ? undefined : 'sm'}
      hidden={isDrawer ? undefined : true}
    >
      <MantineNavbar.Section grow>
        <Menu />
      </MantineNavbar.Section>
      {isAuthenticated && (
        <>
          <Button
            className="mb-5"
            variant="outline"
            color="teal"
            radius="xl"
            onClick={() => logout()}
          >
            ログアウト
          </Button>
          <MantineNavbar.Section>
            <UserInfo />
          </MantineNavbar.Section>
        </>
      )}
    </MantineNavbar>
  );
};
