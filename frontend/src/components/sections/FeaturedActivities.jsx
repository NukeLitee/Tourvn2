import React, { useState } from "react";
// 1. Import component "khuôn" TourCard
import TourCard from "../common/TourCard";
// 2. Import data (giữ nguyên)
import { sampleToursData } from "../../data.js";

// 3. Import icon cho mũi tên (cần cài: npm install @heroicons/react)
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Kích thước của 1 card + 1 gap
// Card width (273px) + gap-6 (24px) = 297px
const CARD_SLOT_WIDTH = 273 + 24;
const CARDS_PER_PAGE = 4; // Hiển thị 4 card

function FeaturedActivities() {
  // 4. Lấy logic state và các hàm từ TourCardDiv
  const [startIndex, setStartIndex] = useState(0);

  const totalTours = sampleToursData.length;
  // Tính toán vị trí index tối đa có thể trượt tới
  const maxIndex = Math.max(0, totalTours - CARDS_PER_PAGE);

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Tính toán khoảng cách trượt
  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  return (
    // Container chính của section
    <div className="container mx-auto py-12 w-full max-w-[1160px]">
      {/* 1. Tiêu đề section */}
      <h2 className="text-3xl font-bold mb-6 font-['Poppins',_sans-serif]">
        Các hoạt động nổi bật
      </h2>

      {/* 2. Phần Slider (Lấy từ TourCardDiv) */}
      <div className="relative">
        {" "}
        {/* Thêm 'relative' để chứa các nút */}
        {/* "Viewport": Thêm 'overflow-hidden' */}
        <div className="overflow-hidden">
          {/* "Track": Div di chuyển bằng transform */}
          <div
            className="flex gap-6 pb-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${slideOffset}px)` }}
          >
            {sampleToursData.map((tour) => (
              <div key={tour.id} className="flex-shrink-0">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
        {/* Nút "Previous" */}
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="
              absolute top-1/2 -translate-y-1/2 -left-14
              bg-white rounded-full p-2 shadow-lg z-10 
              hover:bg-gray-100 transition-colors
            "
            style={{ top: "190px" }} // Căn giữa theo chiều dọc của card
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
        {/* Nút "Next" */}
        {startIndex < maxIndex && (
          <button
            onClick={handleNext}
            className="
              absolute top-1/2 -translate-y-1/2 -right-14
              bg-white rounded-full p-2 shadow-lg z-10 
              hover:bg-gray-100 transition-colors
            "
            style={{ top: "190px" }} // Căn giữa theo chiều dọc của card
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
      </div>

      {/* 3. Nút "Xem tất cả" (Giữ nguyên) */}
      <div className="flex justify-center mt-8">
        <button
          className="
          bg-cyan-500          
          hover:bg-cyan-600    
          text-white           
          font-semibold
          font-['Poppins',_sans-serif]
          text-lg
          w-[190px]
          h-[36px]            
          rounded-full         
          transition-colors
        "
        >
          Xem tất cả
        </button>
      </div>
    </div>
  );
}

export default FeaturedActivities;
