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
const CARDS_PER_PAGE = 4; // Chúng ta muốn hiển thị 4 card

function TourCardDiv() {
  // 4. Dùng useState để theo dõi vị trí slider
  const [startIndex, setStartIndex] = useState(0);

  const totalTours = sampleToursData.length;
  // Tính toán vị trí index tối đa có thể trượt tới
  const maxIndex = Math.max(0, totalTours - CARDS_PER_PAGE);

  // 5. Hàm xử lý "Next"
  const handleNext = () => {
    // Trượt 1 card mỗi lần (để giống hình mẫu)
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  // 6. Hàm xử lý "Previous"
  const handlePrev = () => {
    // Trượt 1 card mỗi lần
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // 7. Tính toán khoảng cách trượt (transform)
  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  return (
    // 8. Thêm "relative" vào container chính để chứa các nút mũi tên
    <div className="container mx-auto w-[1160px] h-[440px] relative">
      <h2 className="text-3xl font-bold">
        Vui chơi & Trải nghiệm hàng đầu ở Thành phố Hồ Chí Minh
      </h2>

      {/* 9. "Viewport": Thêm 'overflow-hidden' ĐỂ ẨN card thứ 5 */}
      <div className="overflow-hidden mt-[20px]">
        {/* 10. "Track": Đây là div sẽ di chuyển
             - Bỏ 'overflow-x-auto'
             - Thêm 'transition-transform' để tạo hiệu ứng mượt
             - Thêm style 'transform'
             - Quan trọng: Đảm bảo KHÔNG có 'flex-wrap'
        */}
        <div
          className="flex gap-6 pb-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideOffset}px)` }}
        >
          {sampleToursData.map((tour) => (
            // Thêm 'flex-shrink-0' để card không bị "bóp méo"
            <div key={tour.id} className="flex-shrink-0">
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      </div>

      {/* 11. Nút "Previous" (Chỉ hiển thị khi startIndex > 0) */}
      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="
            absolute top-1/2 -translate-y-1/2 -left-14 // Đặt bên ngoài
            bg-white rounded-full p-2 shadow-lg z-10 
            hover:bg-gray-100 transition-colors
          "
          style={{ top: "260px" }} // Căn giữa
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {/* 12. Nút "Next" (Chỉ hiển thị khi chưa trượt đến cuối) */}
      {startIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="
            absolute top-1/2 -translate-y-1/2 -right-14 // Đặt bên ngoài
            bg-white rounded-full p-2 shadow-lg z-10 
            hover:bg-gray-100 transition-colors
          "
          style={{ top: "260px" }} // Căn giữa
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}
    </div>
  );
}

export default TourCardDiv;
