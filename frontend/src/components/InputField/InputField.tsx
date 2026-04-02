import type { InputFieldProps } from './InputField.types';
import { inputFieldStyles } from './InputField.styles';
import { EyeSlashIcon, EyeIcon } from '@phosphor-icons/react';
import { useState } from 'react';

const InputField = ({
  label,
  error,
  required,
  type,
  ...rest // placeholder, value, onChange, onBlur...
}: InputFieldProps) => {
  const [passwordVisiblity, setPasswordVisiblity] = useState(false);
  const [textType, setTextType] = useState(type);
  const isPassword = type === 'password';

  // retrieving individual component styles
  const { wrapper, inputContainer, input, errorText, asterisk, visibilityIcon } = inputFieldStyles({
    hasError: !!error,
  });

  const passwordToggle = () => {
    setPasswordVisiblity(!passwordVisiblity);
    setTextType(textType === 'password' ? 'text' : 'password');
  };

  return (
    <div className={wrapper()}>
      <label htmlFor={label}>
        {label}
        {required && <span className={asterisk()}>*</span>}
      </label>
      <div className={inputContainer()}>
        {type === 'textarea' ? (
          <textarea id={label} required={required} className={input()} {...rest} />
        ) : (
          <>
            <input
              id={label}
              required={required}
              type={isPassword ? textType : type}
              className={input()}
              {...rest}
            />

            {type === 'password' && (
              <button
                type="button"
                aria-label={passwordVisiblity ? 'Hide password' : 'Show password'}
                aria-pressed={passwordVisiblity}
                onClick={() => passwordToggle()}
                className={visibilityIcon()}
              >
                {passwordVisiblity ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
              </button>
            )}
          </>
        )}
      </div>

      {error && <p className={errorText()}>{error}</p>}
    </div>
  );
};

export default InputField;
