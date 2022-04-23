import { useAuth0 } from '@auth0/auth0-react';
import {
  MdReceipt,
  MdHome,
  MdTimeline,
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
          <Menu href="/" title="ホーム" icon={<MdHome size={30} />} />
          <Menu
            href="/timeline"
            title="タイムライン"
            icon={<MdTimeline size={30} />}
          />
          <Menu
            href="/recipe"
            title="レシピを探す"
            icon={<MdReceipt size={30} />}
          />
          <Menu
            href="/stocks"
            title="材料の管理"
            icon={<MdPanTool size={30} />}
          />
          <Menu
            href="/menu"
            title="本日の献立"
            icon={<MdAdUnits size={30} />}
          />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Menu href="/" title="ホーム" icon={<MdHome size={30} />} />
          <Menu
            href="/recipe"
            title="レシピを探す"
            icon={<MdReceipt size={30} />}
          />
        </>
      )}
    </>
  );
};
