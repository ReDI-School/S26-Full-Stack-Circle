'use client';

import { SignUpForm } from '@components';
import { useState, useCallback } from 'react';
import { RegisterInput } from '@/validators/schemas';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const handleSubmit = useCallback(async (data: RegisterInput) => {
    setIsLoading(true);
    setServerError(undefined);
    try {
      console.log('Register:', data);
      // TODO: call POST /auth/register endpoint
    } catch {
      setServerError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} serverError={serverError} />
  );
};

export default SignUp;
