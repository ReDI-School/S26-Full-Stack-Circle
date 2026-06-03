'use client';

import { SignUpForm } from '@components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerRequest } from '@service/authService';
import { RegisterInput } from '@/validators/schemas';

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const handleSubmit = async (data: Omit<RegisterInput, 'repeatPassword'>) => {
    try {
      setIsLoading(true);
      setServerError(undefined);

      const registerData = await registerRequest(data);
      console.log('Registration successful:', registerData);
      // login the user in or redirect to login page
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
