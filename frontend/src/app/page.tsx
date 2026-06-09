'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenStorage } from '../utils/tokenStorage';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(tokenStorage.get() ? '/events' : '/sign-in');
  }, [router]);

  return null;
};

export default Home;
