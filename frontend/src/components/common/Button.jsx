import React from "react";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  const baseStyle =
    "h-[48px] rounded-xl font-semibold transition-colors font-['Poppins',_sans-serif] flex items-center justify-center";

  const variants = {
    primary:
      "bg-[#0292D3] text-white border border-transparent hover:bg-[#0292D3]/90 disabled:opacity-50",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    outline:
      "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
