'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { InfoBox } from '../InfoBox';
import type { SignInFormProps } from './SignInForm.types';
import { loginSchema } from '@/validators/schemas';
import type { LoginInput } from '@/validators/schemas';

export const SignInForm = ({ onSubmit, isLoading, serverError }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-6 w-full max-w-[400px]"
        noValidate
      >
        {serverError && <InfoBox variant="error" message={serverError}></InfoBox>}

        <div className="flex flex-col gap-4">
          <InputField
            label="E-mail"
            type="email"
            placeholder="Enter your e-mail"
            disabled={isLoading}
            error={errors.email?.message}
            {...register('email')}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="********"
            disabled={isLoading}
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        <div className="text-center lg:text-left">
          <Button variant="primary" state={isLoading ? 'loading' : 'default'} type="submit">
            SIGN IN
          </Button>
        </div>
      </form>
  );
};
