import { RegisterInput } from '@/validators/schemas';
export interface SignUpFormProps {
  onSubmit: (data: Omit<RegisterInput, 'repeatPassword'>) => Promise<void> | void;
  isLoading?: boolean;
  fieldValues?: RegisterInput;
  serverError?: string;
}

