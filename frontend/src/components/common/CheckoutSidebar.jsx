// /frontend/src/components/common/CheckoutSidebar.jsx

import React from "react";

// Thêm prop "submitButtonText"
function CheckoutSidebar({
  price,
  currency,
  onSubmit,
  submitButtonText = "Chọn gói dịch vụ",
}) {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-semibold text-gray-700">Tổng cộng</span>
        <span className="text-2xl font-bold text-black">
          {currency === "VNĐ" ? "đ" : ""} {price}
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
        {submitButtonText} {/* Dùng prop ở đây */}
      </button>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Bạn sẽ không bị tính phí cho đến khi xác nhận.
      </div>
    </div>
  );
}

export default CheckoutSidebar;
