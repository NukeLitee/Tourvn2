import React, { useState, useEffect } from "react";
import TourCard from "../common/TourCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// URL lấy tất cả tour chốt kèo
const API_URL = "http://localhost:5000/api/tours/category/chotkeo";

const CARD_SLOT_WIDTH = 273 + 24;
const CARDS_PER_PAGE = 4;

// Nhận prop filterKeyword
function SectionChotKeo({ filterKeyword }) {
  const [startIndex, setStartIndex] = useState(0);
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]); // State mới cho list đã lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
        const data = await response.json();

        setTours(data); // Lưu toàn bộ data gốc
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // Effect để lọc dữ liệu khi tours hoặc filterKeyword thay đổi
  useEffect(() => {
    if (!filterKeyword) {
      setFilteredTours(tours); // Không có từ khóa thì hiện hết
    } else {
      // Lọc tour có Title hoặc Tags chứa từ khóa (không phân biệt hoa thường)
      const keyword = filterKeyword.toLowerCase();
      const results = tours.filter(
        (tour) =>
          tour.title.toLowerCase().includes(keyword) ||
          tour.subtitle2?.toLowerCase().includes(keyword) ||
          (tour.tags &&
            tour.tags.some((tag) => tag.toLowerCase().includes(keyword)))
      );
      setFilteredTours(results);
    }
    setStartIndex(0); // Reset về trang đầu khi lọc
  }, [tours, filterKeyword]);

  const totalItems = filteredTours.length;
  const maxIndex = Math.max(0, totalItems - CARDS_PER_PAGE);

  const handleNext = () =>
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));

  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  if (loading)
    return (
      <div className="h-[440px] flex items-center justify-center text-gray-500">
        Đang tải...
      </div>
    );

  // Thông báo nếu không tìm thấy tour nào phù hợp
  if (filteredTours.length === 0 && !loading && !error) {
    return (
      <div className="container mx-auto w-[1160px] h-[200px] flex items-center justify-center text-gray-500">
        Không tìm thấy tour nào phù hợp với "{filterKeyword}".
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
          {/* Render danh sách ĐÃ LỌC */}
          {filteredTours.map((tour) => (
            <div key={tour._id} className="flex-shrink-0">
              <TourCard tour={tour} />
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
  );
}

export default SectionChotKeo;
