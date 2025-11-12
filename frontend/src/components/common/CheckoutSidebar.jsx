// /frontend/src/components/booking/CheckoutSidebar.jsx

import React from 'react';

function CheckoutSidebar({ price, currency, onSubmit }) {

  const handleSubmit = () => {
    // Trong tương lai, bạn có thể thu thập thêm dữ liệu ở đây
    // trước khi gọi hàm onSubmit của component cha
    const checkoutData = {
      // ví dụ: voucherCode, ...
    };
    onSubmit(checkoutData);
  };

  return (
    // "sticky top-8" làm cho nó dính lại ở trên cùng khi cuộn
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
      
      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-semibold text-gray-700">Tổng cộng</span>
        <span className="text-2xl font-bold text-black">
          đ {price}
        </span>
      </div>
      
      <button 
        onClick={handleSubmit} 
        className="
          w-full 
          bg-cyan-500 hover:bg-cyan-600 
          text-white 
          font-bold 
          font-['Poppins',_sans-serif]
          text-lg 
          py-3 
          rounded-full 
          transition-colors
        "
      >
        Chọn gói dịch vụ
      </button>
      
      {/* (Tùy chọn) Thêm các chi tiết khác nếu cần */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Bạn sẽ không bị tính phí cho đến khi xác nhận.
      </div>
    </div>
  );
}

export default CheckoutSidebar;