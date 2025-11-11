import React, { useState, useEffect } from "react";
// 1. Import dữ liệu từ file data.js
import { heroBannersData } from "../../data.js";

// Import icons
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

const HeroBanner = () => {
  // 2. Dùng useState để theo dõi slide đang được chọn
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Hàm xử lý cho nút "Next"
  const handleNext = () => {
    // Nếu ở slide cuối, quay về slide đầu (0). Nếu không, +1.
    const newIndex =
      currentIndex === heroBannersData.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // 4. Hàm xử lý cho nút "Previous"
  const handlePrev = () => {
    // Nếu ở slide đầu (0), quay về slide cuối. Nếu không, -1.
    const newIndex =
      currentIndex === 0 ? heroBannersData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // (Tùy chọn) Tự động chuyển slide sau 5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000); // 5000ms = 5 giây

    // Xóa timer khi component bị unmount hoặc currentIndex thay đổi
    return () => clearTimeout(timer);
  }, [currentIndex]); // Chạy lại effect khi currentIndex thay đổi

  return (
    <div
      className="
      w-full h-[473px] 
      relative 
      overflow-hidden 
      font-['Poppins',_sans-serif] 
      bg-black
    "
    >
      {/* 5. Dùng .map() để duyệt qua data và tạo các slide */}
      {heroBannersData.map((slide, index) => (
        <div
          key={slide.id}
          className={`
            absolute inset-0 
            transition-opacity duration-1000 ease-in-out // Hiệu ứng mờ (fade)
            ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            } // Chỉ hiện slide active
          `}
        >
          {/* --- NỘI DUNG CỦA 1 SLIDE --- */}

          {/* Ảnh nền */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Lớp phủ màu tối */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Nội dung chính (Text & Button) */}
          <div
            className="
            absolute inset-0 
            flex flex-col 
            justify-center items-center 
            text-center text-white 
            p-4
          "
          >
            <h1 className="text-5xl font-bold mb-4 max-w-2xl leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg mb-8 max-w-xl font-light">
              {slide.description}
            </p>
            <button
              className="
              bg-cyan-500 
              hover:bg-cyan-600 
              text-white 
              font-semibold 
              text-lg
              px-10 py-3 
              rounded-full 
              transition-colors 
              duration-300
            "
            >
              {slide.buttonText}
            </button>
          </div>

          {/* --- HẾT NỘI DUNG 1 SLIDE --- */}
        </div>
      ))}

      {/* 6. Các họa tiết trang trí (Giữ nguyên) */}
      {/* Góc trên bên trái */}
      <div className="absolute -top-20 -left-20 w-48 h-48 bg-orange-400 rounded-full opacity-80 z-20"></div>
      {/* Góc dưới bên phải */}
      <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-yellow-400/80 rounded-full z-20"></div>
      {/* Các ngôi sao */}
      <StarIcon className="absolute top-1/2 right-32 w-5 h-5 text-white/90 z-20" />
      <StarIcon className="absolute bottom-16 right-52 w-8 h-8 text-white/90 z-20" />

      {/* 7. Nút điều hướng (Bây giờ đã có logic onClick) */}
      <button
        onClick={handlePrev}
        className="
          absolute left-4 top-1/2 -translate-y-1/2 
          z-30 p-2 // z-30 để nằm trên cùng
          rounded-full 
          hover:bg-white/10 
          transition-colors
        "
      >
        <ChevronLeftIcon className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="
          absolute right-4 top-1/2 -translate-y-1/2 
          z-30 p-2 // z-30 để nằm trên cùng
          rounded-full 
          hover:bg-white/10 
          transition-colors
        "
      >
        <ChevronRightIcon className="w-8 h-8 text-white" />
      </button>
    </div>
  );
};

export default HeroBanner;
