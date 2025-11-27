import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import clsx from "clsx"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType;
  wrapClassName?: string
}

const Input: React.FC<InputProps> = ({ icon: Icon, className, wrapClassName, type, ...props }) => {
  const [showPassword, setShowPassword ] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  
  return (
    <div className={clsx("relative flex items-center gap-2", wrapClassName)}>
      {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2"/>}
      <input 
      {...props}
      type={inputType} 
      className={clsx("border-0 w-full outline-2 rounded focus:border-gray-400 focus:ring-4 focus:ring-green-950 focus:rounded py-3 pl-12 pr-5", className)} 
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide Password" : "Show Password"}
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
};

export default Input;
