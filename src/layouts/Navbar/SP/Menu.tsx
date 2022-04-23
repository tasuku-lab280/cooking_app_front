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
    <Link href={href}>
      <a className={'w-full text-center py-2 font-bold ' + activeClass}>
        {icon}
        <span className="block text-xs">{title}</span>
      </a>
    </Link>
  );
};
