import { AppShell, Container, useMantineTheme } from '@mantine/core';

import { Header } from 'layouts/Header';
import { Navbar } from 'layouts/Navbar';

type Props = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={<Navbar />}
      header={<Header />}
    >
      <Container size="xl" pt={16}>
        {children}
      </Container>
    </AppShell>
  );
};
