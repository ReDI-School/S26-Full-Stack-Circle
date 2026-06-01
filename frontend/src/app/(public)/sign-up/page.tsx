'use client';

import { SignUpForm } from '@components';
import { useState, useCallback } from 'react';
import type { FormData } from '@components/SignUpForm/SignUpForm.types';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const handleSubmit = useCallback(async (data: FormData) => {
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
    // <div className="relative size-full flex-1 flex flex-col-reverse md:flex-col gap-8 items-center justify-center">
    //   <div className="md:absolute top-0 right-0 :w-full flex gap-2 text-text-tertiary items-center justify-center md:justify-end">
    //     Already have account?{' '}
    //     <Link
    //       href="/sign-in"
    //       className="text-primary hover:text-primary-dark underline underline-offset-3 transition-colors"
    //     >
    //       SIGN IN
    //     </Link>
    //   </div>

    // </div>
    <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} serverError={serverError} />
  );
};

export default SignUp;
