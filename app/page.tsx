import type { Metadata } from 'next';
import { Hero } from '@/components';

export const metadata: Metadata = {
  title: 'Home',
};

const Home = () => {
  return (
    <>
      <Hero />
    </>
  );
};

export default Home;
