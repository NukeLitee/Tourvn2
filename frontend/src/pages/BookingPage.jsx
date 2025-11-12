import React from 'react';
// Import các component với đường dẫn CỦA BẠN
import CheckoutSidebar from '../components/common/CheckoutSidebar';
import TourCardDiv from '../components/layout/TourCardDiv';
import Header from '../components/common/Header';
// ✅ Import 2 component này (vốn nằm trong BookingForm cũ)
import TourImageGallery from '../components/common/TourImageGallery'; 
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { BookingTourData } from '../data';
function BookingPage() {
  
  const handleBookingSubmit = (formData) => {
    console.log('Đang gửi đơn hàng:', formData);
    // ...
  };

  return (
    <div className="bg-gray-50 min-h-screen font-['Poppins',_sans-serif]">
      <Header />

      <main className="container mx-auto max-w-[1160px] py-10">
        
        {/* --- PHẦN 1: TIÊU ĐỀ & GALLERY (FULL-WIDTH) --- */}
        <h2 className="text-4xl font-bold font-['Poppins',_sans-serif] mb-6">
          {BookingTourData.title}
        </h2>
        
        <TourImageGallery images={BookingTourData.images} />

        {/* --- PHẦN 2: BỐ CỤC 2 CỘT MỚI (THEO YÊU CẦU CỦA BẠN) --- */}
        <div className="flex flex-col lg:flex-row lg:gap-8 mt-6"> {/* 'mt-6' tạo khoảng cách với Gallery */}
          
          {/* CỘT TRÁI: HỘP THÔNG BÁO */}
          <div className="w-full lg:flex-grow">
            <div className="bg-pink-100 border border-pink-200 text-pink-900 p-5 rounded-lg">
              <div className="flex">
                <InformationCircleIcon className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Tiết kiệm đến nơi phiêu lưu thời gian sắp hàng...</li>
                  <li>Đăng ký dễ dàng nhất, hoàn tất thủ tục trong 60 giây.</li>
                  <li>Xét duyệt nhanh nhất, hoàn thành xét duyệt chỉ trong 1 ngày làm việc.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: CHECKOUT SIDEBAR */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0 mt-8 lg:mt-0">
            <CheckoutSidebar 
              price={BookingTourData.price} 
              currency={BookingTourData.currency}
              onSubmit={handleBookingSubmit} 
            />
          </div>
        </div>

        {/* --- PHẦN 3: "CÓ THỂ BẠN SẼ THÍCH" (FULL-WIDTH) --- */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">
            Có thể bạn sẽ thích
          </h2>
          <TourCardDiv />
        </div>
        
      </main>
    </div>
  );
}

export default BookingPage;