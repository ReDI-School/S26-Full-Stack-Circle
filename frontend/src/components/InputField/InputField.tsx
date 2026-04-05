'use client';
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

  const errorId = error ? `${label}-error` : undefined;

  return (
    <div className={wrapper()}>
      <label htmlFor={label}>
        {label}
        {required && <span className={asterisk()}>*</span>}
      </label>
      <div className={inputContainer()}>
        {type === 'textarea' ? (
          <textarea
            id={label}
            required={required}
            className={input()}
            aria-describedby={errorId}
            {...rest}
          />
        ) : (
          <>
            <input
              id={label}
              required={required}
              type={isPassword ? textType : type}
              className={input()}
              aria-describedby={errorId}
              {...rest}
            />

            {type === 'password' && (
              <button
                type="button"
                title={passwordVisiblity ? 'Hide password' : 'Show password'}
                aria-label={passwordVisiblity ? 'Hide password' : 'Show password'}
                aria-pressed={passwordVisiblity}
                onClick={() => passwordToggle()}
                className={visibilityIcon()}
              >
                {passwordVisiblity ? (
                  <EyeIcon size={20} aria-hidden="true" focusable="false" />
                ) : (
                  <EyeSlashIcon size={20} aria-hidden="true" focusable="false" />
                )}
              </button>
            )}
          </>
        )}
      </div>

      {error && (
        <p id={errorId} className={errorText()} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
