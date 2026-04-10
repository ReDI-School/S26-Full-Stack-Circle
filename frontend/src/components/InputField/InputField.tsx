'use client';

import type { BaseProps, InputProps, TextareaProps, InputWrapperProps } from './InputField.types';
import { inputFieldStyles } from './InputField.styles';
import { EyeSlashIcon, EyeIcon } from '@phosphor-icons/react';
import { useState, forwardRef } from 'react';

const InputWrapper = ({ label, required, error, children }: InputWrapperProps) => {
  const errorId = error ? `${label}-error` : undefined;

  const { wrapper, asterisk, errorText } = inputFieldStyles({
    hasError: !!error,
  });

  return (
    <div className={wrapper()}>
      <label htmlFor={label}>
        {label}
        {required && <span className={asterisk()}>*</span>}
      </label>

      {children}

      {error && (
        <p id={errorId} className={errorText()} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps | TextareaProps>(
  (props, ref) => {
    const { error, label } = props;

    const rawType = (props as InputProps).type;
    const as = props.as ?? (rawType === 'textarea' ? 'textarea' : 'input');

    const type = as === 'input' ? (rawType ?? 'text') : undefined;
    const isPassword = as === 'input' && type === 'password';

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const textType = passwordVisibility ? 'text' : type;

    const passwordToggle = () => {
      setPasswordVisibility((prev) => !prev);
    };

    const { inputContainer, input, visibilityIcon } = inputFieldStyles({
      hasError: !!error,
    });

    const errorId = error ? `${label}-error` : undefined;

    const renderField = () => {
      if (as === 'textarea') {
        return (
          <textarea
            id={label}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={input()}
            aria-describedby={errorId}
            {...(props as TextareaProps)}
          />
        );
      }

      return (
        <>
          <input
            id={label}
            ref={ref as React.Ref<HTMLInputElement>}
            {...(props as InputProps)}
            className={input()}
            aria-describedby={errorId}
            type={isPassword ? textType : type}
          />

          {isPassword && (
            <button
              title={passwordVisibility ? 'Hide password' : 'Show password'}
              type="button"
              aria-label={passwordVisibility ? 'Hide password' : 'Show password'}
              aria-pressed={passwordVisibility}
              onClick={passwordToggle}
              className={visibilityIcon()}
            >
              {passwordVisibility ? (
                <EyeIcon size={20} aria-hidden="true" focusable="false" />
              ) : (
                <EyeSlashIcon size={20} aria-hidden="true" focusable="false" />
              )}
            </button>
          )}
        </>
      );
    };

    return (
      <InputWrapper {...(props as BaseProps)}>
        <div className={inputContainer()}>{renderField()}</div>
      </InputWrapper>
    );
  }
);
InputField.displayName = 'InputField';

export default InputField;
