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
    <div className="flex flex-col gap-8 max-w-md w-full">
      <hgroup className="flex flex-col gap-1 text-center lg:text-left">
        <h2 className="text-3xl leading-12 text-text-primary font-normal">Get started for free</h2>
        <p className="text-lg leading-6 text-text-tertiary">Enter your details below.</p>
      </hgroup>

      <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} serverError={serverError} />
    </div>
  );
};

export default SignUp;
