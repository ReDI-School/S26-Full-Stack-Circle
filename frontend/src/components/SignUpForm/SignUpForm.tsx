import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { InputField } from '../InputField';
import type { FormData } from './SignUpForm.types';
import { InfoBox } from '../InfoBox';
import FieldError from '../FieldError/FieldError';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type SignUpFormProps = {
  isLoading: boolean;
  onSubmit: (data: FormData) => Promise<void> | void;
  fieldValues: FormData;
};

const initialFormData: FormData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const signUpSchema = z
  .object({
    firstname: z.string().min(1, 'First name is required.'),
    lastname: z.string().min(1, 'Last name is required.'),
    email: z.email('Invalid email address.'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/,
        'Password must contain uppercase, lowercase, and a number.'
      ),
    repeatPassword: z.string().min(1, 'Please repeat your password.'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match.',
    path: ['repeatPassword'],
  });

const SignUpForm = ({ isLoading, onSubmit, serverError, fieldValues }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: fieldValues ?? initialFormData,
  });

  const password = watch('password');

  const getErrorId = (field: string) => `${field}-error`;

  const handleSubmitForm = handleSubmit(
    async (data: FormData) => {
      await onSubmit(data);
      reset();
    },
    (errors) => {
      const firstErrorField = Object.keys(errors)[0] as keyof FormData;

      if (firstErrorField) {
        setFocus(firstErrorField);
      }
    }
  );

  return (
    <div className="flex flex-col gap-8 w-full px-16 py-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-center md:text-left text-[28px] font-normal leading-[48px] text-text-primary">
          Get started for free
        </h2>

        <p className="text-center md:text-left text-[18px] font-normal leading-[24px] text-text-tertiary">
          Enter your details below.
        </p>
      </header>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-6 w-full"
        noValidate
      >
        {serverError && <InfoBox variant="error" message={serverError}></InfoBox>}
        <div className="flex flex-col gap-4">
          <InputField
            label="First name"
            type="text"
            placeholder="John"
            disabled={isLoading}
            {...register('firstname')}
          />
          <FieldError id={getErrorId('firstname')} message={errors.firstname?.message} />

          <InputField
            label="Last name"
            type="text"
            placeholder="Doe"
            disabled={isLoading}
            {...register('lastname')}
          />
          <FieldError id={getErrorId('lastname')} message={errors.lastname?.message} />

          <InputField
            label="E-mail"
            type="email"
            placeholder="Enter your e-mail"
            disabled={isLoading}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            {...register('email')}
          />
          <FieldError id={getErrorId('email')} message={errors.email?.message} />

          <InputField
            label="Password"
            type="password"
            placeholder="********"
            disabled={isLoading}
            {...register('password')}
          />
          <FieldError id={getErrorId('password')} message={errors.password?.message} />

          <InputField
            label="Repeat password"
            type="password"
            placeholder="********"
            disabled={isLoading}
            {...register('repeatPassword')}
          />
          <FieldError id={getErrorId('repeatPassword')} message={errors.repeatPassword?.message} />
        </div>

        <div className="text-center md:text-left">
          <Button
            variant="primary"
            state={isLoading ? 'loading' : 'default'}
            type="submit"
            data-testid="submit-button"
            disabled={isLoading}
          >
            SIGN UP
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
