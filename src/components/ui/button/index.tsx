import React from "react";
type PropsType = {
  variant?: string;
  color?: string;
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onSubmit?: () => void;
};

const CustomButton = (props: PropsType) => {
  const {
    variant = "filled",
    color,
    label,
    disabled,
    children,
    onSubmit,
  } = props;

  return (
    <button
      id="action-button"
      type={onSubmit ? "button" : "submit"}
      title={label as string}
      disabled={disabled}
      onClick={onSubmit}
      className={`w-full px-4 lg:px-8 py-1.5 flex items-center justify-center gap-2 border rounded-md tracking-wider capitalize font-medium hover:shadow-md hover:shadow-primary-${color} transition-all ease-in ${
        disabled ? "brightness-75" : "hover:brightness-95"
      } ${
        variant === "filled"
          ? `bg-primary-${color} text-white border-primary-${color}`
          : `text-primary-${color} border-primary-${color} bg-transparent bg-opacity-50`
      }`}
    >
      {children} <span>{label}</span>
    </button>
  );
};

export default CustomButton;
