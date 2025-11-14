import React from "react";
import Header from "../components/common/Header";
import HeroBanner from "../components/common/HeroBanner";

import donhang from "../assets/icons/donhang.svg";
import thanhtoan from "../assets/icons/thanhtoan.svg";
import hoantien from "../assets/icons/hoantien.svg";
import khachsan from "../assets/icons/khachsan.svg";

export default function Help() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <HeroBanner />
      </div>
      <div className="w-[1160px] h-[326px] mx-auto">
        <h3 className="font-medium font-['Poppins',_sans-serif] text-[28px] mb-[33px]">
          Tìm theo mục
        </h3>
        <div className="flex flex-wrap justify-around gap-4 p-4">
          {/* Card 1: Đơn hàng */}
          <div
            className="
        w-[242px] h-[176px] bg-[#F4F4F4] 
        rounded-xl 
        flex flex-col items-center justify-center 
        p-4
      "
          >
            <img
              src={donhang}
              alt="Đơn hàng của bạn"
              className="h-20 w-20 mb-3" // Ảnh có kích thước cố định
            />

            {/* Bọc text trong 1 div có chiều cao tối thiểu */}
            <div className="min-h-[3rem] flex items-center">
              {" "}
              {/* min-h-12 (48px) - đủ cho 2 dòng text */}
              <p className="text-gray-800 font-['Poppins',_sans-serif] text-center">
                Đơn hàng của bạn
              </p>
            </div>
          </div>

          {/* Card 2: Thanh toán */}
          <div
            className="
        w-[242px] h-[176px] bg-[#F4F4F4] 
        rounded-xl 
        flex flex-col items-center justify-center 
        p-4
      "
          >
            <img
              src={thanhtoan}
              alt="Thanh toán & hóa đơn"
              className="h-20 w-20 mb-3"
            />

            {/* Bọc text trong 1 div có chiều cao tối thiểu */}
            <div className="min-h-[3rem] flex items-center">
              <p className="text-gray-800 font-['Poppins',_sans-serif] text-center">
                Thanh toán & hóa đơn
              </p>
            </div>
          </div>

          {/* Card 3: Hoàn tiền (Text này sẽ chiếm 2 dòng) */}
          <div
            className="
        w-[242px] h-[176px] bg-[#F4F4F4] 
        rounded-xl 
        flex flex-col items-center justify-center 
        p-4
      "
          >
            <img
              src={hoantien}
              alt="Sửa đổi đơn hàng & hoàn tiền"
              className="h-20 w-20 mb-3"
            />

            {/* Bọc text trong 1 div có chiều cao tối thiểu */}
            <div className="min-h-[3rem] flex items-center">
              <p className="text-gray-800 font-['Poppins',_sans-serif] text-center">
                Sửa đổi đơn hàng & hoàn tiền
              </p>
            </div>
          </div>

          {/* Card 4: Khách sạn */}
          <div
            className="
        w-[242px] h-[176px] bg-[#F4F4F4] 
        rounded-xl 
        flex flex-col items-center justify-center 
        p-4
      "
          >
            <img src={khachsan} alt="Khách sạn" className="h-20 w-20 mb-3" />

            {/* Bọc text trong 1 div có chiều cao tối thiểu */}
            <div className="min-h-[3rem] flex items-center">
              <p className="text-gray-800 font-['Poppins',_sans-serif] text-center">
                Khách sạn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
