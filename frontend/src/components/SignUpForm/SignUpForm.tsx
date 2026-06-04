import { useForm, FieldErrors } from 'react-hook-form';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { RegisterInput } from '@/validators/schemas';
import { InfoBox } from '../InfoBox';
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

  const onValidSubmit = async ({ firstName, lastName, email, password }: RegisterInput) => {
    await onSubmit({ firstName, lastName, email, password });
    reset();
  };

  const onInvalidSubmit = (errors: FieldErrors<RegisterInput>) => {
    const firstErrorField = Object.keys(errors)[0] as keyof RegisterInput;

    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      className="flex flex-col gap-6 w-full"
      noValidate
    >
      {serverError && <InfoBox variant="error" message={serverError} />}
      <div className="flex flex-col gap-4">
        <InputField
          required
          label="First Name"
          type="text"
          placeholder=""
          disabled={isLoading}
          error={errors.firstName?.message}
          {...register('firstName')}
        />

        <InputField
          required
          label="Last Name"
          type="text"
          placeholder=""
          disabled={isLoading}
          error={errors.lastName?.message}
          {...register('lastName')}
        />

        <InputField
          required
          label="E-mail"
          type="email"
          placeholder="Enter your e-mail"
          disabled={isLoading}
          error={errors.email?.message}
          {...register('email')}
        />

        <InputField
          required
          label="Password"
          type="password"
          placeholder="********"
          disabled={isLoading}
          error={errors.password?.message}
          {...register('password')}
        />

        <InputField
          required
          label="Repeat Password"
          type="password"
          placeholder="********"
          disabled={isLoading}
          error={errors.repeatPassword?.message}
          {...register('repeatPassword')}
        />
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
  );
};

export default SignUpForm;
