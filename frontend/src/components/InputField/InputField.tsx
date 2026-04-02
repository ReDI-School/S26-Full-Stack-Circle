import type { InputFieldProps } from './InputField.types';
import {} from './InputField.styles';
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
    const isPassword = type === "password"

    const passwordToggle = () => {
      setPasswordVisiblity(!passwordVisiblity)
      setTextType(textType === "password" ? "text" : "password")
    }
    
  return (
    <div className="flex flex-col gap-2.5 text-input-label relative">
      <label htmlFor={label}>
        {label}
        {required && <span className="text-input-error text-lg">*</span>}
      </label>
      <input
        id={label}
        required={required}
        type={isPassword ? textType : type}
        {...rest}
        className={`${error ? "border-input-warning" : ""}  border rounded-base p-5 placeholder:text-input-placeholder`}
      />
      {error && <p className="text-input-error text-xs">{error}</p>}
      {type === 'password' && (<span onClick={()=>passwordToggle()} className="absolute bottom-6 right-4">{passwordVisiblity? <FaEye/> : <FaEyeSlash/>}</span>)}
    </div>
  );
};

export default InputField;
