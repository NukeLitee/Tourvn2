import React from "react";
function ExperienceCard({ item }) {
  if (!item) return null;

  return (
    <div
      className="
      w-[373px] h-[300px]
      rounded-2xl             
      overflow-hidden           
      relative                  
      flex shrink-0     
      font-['Poppins',sans-serif] 
    "
    >
      {/* 1. Ảnh nền (nằm ở lớp dưới cùng) */}
      <img
        src={item.image || "https://via.placeholder.com/373x300"}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="
        absolute inset-0
        shadow-[inset_100px_100px_200px_0px_#3B9ADD]
      "
      ></div>

      {/* 3. Lớp phủ tối nhẹ (giúp chữ dễ đọc hơn) */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* 4. Toàn bộ nội dung text (đặt trên các lớp phủ) */}
      <div className="absolute inset-0 p-6 flex flex-col text-white">
        {/* Phần text chính */}
        <div className="flex-grow">
          {" "}
          {/* Đẩy nút bấm xuống dưới */}
          <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
          <p className="text-sm opacity-90">{item.subtitle1}</p>
          <p className="text-sm opacity-90">{item.subtitle2}</p>
        </div>

        {/* 5. Nút bấm (nằm ở cuối) */}
        <button
          className="
          bg-white
          text-black
          font-semibold
          text-sm
          px-5 py-2
          rounded-full
          hover:bg-gray-100
          transition-colors
          self-start
        "
        >
          {item.buttonText}
        </button>
      </div>
    </div>
  );
}

export default ExperienceCard;
