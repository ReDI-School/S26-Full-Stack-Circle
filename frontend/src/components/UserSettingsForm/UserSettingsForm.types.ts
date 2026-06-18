import { UpdateUserInput } from '@/validators/schemas';

export interface UserSettingsFormProps {
  onSubmit: (data: UpdateUserInput) => Promise<unknown> | void;
  isLoading?: boolean;
  serverError?: string;
  successMessage?: string;
  defaultValues?: { firstName?: string; lastName?: string };
}
