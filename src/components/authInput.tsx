// components/AuthInput.tsx
import { Input } from "./ui/input";
import React from "react";

interface AuthInputProps {
  placeholder: string;
  className?: string;
  type?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  type,
  placeholder,
  ...props
}) => {
  const baseClasses =
    "bg-gray-100 border-none focus-visible:border-gray-400 focus-visible:border-solid py-6 text-gray-600";

  return (
    <Input
      placeholder={placeholder}
      type={type}
      className={`${baseClasses}`}
      {...props}
    />
  );
};

export default AuthInput;
