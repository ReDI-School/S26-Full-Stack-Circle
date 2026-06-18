import { LoginInput } from '@/validators/schemas';

export interface SignInFormProps {
  onSubmit: (data: LoginInput) => Promise<void>;
  isLoading?: boolean;
  serverError?: string;
}
