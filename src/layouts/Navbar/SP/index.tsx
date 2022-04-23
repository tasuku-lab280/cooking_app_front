import { MenuList } from './MemuList';

export const NavSp = () => {
  return (
    <div className="fixed bottom-0 z-20 md:hidden">
      <div className="w-screen bg-white border-t shadow">
        <div className="flex justify-between">
          <MenuList />
        </div>
      </div>
    </div>
  );
};
