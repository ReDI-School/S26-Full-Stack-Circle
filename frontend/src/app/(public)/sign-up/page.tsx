'use client';

import { SignUpForm } from '@components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerRequest, loginRequest } from '@service/authService';
import { RegisterInput } from '@/validators/schemas';

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const handleSubmit = async (data: Omit<RegisterInput, 'repeatPassword'>) => {
    try {
      setIsLoading(true);
      setServerError(undefined);
      await registerRequest(data);
      // After successful registration, log the user in and redirect to /events
      await loginRequest(data.email, data.password);
      router.push('/events');
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
