import { useAuth0 } from '@auth0/auth0-react';
import {
  MdHome,
  MdTimeline,
  MdReceipt,
  MdPanTool,
  MdAdUnits,
} from 'react-icons/md';

import { Menu } from './Menu';

export const MenuList = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <>
          <Menu
            href="/"
            title="ホーム"
            icon={<MdHome className="inline-block mb-1 w-7 h-7" />}
          />
          <Menu
            href="/timeline"
            title="タイムライン"
            icon={<MdTimeline className="inline-block mb-1 w-7 h-7" />}
          />
          <Menu
            href="/recipe"
            title="レシピを探す"
            icon={<MdReceipt className="inline-block mb-1 w-7 h-7" />}
          />
          <Menu
            href="/stocks"
            title="材料の管理"
            icon={<MdPanTool className="inline-block mb-1 w-7 h-7" />}
          />
          <Menu
            href="/menu"
            title="本日の献立"
            icon={<MdAdUnits className="inline-block mb-1 w-7 h-7" />}
          />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Menu
            href="/"
            title="ホーム"
            icon={<MdHome className="inline-block mb-1 w-7 h-7" />}
          />
          <Menu
            href="/recipe"
            title="レシピを探す"
            icon={<MdReceipt className="inline-block mb-1 w-7 h-7" />}
          />
        </>
      )}
    </>
  );
};
