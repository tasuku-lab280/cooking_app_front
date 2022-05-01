import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';
import { Home, Timeline, Notes, Bread } from 'tabler-icons-react';

import {
  HOME_PATH,
  RECIPES_PATH,
  RECIPE_NEW_PATH,
  TIMELINE_PATH,
  MENU_PATH,
} from 'constants/routeName';
import { MenuItem } from 'layouts/Navbar/MenuItem';

const beforeLoginLinks = [
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

const afterLoginLinks = [
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
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <>
          {beforeLoginLinks.map((link) => (
            <MenuItem {...link} key={link.label} />
          ))}
        </>
      )}
      {isAuthenticated && (
        <>
          {afterLoginLinks.map((link) => (
            <MenuItem {...link} key={link.label} />
          ))}
          <Link href={RECIPE_NEW_PATH} passHref>
            <a>
              <Button
                color="teal"
                radius="xl"
                size="md"
                mt={20}
                fullWidth
                onClick={() => false}
              >
                レシピを登録する
              </Button>
            </a>
          </Link>
        </>
      )}
    </div>
  );
};
