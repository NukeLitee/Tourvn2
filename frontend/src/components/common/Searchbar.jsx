import React from "react";
// Import icon từ react-icons (Bootstrap Search)
import { BsSearch } from "react-icons/bs";

// Reverted SearchBar: icon absolutely positioned inside input on the right
function SearchBar({ className = "w-[300px]" }) {
  return (
    <div className={`relative h-[40px] ${className}`}>
      <input
        type="text"
        aria-label="Tìm kiếm"
        placeholder="Tìm kiếm..."
        className="w-full h-full pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none bg-white"
      />

      {/* Icon nằm trong input, bên phải */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-auto">
        <BsSearch className="w-5 h-5" />
      </div>
    </div>
  );
}

export default SearchBar;
