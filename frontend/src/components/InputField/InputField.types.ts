interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state: string; // 'default' or 'error'
  label: string; // any passed
  error?: string; // any passed
  showPasswordToggle?: boolean;
}

export type { InputFieldProps };
