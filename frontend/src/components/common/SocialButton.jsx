import React from "react";

function SocialButton({ icon: Icon, label, iconColor = "", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        relative flex items-center justify-center w-full h-[48px] 
        rounded-xl bg-white border border-gray-300 
        font-medium text-gray-700 font-['Poppins',_sans-serif]
        hover:bg-gray-50 transition-colors
      "
    >
      <Icon className={`w-6 h-6 absolute left-5 ${iconColor}`} />
      <span>{label}</span>
    </button>
  );
}

export default SocialButton;
