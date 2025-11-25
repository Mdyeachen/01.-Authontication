import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...props }) => {
  const [showPassword, setShowPassword ] = useState(false);
  const inputType = props.type === "password" ? (showPassword ? "text" : "password") : props.type;
  return (
    <div className="relative flex items-center gap-2">
      {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2"/>}
      <input {...props} className="border-0 w-full outline-2 rounded focus:border-gray-400 focus:ring-4 focus:ring-green-950 focus:rounded py-3 pl-12 pr-5" type={inputType} />
      {inputType === "password" && (
        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2">{!showPassword ? <FaEyeSlash /> : <FaEye/>}</button>     
      )}
    </div>
  );
};

export default Input;
