'use client';

import { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { InfoBox } from '../../components/InfoBox';
import type { SignInFormProps } from './SignInForm.types';

export const SignInForm = ({ onSubmit, isLoading, serverError }: SignInFormProps) => {
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    if (!email) return 'This field is mandatory';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format.';
    return undefined;
  };

  const handleValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const emailError = validateEmail(email);
    const passwordError = !password ? 'This field is mandatory' : undefined;

    if (emailError || passwordError) {
      setFieldErrors({ email: emailError, password: passwordError });
      return;
    }

    onSubmit({ email, password });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <header className="flex flex-col gap-2">
        <h2 className="text-center md:text-left text-[28px] font-normal leading-[48px] text-text-primary">
          Sign in to ReDi Events
        </h2>
        <p className="text-center md:text-left text-[18px] font-normal leading-[24px] text-text-secondary">
          Enter your details below.
        </p>
      </header>
      <form onSubmit={handleValidation} className="flex flex-col gap-6 w-full" noValidate>
        {serverError && <InfoBox variant="error" message={serverError}></InfoBox>}

        <div className="flex flex-col gap-4">
          <InputField
            label="E-mail"
            type="email"
            name="email"
            placeholder="Enter your e-mail"
            disabled={isLoading}
            error={fieldErrors.email}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            disabled={isLoading}
            error={fieldErrors.password}
          />
        </div>
        <div className="text-center md:text-left">
          <Button variant="primary" state={isLoading ? 'loading' : 'default'} type="submit">
            SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};
