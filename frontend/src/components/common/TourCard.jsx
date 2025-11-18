import React, { useState } from "react"; // 1. Import useState
import { StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function TourCard({ tour }) {
  const [imageError, setImageError] = useState(false); // 2. State theo dõi lỗi ảnh

  if (!tour) {
    return null;
  }

  const tourId = tour._id || tour.id;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null; // Trả về null để kích hoạt fallback
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  return (
    <Link to={`/booking/${tourId}`} className="block h-full">
      <div
        className="
        w-[273px] h-[379px] 
        bg-white rounded-xl shadow-md overflow-hidden 
        flex flex-col transition-all duration-300 ease-in-out 
        hover:-translate-y-0.5 hover:shadow-xl
      "
      >
        {/* 1. VÙNG ẢNH */}
        <div className="relative h-[182px] w-[273px] flex-shrink-0 bg-gray-200">
          {!imageError ? (
            <img
              src={getImageUrl(tour.image)}
              alt={tour.title}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)} // 3. Nếu lỗi, set state = true
            />
          ) : (
            // 4. Fallback: Hiển thị khung xám + text khi ảnh lỗi
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-sm font-medium">
              No Image Available
            </div>
          )}
        </div>

        {/* 2. VÙNG NỘI DUNG (Giữ nguyên) */}
        <div className="pl-[16px] pt-[8px] pr-[16px] pb-[25px] flex flex-col flex-1 w-[273px] font-['Poppins',_sans-serif]">
          <p className="text-gray-500 text-[14px] mb-1">
            Tour • {tour.subtitle2 || "Thành phố Hồ Chí Minh"}
          </p>

          <h3 className="font-semibold text-[14px] text-gray-800 mb-3 line-clamp-2 h-10">
            {tour.title || "Tiêu đề tour không có sẵn"}
          </h3>

          <div className="flex flex-wrap gap-2 mb-3 min-h-[24px]">
            {(tour.tags || []).slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-[#CCCCCC] text-[#757575] text-[11px] px-2.5 py-0.5 rounded-md font-normal whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center text-[12px] text-gray-700 mb-4 min-h-[20px]">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-semibold">{tour.rating || 0}</span>
            <span className="text-gray-500 font-normal ml-1">
              ({tour.reviewsCount || 0})
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500">
              {tour.bookingsCount || 0}+ đã đặt
            </span>
          </div>

          <div className="flex-grow"></div>

          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-gray-900">
              Giá {Number(tour.price).toLocaleString("vi-VN")}{" "}
              {tour.currency || "VNĐ"}
            </span>

            {tour.salePercentage && (
              <span className="border border-orange-400 text-orange-500 text-sm font-semibold px-2.5 py-1 rounded-md bg-white">
                Sale {tour.salePercentage}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TourCard;
