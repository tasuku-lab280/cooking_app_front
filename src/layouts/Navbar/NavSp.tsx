import Link from 'next/link';
import { MdReceipt, MdHome } from 'react-icons/md';

export const NavSp = () => {
  return (
    <div className="fixed bottom-0 z-20 md:hidden">
      <div className="w-screen bg-white border-t shadow">
        <div className="flex justify-between">
          <Link href="/">
            <a className="w-full text-center py-2 text-green-500 font-bold">
              <MdHome className="inline-block mb-1 w-7 h-7" />
              <span className="block text-xs">ホーム</span>
            </a>
          </Link>
          <Link href="/">
            <a className="w-full text-center py-2">
              <MdReceipt className="inline-block mb-1 w-7 h-7" />
              <span className="block text-xs">レシピを探す</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
