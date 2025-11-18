import React, { useState, useEffect } from "react";
import TourCard from "../common/TourCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const CARD_SLOT_WIDTH = 273 + 24;
const CARDS_PER_PAGE = 4;

// Định nghĩa URL của API backend
// Bạn có thể đổi thành /api/tours nếu muốn lấy tất cả, hoặc lọc theo category
const API_URL = "http://localhost:5000/api/tours/category/chotkeo";

function SectionChotKeo() {
  const [startIndex, setStartIndex] = useState(0);

  // Tạo state mới để lưu dữ liệu từ API
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sử dụng useEffect để gọi API khi component được tải
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Mạng không ổn định hoặc không tìm thấy dữ liệu");
        }
        const data = await response.json();
        setTours(data); // Lưu dữ liệu vào state
      } catch (err) {
        setError(err.message); // Lưu lỗi nếu có
        // Fallback: Nếu lỗi, có thể setTours([]) hoặc dữ liệu mẫu để không vỡ giao diện
      } finally {
        setLoading(false); // Đánh dấu đã tải xong
      }
    };

    fetchTours(); // Gọi hàm fetch
  }, []); // Mảng rỗng [] nghĩa là chỉ chạy 1 lần lúc mount

  // Cập nhật logic tính toán dựa trên state "tours" mới
  const totalItems = tours.length;
  const maxIndex = Math.max(0, totalItems - CARDS_PER_PAGE);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  // Hiển thị trạng thái đang tải hoặc lỗi
  if (loading) {
    return (
      <div className="container mx-auto w-[1160px] h-[440px] flex justify-center items-center">
        <p className="text-gray-500">Đang tải ưu đãi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto w-[1160px] h-[440px] flex justify-center items-center">
        <p className="text-red-500">Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-[1160px] h-[440px] relative flex flex-col justify-center">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 pb-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideOffset}px)` }}
        >
          {/* Map qua "tours" (từ state API) thay vì data tĩnh */}
          {tours.map((tour) => (
            // Lưu ý: MongoDB dùng "_id" chứ không phải "id"
            <div key={tour._id} className="flex-shrink-0">
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      </div>

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
