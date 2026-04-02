import type { InputFieldProps } from './InputField.types';
import { inputFieldStyles } from './InputField.styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
  const { wrapper, input, errorText, asterisk, faEye } = inputFieldStyles({ hasError: !!error });

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
      <input
        id={label}
        required={required}
        type={isPassword ? textType : type}
        className={input()}
        {...rest}
      />

      {type === 'password' && (
        <span onClick={() => passwordToggle()} className={faEye()}>
          {passwordVisiblity ? <FaEye /> : <FaEyeSlash />}
        </span>
      )}

      {error && <p className={errorText()}>{error}</p>}
    </div>
  );
};

export default InputField;
