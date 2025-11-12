import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonRoute({
  label,
  path,
  bg = "#E6E4E0",
  textColor = "black",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-[25px] py-[6px] rounded-full cursor-pointer transition`}
      style={{
        backgroundColor: bg,
        color: textColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#04EEF6";
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bg;
        e.currentTarget.style.color = textColor;
      }}
    >
      {label}
    </button>
  );
}
