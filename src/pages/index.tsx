import type { NextPage } from 'next';
import { BaseLayout } from 'layouts/BaseLayout';

const Home: NextPage = () => {
  return <BaseLayout title="ホーム">Hello, World!</BaseLayout>;
};

export default Home;
