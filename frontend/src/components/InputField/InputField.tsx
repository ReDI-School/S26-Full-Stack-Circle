import type { InputFieldProps } from './InputField.types';
import {} from './InputField.styles';

const InputField = ({
  label,
  error,
  required,
  showPasswordToggle = false,
  ...rest // type, placeholder, value, onChange, onBlur...
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2.5 text-input-label">
      <label htmlFor={label}>
        {label}
        {required && <span className="text-input-error text-lg">*</span>}
      </label>
      <input
        id={label}
        required={required}
        {...rest}
        className={`${error ? "border-input-warning" : ""}  border rounded-base p-5 placeholder:text-input-placeholder`}
      />
      {error && <p className="text-input-error text-xs">{error}</p>}
    </div>
  );
};

export default InputField;
