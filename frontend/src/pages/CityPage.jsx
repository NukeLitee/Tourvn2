import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  MapPinIcon,
  TicketIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

// --- IMPORT TỪ DỰ ÁN CỦA BẠN ---
import Header from "../components/common/Header";
import TourCard from "../components/common/TourCard";

// Cấu hình API
const API_URL = "http://localhost:5000/api/tours";
const CARD_SLOT_WIDTH = 273 + 24; // Card (273px) + Gap (24px)
const CARDS_PER_PAGE = 4;

function CityPage() {
  const { slug } = useParams();

  const cityMap = {
    "ho-chi-minh": "Hồ Chí Minh",
    "ha-noi": "Hà Nội",
    "da-nang": "Đà Nẵng",
    "nha-trang": "Nha Trang",
  };
  const cityName = cityMap[slug] || "Hồ Chí Minh";

  const [tours, setTours] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tourIndex, setTourIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();

        const cityItems = data.filter(
          (item) =>
            (item.subtitle2 && item.subtitle2.includes(cityName)) ||
            (item.title && item.title.includes(cityName)) ||
            true
        );

        setTours(cityItems.filter((item) => item.category === "tour"));
        setActivities(
          cityItems.filter((item) => item.category === "experience")
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setTourIndex(0);
    setActivityIndex(0);
  }, [cityName]);

  const handleNext = (setIndex, currentIndex, totalItems) => {
    const maxIndex = Math.max(0, totalItems - CARDS_PER_PAGE);
    setIndex(Math.min(currentIndex + 1, maxIndex));
  };

  const handlePrev = (setIndex, currentIndex) => {
    setIndex(Math.max(currentIndex - 1, 0));
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Lỗi: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white font-['Poppins',_sans-serif]">
      <Header />

      {/* Hero Banner */}
      <div className="relative h-[400px] w-full group">
        <img
          src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2000"
          alt={cityName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 flex flex-col justify-center max-w-[1160px] mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{cityName}</h1>
          <p className="max-w-3xl text-sm md:text-base text-gray-200 mb-6 line-clamp-2 leading-relaxed">
            Khám phá vẻ đẹp, văn hóa và các hoạt động giải trí hàng đầu tại{" "}
            {cityName}.
          </p>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1160px] mx-auto px-4 py-4 flex gap-8 overflow-x-auto no-scrollbar text-sm font-medium text-gray-600">
          <button className="flex items-center gap-2 text-gray-900 font-bold border-b-2 border-black pb-1">
            <Squares2X2Icon className="w-5 h-5" /> Tất cả
          </button>
          <button className="flex items-center gap-2 hover:text-[#FF5B00] pb-1 transition-colors">
            <TicketIcon className="w-5 h-5" /> Vui chơi & Trải nghiệm
          </button>
          <button className="flex items-center gap-2 hover:text-[#FF5B00] pb-1 transition-colors">
            <MapPinIcon className="w-5 h-5" /> Tour du lịch
          </button>
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto px-4 py-10 space-y-12">
        {/* --- FEATURED ACTIVITIES --- */}
        {activities.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Vui chơi & Trải nghiệm tại {cityName}
              </h2>
              <button className="text-[#FF5B00] font-semibold hover:underline">
                Xem tất cả
              </button>
            </div>

            <div className="relative group">
              <div className="overflow-hidden py-4 -my-4">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      activityIndex * CARD_SLOT_WIDTH
                    }px)`,
                  }}
                >
                  {activities.map((item) => (
                    <div key={item._id || item.id} className="flex-shrink-0">
                      <TourCard tour={item} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút Prev - Sử dụng style -left-14 để tách hẳn ra */}
              {activityIndex > 0 && (
                <button
                  onClick={() => handlePrev(setActivityIndex, activityIndex)}
                  className="
                    absolute top-1/2 -translate-y-1/2 -left-14 
                    bg-white rounded-full p-2 shadow-lg z-10 
                    hover:bg-gray-100 transition-colors border border-gray-100
                  "
                >
                  <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                </button>
              )}

              {/* Nút Next - Sử dụng style -right-14 để tách hẳn ra */}
              {activityIndex <
                Math.max(0, activities.length - CARDS_PER_PAGE) && (
                <button
                  onClick={() =>
                    handleNext(
                      setActivityIndex,
                      activityIndex,
                      activities.length
                    )
                  }
                  className="
                    absolute top-1/2 -translate-y-1/2 -right-14 
                    bg-white rounded-full p-2 shadow-lg z-10 
                    hover:bg-gray-100 transition-colors border border-gray-100
                  "
                >
                  <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- TOURS --- */}
        {tours.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Các tour nổi bật ở {cityName}
              </h2>
              <button className="text-[#FF5B00] font-semibold hover:underline">
                Xem tất cả
              </button>
            </div>

            <div className="relative group">
              <div className="overflow-hidden py-4 -my-4">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${tourIndex * CARD_SLOT_WIDTH}px)`,
                  }}
                >
                  {tours.map((item) => (
                    <div key={item._id || item.id} className="flex-shrink-0">
                      <TourCard tour={item} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút Prev - Sử dụng style -left-14 để tách hẳn ra */}
              {tourIndex > 0 && (
                <button
                  onClick={() => handlePrev(setTourIndex, tourIndex)}
                  className="
                    absolute top-1/2 -translate-y-1/2 -left-14 
                    bg-white rounded-full p-2 shadow-lg z-10 
                    hover:bg-gray-100 transition-colors border border-gray-100
                  "
                >
                  <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                </button>
              )}

              {/* Nút Next - Sử dụng style -right-14 để tách hẳn ra */}
              {tourIndex < Math.max(0, tours.length - CARDS_PER_PAGE) && (
                <button
                  onClick={() =>
                    handleNext(setTourIndex, tourIndex, tours.length)
                  }
                  className="
                    absolute top-1/2 -translate-y-1/2 -right-14 
                    bg-white rounded-full p-2 shadow-lg z-10 
                    hover:bg-gray-100 transition-colors border border-gray-100
                  "
                >
                  <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CityPage;
