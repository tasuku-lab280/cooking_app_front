import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

export const Menu = ({ href, title, icon }: Props) => {
  const router = useRouter();
  const activeClass = router.pathname.startsWith(href) ? 'text-green-500' : '';

  return (
    <li className="flex items-center">
      <Link href="/">
        <a
          className={
            'inline-flex items-center justify-center rounded-full border border-transparent focus-primary hover:text-green-500 focus:text-green-500 hover:bg-blue-50 focus:bg-blue-50 py-2.5 pr-6 pl-2.5 ' +
            activeClass
          }
        >
          {icon}
          <span className="ml-5 text-xl font-bold">{title}</span>
        </a>
      </Link>
    </li>
  );
};
