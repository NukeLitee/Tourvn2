import React, { useState, useEffect } from "react";
// 1. Import component "khuôn" TourCard
import TourCard from "../common/TourCard";

// 2. Import icon cho mũi tên
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// URL API lấy danh sách tour
const API_URL = "http://localhost:5000/api/tours";

// Kích thước của 1 card + 1 gap
// Card width (273px) + gap-6 (24px) = 297px
const CARD_SLOT_WIDTH = 273 + 24;
const CARDS_PER_PAGE = 4; // Chúng ta muốn hiển thị 4 card

function TourCardDiv() {
  // 4. Dùng useState để theo dõi vị trí slider
  const [startIndex, setStartIndex] = useState(0);

  // State cho dữ liệu API
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
        const data = await response.json();

        // Lọc chỉ lấy những item có category là 'tour'
        const tourItems = data.filter((item) => item.category === "tour");
        setTours(tourItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const totalTours = tours.length;
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

  if (loading)
    return (
      <div className="container mx-auto w-[1160px] h-[440px] flex justify-center items-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto w-[1160px] h-[440px] flex justify-center items-center">
        <p className="text-red-500">Lỗi: {error}</p>
      </div>
    );

  return (
    // 8. Thêm "relative" vào container chính để chứa các nút mũi tên
    <div className="container mx-auto w-[1160px] h-[440px] relative">
      <h2 className="text-3xl font-bold mb-6 font-['Poppins',_sans-serif]">
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
          {tours.map((tour) => (
            // Thêm 'flex-shrink-0' để card không bị "bóp méo"
            // Dùng _id từ MongoDB làm key
            <div key={tour._id} className="flex-shrink-0">
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
            absolute top-1/2 -translate-y-1/2 -left-14 
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
            absolute top-1/2 -translate-y-1/2 -right-14 
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
