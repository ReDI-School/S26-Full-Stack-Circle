type BaseProps = {
  label: string;
  error?: string;
  required?: boolean;
};

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    as?: 'input';
    type?: string;
  };

type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: 'textarea';
  };

type InputWrapperProps = BaseProps & {
  children: React.ReactNode;
};

export type { BaseProps, InputProps, TextareaProps, InputWrapperProps };
