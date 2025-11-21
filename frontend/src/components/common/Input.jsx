import React from "react";

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <div
      className={`w-full h-[48px] rounded-xl bg-white border border-gray-300 px-4 flex items-center ${className}`}
    >
      <input
        type={type}
        className="w-full h-full outline-none bg-transparent text-gray-800 placeholder-gray-400 font-['Poppins',_sans-serif]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default Input;
