import Link from 'next/link';
import { MdReceipt, MdHome } from 'react-icons/md';
import { Button } from '@mantine/core';

export const NavPc = () => {
  return (
    <div className="hidden sticky top-0 w-64 h-screen md:block lg:w-72">
      <div className="flex flex-col p-4 h-full">
        <h1>
          <Link href="/">
            <a className="inline-flex items-center justify-center rounded-full border border-transparent focus-primary hover:text-green-500 focus:text-green-500 hover:bg-blue-50 focus:bg-blue-50 py-2.5 pr-6 pl-2.5 text-xl font-bold">
              COOKING APP
            </a>
          </Link>
        </h1>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center">
            <Link href="/">
              <a className="inline-flex items-center justify-center rounded-full border border-transparent focus-primary hover:text-green-500 focus:text-green-500 hover:bg-blue-50 focus:bg-blue-50 text-green-500 py-2.5 pr-6 pl-2.5">
                <MdHome size={30} />
                <span className="ml-5 text-xl font-bold">ホーム</span>
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/">
              <a className="inline-flex items-center justify-center rounded-full border border-transparent focus-primary hover:text-green-500 focus:text-green-500 hover:bg-blue-50 focus:bg-blue-50 py-2.5 pr-6 pl-2.5">
                <MdReceipt size={30} />
                <span className="ml-5 text-xl font-bold">レシピを探す</span>
              </a>
            </Link>
          </li>
        </ul>
        <Button color="green" radius="xl" size="md" className="mt-5">
          ログイン
        </Button>
        <Button
          variant="outline"
          color="green"
          radius="xl"
          size="md"
          className="mt-5"
        >
          アカウント登録
        </Button>
      </div>
    </div>
  );
};
