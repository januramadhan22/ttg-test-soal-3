import React, { FormEvent } from "react";
type PropsType = {
  size?: string;
  round?: string;
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  isRequired?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: any;
  handleChangeForm?: (event: FormEvent<HTMLFormElement>) => void;
};

const CustomForm = (props: PropsType) => {
  const {
    size = "sm",
    round = "full",
    label,
    type,
    name,
    placeholder,
    isRequired = false,
    leftIcon,
    rightIcon,
    value,
    handleChangeForm,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-primary-red font-medium">
        {label}
        {isRequired && <span className="text-primary-red font-medium">*</span>}
      </label>
      <div
        id={name}
        className={`pl-4 flex items-center rounded-${round} border border-primary-red focus-within:bg-white focus-within:bg-opacity-50 focus-within:backdrop-blur-sm`}
      >
        {leftIcon}
        <input
          type={type}
          name={name}
          aria-labelledby={name}
          placeholder={placeholder}
          required={isRequired}
          value={value}
          onChange={(e: any) => handleChangeForm && handleChangeForm(e)}
          className={`w-full py-2 pr-4 text-${size} text-primary-red placeholder:text-${size} focus:outline-none bg-transparent`}
        />
        {rightIcon}
      </div>
    </div>
  );
};

export default CustomForm;
