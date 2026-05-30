'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { InfoBox } from '../InfoBox';
import type { SignInFormProps } from './SignInForm.types';
import { LoginInput, loginSchema } from '@validators/schemas';

// const signInSchema = z.object({
//   email: z.email({ error: 'Invalid email format.' }).min(1, 'This field is mandatory'),
//   password: z.string().min(1, 'This field is mandatory'),
// });

// type SignInForlgata = z.infer<typeof signInSchema>;

export const SignInForm = ({ onSubmit, isLoading, serverError }: SignInFormProps) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<SignInForlgata>({
  //   resolver: zodResolver(signInSchema),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <header className="flex flex-col gap-2 max-w-[400px] w-full">
        <h2 className="text-center lg:text-left text-[28px] font-normal leading-[48px] text-text-primary">
          Sign in to ReDi Events
        </h2>
        <p className="text-center lg:text-left text-[18px] font-normal leading-[24px] text-text-secondary">
          Enter your details below.
        </p>
      </header>
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
    </div>
  );
};
