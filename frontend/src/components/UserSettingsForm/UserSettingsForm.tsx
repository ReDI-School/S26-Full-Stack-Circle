import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema, UpdateUserInput } from '@/validators/schemas';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { InfoBox } from '../InfoBox';
import type { UserSettingsFormProps } from './UserSettingsForm.types';

const UserSettingsForm = ({ onSubmit, isLoading, serverError, successMessage, defaultValues }: UserSettingsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { firstName: defaultValues?.firstName ?? '', lastName: defaultValues?.lastName ?? '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full" noValidate>
      {serverError && <InfoBox variant="error" message={serverError} />}
      {successMessage && <InfoBox variant="success" message={successMessage} />}

      <div className="flex flex-col gap-4">
        <InputField
          label="First name"
          type="text"
          placeholder="Enter your first name"
          disabled={isLoading}
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <InputField
          label="Last name"
          type="text"
          placeholder="Enter your last name"
          disabled={isLoading}
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <hr className="border-gray-200" />

      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-secondary">Leave blank to keep your current password.</p>
        <InputField
          label="New password"
          type="password"
          placeholder="Enter new password"
          disabled={isLoading}
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />
        <InputField
          label="Confirm password"
          type="password"
          placeholder="Confirm new password"
          disabled={isLoading}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      <Button variant="primary" state={isLoading ? 'loading' : 'default'} type="submit">
        SAVE CHANGES
      </Button>
    </form>
  );
};

export default UserSettingsForm;
