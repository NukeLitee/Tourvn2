import React from "react";
import { Link } from "react-router-dom"; // 1. Import Link

function ExperienceCard({ item }) {
  if (!item) return null;

  return (
    // 2. Bọc bằng Link
    // - to: đường dẫn đến trang chi tiết
    // - state: truyền toàn bộ object 'item' sang trang kia
    <Link
      to={`/experience/${item.id}`}
      state={{ experienceData: item }} // Dữ liệu truyền đi nằm ở đây
      className="block flex-shrink-0" // block để không vỡ layout
    >
      <div
        className="
        w-[373px] h-[300px]
        rounded-2xl
        overflow-hidden
        relative
        font-['Poppins',_sans-serif]
        transition-transform duration-300 hover:scale-[1.02] // Thêm hiệu ứng hover nhẹ
      "
      >
        {/* Ảnh nền */}
        <img
          src={item.image || "https://via.placeholder.com/373x300"}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Lớp phủ Inner Shadow */}
        <div
          className="
          absolute inset-0
          shadow-[inset_100px_100px_200px_0px_#3B9ADD]
        "
        ></div>

        {/* Lớp phủ tối nhẹ */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Nội dung text */}
        <div className="absolute inset-0 p-6 flex flex-col text-white">
          <div className="flex-grow">
            <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm opacity-90">{item.subtitle1}</p>
            <p className="text-sm opacity-90">{item.subtitle2}</p>
          </div>

          <button
            className="
            bg-white text-black font-semibold text-sm
            px-5 py-2 rounded-full
            hover:bg-gray-100 transition-colors self-start
          "
          >
            {item.buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ExperienceCard;
