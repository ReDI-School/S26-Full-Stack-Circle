'use client';

import { SignUpForm } from '@components';
import { useState } from 'react';
import { RegisterInput } from '@/validators/schemas';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const handleSubmit = async (data: Omit<RegisterInput, 'repeatPassword'>) => {
    setIsLoading(true);
    setServerError(undefined);
    try {
      console.log('Register:', data);

      // TODO: Call POST /users with data.
      // On success (201), redirect to /sign-in.
      // On non-ok response, parse the JSON body and call setServerError with the error message.
    } catch {
      setServerError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} serverError={serverError} />
  );
};

export default SignUp;
