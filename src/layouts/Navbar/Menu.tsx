import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Skeleton } from '@mantine/core';
import { Home, Timeline, Notes, Bread } from 'tabler-icons-react';

import {
  HOME_PATH,
  RECIPES_PATH,
  RECIPE_NEW_PATH,
  TIMELINE_PATH,
  MENU_PATH,
} from 'constants/routeName';
import { MenuItem } from './MenuItem';

const SKELTON_MENU_LENGTHS = 4;

const BEFORE_LOGIN_LINKS = [
  {
    label: 'ホーム',
    href: HOME_PATH,
    icon: <Home size={30} />,
    color: 'blue',
  },
  {
    label: 'レシピを探す',
    href: RECIPES_PATH,
    icon: <Notes size={30} />,
    color: 'violet',
  },
];

const AFTER_LOGIN_LINKS = [
  {
    label: 'ホーム',
    href: HOME_PATH,
    icon: <Home size={30} />,
    color: 'blue',
  },
  {
    label: 'タイムライン',
    href: TIMELINE_PATH,
    icon: <Timeline size={30} />,
    color: 'teal',
  },
  {
    label: 'レシピを探す',
    href: RECIPES_PATH,
    icon: <Notes size={30} />,
    color: 'violet',
  },
  {
    label: '本日の献立',
    href: MENU_PATH,
    icon: <Bread size={30} />,
    color: 'grape',
  },
];

export const Menu = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <>
        {[...Array(SKELTON_MENU_LENGTHS)].map((_, index) => (
          <div key={index} className="flex ml-2.5 py-2.5">
            <Skeleton height={35} width={42} />
            <Skeleton height={35} radius="xl" ml="md" />
          </div>
        ))}
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {BEFORE_LOGIN_LINKS.map((link) => (
          <MenuItem {...link} key={link.label} />
        ))}
      </>
    );
  }

  return (
    <>
      {AFTER_LOGIN_LINKS.map((link) => (
        <MenuItem {...link} key={link.label} />
      ))}
      <Link href={RECIPE_NEW_PATH} passHref>
        <a>
          <Button color="teal" radius="xl" size="md" mt={20} fullWidth>
            レシピを登録する
          </Button>
        </a>
      </Link>
    </>
  );
};
