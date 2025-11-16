import React, { useState } from "react";
import { promotionData } from "../../data.js";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// TÍNH TOÁN KÍCH THƯỚC
// Container: 1160px
// Gap: 24px (gap-6)
// Số lượng hiển thị: 3 hình
// => Chiều rộng 1 hình = (1160 - 2 * 24) / 3 ≈ 370px
const CARD_WIDTH = 370;
const GAP = 24;
const CARD_SLOT_WIDTH = CARD_WIDTH + GAP;
const ITEMS_PER_PAGE = 3;

function Promotions() {
  const [startIndex, setStartIndex] = useState(0);

  const totalItems = promotionData.length;
  const maxIndex = Math.max(0, totalItems - ITEMS_PER_PAGE);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  return (
    <div className="container mx-auto w-full max-w-[1160px] py-12 font-['Poppins',_sans-serif]">
      {/* Tiêu đề Section */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Ưu đãi cho bạn</h2>

      {/* Bọc Slider và Nút trong div relative để căn chỉnh vị trí nút chuẩn xác */}
      <div className="relative">
        {/* Slider Viewport */}
        <div className="overflow-hidden">
          {/* Track */}
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${slideOffset}px)` }}
          >
            {promotionData.map((promo) => (
              <div
                key={promo.id}
                className="flex-shrink-0 cursor-pointer hover:opacity-95 transition-opacity"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <div className="w-full h-[170px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút Previous */}
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="
              absolute top-1/2 -translate-y-1/2 -left-14
              bg-white rounded-full p-2 shadow-lg z-10 
              hover:bg-gray-50 border border-gray-100
              transition-all
            "
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}

        {/* Nút Next */}
        {startIndex < maxIndex && (
          <button
            onClick={handleNext}
            className="
              absolute top-1/2 -translate-y-1/2 -right-14
              bg-white rounded-full p-2 shadow-lg z-10 
              hover:bg-gray-50 border border-gray-100
              transition-all
            "
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Promotions;
