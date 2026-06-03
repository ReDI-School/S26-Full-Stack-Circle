'use client';
import { useRouter } from 'next/navigation';

import { SignInForm } from '@components';
import useAuth from '@hooks/useAuth';
import { LoginInput } from '@validators/schemas';

export default function LoginPage() {
  const { signIn, loading, error } = useAuth();
  const router = useRouter();

  const handleSignIn = async (data: LoginInput) => {
    const loggedIn = await signIn(data);

    if (loggedIn) {
      console.log('Login successful, redirecting to /events');
      router.push('/events');
    }
  };

  return <SignInForm onSubmit={handleSignIn} isLoading={loading} serverError={error} />;
}
