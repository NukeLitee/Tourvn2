import React from "react";

// 1. Thêm "submitButtonText" vào props, gán giá trị mặc định
function CheckoutSidebar({
  price,
  currency,
  onSubmit,
  submitButtonText = "Chọn gói dịch vụ",
}) {
  const handleSubmit = () => {
    // Gọi hàm onSubmit được truyền từ trang cha (BookingPage hoặc CartPage)
    onSubmit();
  };

  return (
    // "sticky top-8" làm cho nó dính lại ở trên cùng khi cuộn
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-semibold text-gray-700">Tổng cộng</span>
        <span className="text-2xl font-bold text-black">
          {/* 2. Thêm logic hiển thị tiền tệ */}
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
        {submitButtonText} {/* 3. Dùng prop ở đây */}
      </button>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Bạn sẽ không bị tính phí cho đến khi xác nhận.
      </div>
    </div>
  );
}

export default CheckoutSidebar;
