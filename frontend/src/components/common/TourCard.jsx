import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom"; // 1. Import Link

function TourCard({ tour }) {
  if (!tour) {
    return null;
  }

  return (
    // 2. Thay thẻ div ngoài cùng thành Link (hoặc bọc div bằng Link)
    // Chuyển hướng đến /booking/ + id của tour
    <Link
      to={`/booking/${tour.id}`}
      className="block" // block để thẻ a bao trọn div
    >
      <div
        className="
        w-[273px] h-[379px] 
        bg-white 
        rounded-xl 
        shadow-md 
        overflow-hidden 
        flex flex-col
        
        transition-all 
        duration-300 
        ease-in-out 
        hover:-translate-y-0.5 
        hover:shadow-xl
      "
      >
        {/* 1. VÙNG ẢNH */}
        <div className="relative h-[182px] w-[273px] flex-shrink-0">
          <img
            src={tour.image || "https://via.placeholder.com/273x182"}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. VÙNG NỘI DUNG */}
        <div
          className="
          pl-[16px] pt-[8px] pr-[16px] pb-[25px] 
          flex flex-col flex-1 
          w-full font-['Poppins',_sans-serif]
        "
        >
          <p
            className="
            text-gray-500 
            text-[14px] 
            font-['Poppins',_sans-serif] 
            mb-1
          "
          >
            Tour • Thành phố Hồ Chí Minh
          </p>

          <h3
            className="
            font-semibold 
            text-[14px] 
            font-['Poppins',_sans-serif] 
            text-gray-800
            mb-3
            line-clamp-2
            h-10
          "
          >
            {tour.title || "Tiêu đề tour không có sẵn"}
          </h3>

          <div className="flex flex-wrap gap-2 mb-3 min-h-[24px]">
            {(tour.tags || []).map((tag, index) => (
              <span
                key={index}
                className="
                bg-[#CCCCCC]
                text-[#757575]
                text-[11px]
                px-2.5 py-0.5
                rounded-md
                font-normal
              "
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center text-[12px] text-gray-700 mb-4 min-h-[20px]">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-gray-500 font-normal">
              {" "}
              ({tour.reviewsCount})
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500">
              {tour.bookingsCount}+ đã được đặt
            </span>
          </div>

          <div className="flex-grow"></div>

          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-gray-900">
              Giá {tour.price} {tour.currency}
            </span>
            <span
              className="
              border
              border-orange-400
              text-orange-500
              text-sm font-semibold
              px-2.5 py-1
              rounded-md
              bg-white
            "
            >
              Sale {tour.salePercentage}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TourCard;
