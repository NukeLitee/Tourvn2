import React, { useState, useEffect } from "react";
import ExperienceCard from "../common/ExperienceCard"; // Import khuôn
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// URL API
const API_URL = "http://localhost:5000/api/tours";

// 1 Card (373px) + 1 Gap (24px) = 397px
const CARD_SLOT_WIDTH = 373 + 24;
const CARDS_PER_PAGE = 3; // 3 cards hiển thị

function ExperienceSlider() {
  const [startIndex, setStartIndex] = useState(0);

  // State cho API
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Lỗi kết nối");
        const data = await response.json();

        // Lọc lấy category 'experience'
        const items = data.filter((item) => item.category === "experience");
        setExperiences(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const totalItems = experiences.length;
  const maxIndex = Math.max(0, totalItems - CARDS_PER_PAGE);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  if (loading)
    return (
      <div className="py-10 text-center text-gray-500">
        Đang tải trải nghiệm...
      </div>
    );
  if (error) return null; // Ẩn nếu lỗi
  if (experiences.length === 0) return null; // Ẩn nếu không có dữ liệu

  return (
    <div className="w-full max-w-[1160px] mx-auto py-8 relative font-['Poppins',_sans-serif]">
      <h2 className="text-3xl font-bold mb-6">Trải nghiệm cho mọi người</h2>

      {/* Viewport */}
      <div className="overflow-hidden">
        {/* Track */}
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideOffset}px)` }}
        >
          {experiences.map((item) => (
            // Dùng _id làm key
            <div key={item._id} className="flex-shrink-0">
              <ExperienceCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Nút điều hướng */}
      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 -left-14 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
          style={{ top: "55%" }} // Căn chỉnh lại vị trí nút cho đẹp
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {startIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 -right-14 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
          style={{ top: "55%" }}
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}
    </div>
  );
}

export default ExperienceSlider;
