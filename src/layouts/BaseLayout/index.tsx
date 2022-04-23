import { Navbar } from 'layouts/Navbar';

type Props = {
  children: React.ReactNode;
  title: string;
};

export const BaseLayout = (props: Props) => {
  const { children, title } = props;

  return (
    <div className="min-h-screen">
      <div className="md:flex md:flex-1">
        <Navbar />
        <main className="flex-1 md:border-l md:border-r md:border-gray-200 pb-40">
          <div className="flex items-center font-bold text-lg bg-white h-12 px-4 border-b">
            <h2 className="break-all line-clamp-1">{title}</h2>
          </div>
          <div className="p-5">{children}</div>
        </main>
      </div>
    </div>
  );
};
