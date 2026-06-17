export interface FormData {
  title: string;
  date: string;
  time: string;
  capacity: number;
  description: string;
}

export interface CreateEventFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  serverError?: string;
}
