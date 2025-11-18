import React, { useState, useEffect } from "react";
import TourCard from "../common/TourCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000/api/tours";

const CARD_SLOT_WIDTH = 273 + 24;
const CARDS_PER_PAGE = 4;

function FeaturedActivities() {
  const [startIndex, setStartIndex] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
        const data = await response.json();

        // Lọc lấy category 'experience'
        const experienceItems = data.filter(
          (item) => item.category === "experience"
        );
        setActivities(
          experienceItems.length > 0 ? experienceItems : data.slice(0, 8)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const totalItems = activities.length;
  const maxIndex = Math.max(0, totalItems - CARDS_PER_PAGE);

  const handleNext = () =>
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));

  const slideOffset = startIndex * CARD_SLOT_WIDTH;

  if (loading)
    return (
      <div className="py-12 text-center text-gray-500">
        Đang tải hoạt động...
      </div>
    );
  if (error)
    return <div className="py-12 text-center text-red-500">Lỗi: {error}</div>;

  // Nếu không có hoạt động nào thì không hiển thị
  if (activities.length === 0) return null;

  return (
    // ĐÃ XÓA: py-12 px-6
    <div className="container mx-auto w-full max-w-[1160px]">
      <h2 className="text-3xl font-bold mb-6 font-['Poppins',_sans-serif]">
        Các hoạt động nổi bật
      </h2>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-5 pb-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${slideOffset}px)` }}
          >
            {activities.map((tour) => (
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
              hover:bg-gray-100 transition-colors border border-gray-100
            "
            style={{ top: "190px" }}
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
              hover:bg-gray-100 transition-colors border border-gray-100
            "
            style={{ top: "190px" }}
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="
          bg-cyan-500          
          hover:bg-cyan-600    
          text-white           
          font-semibold
          font-['Poppins',_sans-serif]
          text-lg
          py-3 px-10            
          rounded-full         
          transition-colors
          shadow-md hover:shadow-lg
        "
        >
          Xem tất cả
        </button>
      </div>
    </div>
  );
}

export default FeaturedActivities;
