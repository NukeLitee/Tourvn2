import React, { useState } from "react";
import { chotkeoData } from "../../data.js";
// 1. Đổi import từ ChotKeoCard sang TourCard
import TourCard from "../common/TourCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const CARD_SLOT_WIDTH = 273 + 24;
const CARDS_PER_PAGE = 4;

function SectionChotKeo() {
  const [startIndex, setStartIndex] = useState(0);

  const totalItems = chotkeoData.length;
  const maxIndex = Math.max(0, totalItems - CARDS_PER_PAGE);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  return (
    <div className="container mx-auto w-[1160px] h-[440px] relative flex flex-col justify-center">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 pb-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideOffset}px)` }}
        >
          {chotkeoData.map((item) => (
            <div key={item.id} className="flex-shrink-0">
              {/* 2. SỬ DỤNG TOURCARD 
                  Quan trọng: TourCard nhận prop là 'tour', 
                  nên ta truyền item vào prop 'tour' 
              */}
              <TourCard tour={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Các nút điều hướng giữ nguyên */}
      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="
            absolute top-1/2 -translate-y-1/2 -left-14
            bg-white rounded-full p-2 shadow-lg z-10 
            hover:bg-gray-100 transition-colors
          "
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {startIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="
            absolute top-1/2 -translate-y-1/2 -right-14
            bg-white rounded-full p-2 shadow-lg z-10 
            hover:bg-gray-100 transition-colors
          "
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}
    </div>
  );
}

export default SectionChotKeo;
