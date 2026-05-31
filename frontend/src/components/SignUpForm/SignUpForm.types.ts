export interface SignUpFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  serverError?: string;
}

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;
