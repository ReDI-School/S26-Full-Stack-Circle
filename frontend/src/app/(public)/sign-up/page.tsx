'use client';

import { SignUpForm } from '@components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerRequest } from '@services/authService';
import { RegisterInput } from '@/validators/schemas';
import useAuth from '@hooks/useAuth';

const SignUp = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const handleSubmit = async (data: Omit<RegisterInput, 'repeatPassword'>) => {
    try {
      setIsLoading(true);
      setServerError(undefined);
      await registerRequest(data);
      // After successful registration, log the user in and redirect to /events
      // await loginRequest(data.email, data.password);
      const loggedIn = await signIn({ email: data.email, password: data.password });
      if (loggedIn) router.push('/events');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} serverError={serverError} />;
};

export default SignUp;
