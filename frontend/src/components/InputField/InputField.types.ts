/** Shared props for all InputField variants. */
type BaseProps = {
  /** Visible label text rendered above the field. E.g. `"Email"`, `"Description"`.
   * Also used as the `id`/`htmlFor` binding — must be unique per page. */
  label: string;
  /** Validation error message displayed below the field. Include the field name for screen reader clarity. E.g. `"Email is required."` */
  error?: string;
  /** Marks the field as required. */
  required?: boolean;
};

/** Props for rendering a standard `<input>` element. */
type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    /** Discriminator — omit or set to `'input'` to render an `<input>`. */
    as?: 'input';
    /** HTML input type. Accepted values: `'text' | 'password' | 'email' | 'textarea'` */
    type?: string;
  };

/** Props for rendering a `<textarea>` element. */
type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    /** Discriminator — must be `'textarea'` to render a `<textarea>`. */
    as: 'textarea';
  };

/** Internal layout component — not exported. Renders the label, children slot, and error message. */
type InputWrapperProps = BaseProps & {
  /** The input or textarea element rendered between the label and error message. */
  children: React.ReactNode;
};

export type { BaseProps, InputProps, TextareaProps, InputWrapperProps };
