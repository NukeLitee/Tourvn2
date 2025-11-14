import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

function ChotKeoCard({chot}){
    if (!chot) {
    return null;
  }
    return(
        <>
        <div className="w-[273px] h-[379px] bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl">
            <div className="relative h-[182px] w-[273px] flex-shrink-0">
                 {/* flex-shrink-0 để ảnh không bị co */}
                <img
                    src={chot.image}
                    alt={chot.title}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* 2. VÙNG NỘI DUNG: flex-1 để lấp đầy không gian còn lại (379px - 182px) */}
            <div className="pl-[16px] pt-[8px] pr-[16px] pb-[25px] flex flex-1 flex-col w-[273px] font-['Poppins',_sans-serif]">
                {/* Tiêu đề chính: Poppins, 14px, Cố định chiều cao 2 dòng */}
        <h3
          className="
          font-semibold 
          text-[14px] 
          font-['Poppins',_sans-serif] 
          text-gray-800
          mb-3
          line-clamp-2
          h-10                 // Cứng: 14px * ~1.4 (line-height) * 2 dòng ≈ 39-40px. 
        "
        >
          {chot.title || "Tiêu đề tour không có sẵn"}
        </h3>

        {/* Tags: 11px, màu #757575, nền #CCCCCC, Cố định chiều cao 1 dòng */}
        <div className="flex flex-wrap gap-2 mb-3 min-h-[24px]">
          {" "}
          {/* Cứng: min-height cho 1 dòng tag */}
          {(chot.tags || []).map((tag, index) => (
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

        {/* Đánh giá: 12px, Cố định chiều cao 1 dòng */}
        <div className="flex bg-[#e7e3e3] items-center text-[12px] text-gray-700 mb-4 min-h-[20px]">
          <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="font-semibold">{chot.rating}</span>
          <span className="text-gray-500 font-normal">
            {" "}
            ({chot.reviewsCount})
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-500">
            {chot.bookingsCount}+ Đã được đặt
          </span>
        </div>

        {/* Spacer: Đây là mấu chốt để đẩy giá xuống dưới */}
        <div className="flex-grow"></div>

        {/* Giá và Sale: Nằm cố định ở cuối cùng */}
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold text-gray-900">
            Giá {chot.price} {chot.currency}
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
            Sale {chot.salePercentage}
          </span>
        </div>
            </div>
        </div>
        </>
    );
}

export default ChotKeoCard;