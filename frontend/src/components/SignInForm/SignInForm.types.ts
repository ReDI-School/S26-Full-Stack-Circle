export interface SignInFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  serverError?: string;
}
