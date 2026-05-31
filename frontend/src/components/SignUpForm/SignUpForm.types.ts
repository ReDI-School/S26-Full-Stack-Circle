export interface SignUpFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  fieldValues?: FormData;
  formErrors?: FormErrors;
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
