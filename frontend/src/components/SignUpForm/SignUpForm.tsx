import { useForm, FieldErrors } from 'react-hook-form';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { RegisterInput } from '@/validators/schemas';
import { InfoBox } from '../InfoBox';
import FieldError from '../FieldError/FieldError';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validators/schemas';
import type { SignUpFormProps } from './SignUpForm.types';

const initialFormData: RegisterInput = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const SignUpForm = ({
  isLoading = false,
  onSubmit,
  serverError,
  fieldValues = initialFormData,
}: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: fieldValues ?? initialFormData,
  });

  const getErrorId = (field: string) => `${field}-error`;

  const onValidSubmit = async (data: RegisterInput) => {
    await onSubmit(data);
    reset();
  };

  const onInvalidSubmit = (errors: FieldErrors<RegisterInput>) => {
    const firstErrorField = Object.keys(errors)[0] as keyof RegisterInput;

    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-md w-full">
      <header className="flex flex-col gap-2">
        <h2 className="text-center md:text-left text-[28px] font-normal leading-12 text-text-primary">
          Get started for free
        </h2>

        <p className="text-center md:text-left text-[18px] font-normal leading-6 text-text-tertiary">
          Enter your details below.
        </p>
      </header>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
        className="flex flex-col gap-6 w-full"
        noValidate
      >
        {serverError && <InfoBox variant="error" message={serverError}></InfoBox>}
        <div className="flex flex-col gap-4">
          <InputField
            required
            label="First name"
            type="text"
            placeholder=""
            disabled={isLoading}
            {...register('firstName')}
          />
          <FieldError id={getErrorId('firstName')} message={errors.firstName?.message} />

          <InputField
            required
            label="Last name"
            type="text"
            placeholder=""
            disabled={isLoading}
            {...register('lastName')}
          />
          <FieldError id={getErrorId('lastName')} message={errors.lastName?.message} />

          <InputField
            required
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
            required
            label="Password"
            type="password"
            placeholder="********"
            disabled={isLoading}
            {...register('password')}
          />
          <FieldError id={getErrorId('password')} message={errors.password?.message} />

          <InputField
            required
            label="Repeat password"
            type="password"
            placeholder="********"
            disabled={isLoading}
            {...register('repeatPassword')}
          />
          <FieldError id={getErrorId('repeatPassword')} message={errors.repeatPassword?.message} />
        </div>

        <div className="text-center lg:text-left">
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
