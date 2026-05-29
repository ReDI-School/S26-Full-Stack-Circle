export interface FormData {
  title: string;
  date: string;
  time: string;
  capacity: number;
  description: string;
}

export interface FormCardProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  serverError?: string;
}
