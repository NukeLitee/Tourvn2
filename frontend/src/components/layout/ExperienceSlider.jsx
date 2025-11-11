// /frontend/src/components/sections/ExperienceSlider.jsx

import React, { useState } from "react";
import { experienceData } from "../../data.js"; // Import data
import ExperienceCard from "../common/ExperienceCard"; // Import "khuôn"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// 1 Card (373px) + 1 Gap (gap-6 = 24px) = 397px
const CARD_SLOT_WIDTH = 373 + 24;
const CARDS_PER_PAGE = 3; // 3 cards hiển thị

function ExperienceSlider() {
  const [startIndex, setStartIndex] = useState(0);
  const totalItems = experienceData.length;
  const maxIndex = Math.max(0, totalItems - CARDS_PER_PAGE);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  return (
    // Dùng max-w-[1160px] giống slider trước để đồng bộ
    <div className="w-full max-w-[1160px] mx-auto py-8 relative font-['Poppins',_sans-serif]">
      <h2 className="text-3xl font-bold mb-6">Trải nghiệm cho mọi người</h2>

      {/* Viewport: Ẩn các card bị tràn */}
      <div className="overflow-hidden">
        {/* Track: Div di chuyển */}
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideOffset}px)` }}
        >
          {experienceData.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Nút điều hướng (Nằm ngoài cùng 2 bên) */}
      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 -left-14 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {startIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 -right-14 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}
    </div>
  );
}

export default ExperienceSlider;