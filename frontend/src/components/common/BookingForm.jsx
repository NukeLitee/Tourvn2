// /frontend/src/components/common/BookingForm.jsx

import React from 'react';
// ✅ Import component gallery mới
import TourImageGallery from './TourImageGallery'; 
import { InformationCircleIcon } from '@heroicons/react/24/outline';

// ✅ Component giờ nhận 'images' prop
function BookingForm({ title, images }) {
  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Tiêu đề gói du lịch */}
      <h2 className="text-4xl font-bold font-['Poppins',_sans-serif]">{title}</h2>
      
      {/* 2. Component Gallery Mới (thay thế Uploader) */}
      <TourImageGallery images={images} />

      {/* 3. Hộp thông báo màu hồng (giữ nguyên) */}
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
  );
}

export default BookingForm;