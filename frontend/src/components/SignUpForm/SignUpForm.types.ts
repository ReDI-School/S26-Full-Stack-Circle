import { RegisterInput } from '@/validators/schemas';
export interface SignUpFormProps {
  onSubmit: (data: RegisterInput) => Promise<void> | void;
  isLoading?: boolean;
  fieldValues?: RegisterInput;
  serverError?: string;
}

