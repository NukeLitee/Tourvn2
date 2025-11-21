import React, { useState } from "react";
import { promotionData } from "../../data.js";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; // 1. Import Link

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
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Ưu đãi cho bạn</h2>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${slideOffset}px)` }}
          >
            {promotionData.map((promo) => (
              <div
                key={promo.id}
                className="flex-shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                {/* 2. Bọc nội dung bằng Link */}
                <Link
                  to="/voucher"
                  state={{ promoData: promo }} // Truyền dữ liệu sang trang Voucher
                  className="block w-full h-[170px] rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:opacity-95 transition-opacity"
                >
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

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
    </div>
  );
}

export default Promotions;
