'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import logo from '../assets/images/logo.svg';
import Button from '../components/Button/Button';
import { useConfig } from '../hooks';

interface User {
  id: string;
  email: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const { config, loadingConfig } = useConfig();

  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (loadingConfig || loadingUsers) return;

      const response = await fetch(`${config?.apiUrl}/users`);
      const data = await response.json();
      setUsers(data.users);
      setLoadingUsers(false);
    };

    fetchUsers();
  }, [config, loadingConfig, loadingUsers]);

  return (
    <div className="flex flex-col gap-10">
      <Image src={logo} alt="Rediflix Logo" width={500} height={135} />
      <div>
        {loadingUsers ? (
          <div>Loading users...</div>
        ) : (
          <>
            {users.length > 0 ? (
              users.map((user) => <div key={user.id}>{user.email}</div>)
            ) : (
              <div>No users found</div>
            )}
          </>
        )}
      </div>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};

export default Home;
