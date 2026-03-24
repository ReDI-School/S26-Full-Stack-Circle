'use client';

import { useRouter } from 'next/navigation';

import Button from '../../components/Button/Button';

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-10">
      <h1>Sign In</h1>
      <Button onClick={handleSignIn}>Back to Home</Button>
    </div>
  );
};

export default SignIn;
