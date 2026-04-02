interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // any passed
  error?: string; // any passed
  showPasswordToggle?: boolean;
}

export type { InputFieldProps };
