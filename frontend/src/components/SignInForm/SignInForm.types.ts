import { LoginInput } from "@/validators/schemas";

export interface SignInFormProps {
  onSubmit: (data: LoginInput) => void;
  isLoading?: boolean;
  serverError?: string;
}
