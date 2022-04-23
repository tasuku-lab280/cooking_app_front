import { NavPc } from './PC';
import { NavSp } from './SP';

export const Navbar = () => {
  return (
    <nav>
      <NavSp />
      <NavPc />
    </nav>
  );
};
