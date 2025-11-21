import React from "react";
import Header from "../components/common/Header";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. Import

const vouchers = [
  {
    id: 1,
    title: "[Sale Thứ 6 – Cuối Tuần] Vé tham quan nước ngoài Giảm 200K",
    code: "ATTNUOCNGOAISN",
    discount: "USD 7.59",
    sub: "off",
    minSpend: "113.9",
    // Thêm các field cần thiết để hiển thị ở trang Profile
    description: ["Áp dụng cho đơn hàng quốc tế", "HSD: 31/12/2025"],
    link: "Áp dụng ngay",
    subtext: "Vé tham quan & công viên",
    warning: "Sắp hết hạn",
  },
  // ... (các voucher khác)
];

function VoucherPage() {
  const location = useLocation();
  const promoData = location.state?.promoData;
  const { saveUserVoucher } = useAuth(); // 2. Lấy hàm

  // 3. Hàm xử lý lưu mã
  const handleSave = async (voucher) => {
    const result = await saveUserVoucher(voucher);
    if (result.success) {
      alert("Đã lưu mã thành công! Kiểm tra trong Hồ sơ của bạn.");
    } else {
      alert("Lỗi: " + result.message);
    }
  };

  return (
    <div className="bg-[#CDECFE] min-h-screen font-['Poppins',_sans-serif]">
      <Header />
      {/* Banner ... */}
      <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
        <img
          src={
            promoData?.image ||
            "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop"
          }
          alt="Voucher Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <main className="container mx-auto max-w-[1160px] py-10 px-4">
        {/* ... Tiêu đề ... */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">MÃ ƯU ĐÃI</h2>
          <p className="text-gray-600">Giảm trên giá đã giảm</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="relative w-[373px] h-[151px] flex shadow-sm drop-shadow-md filter"
            >
              {/* Phần Trái */}
              <div className="w-[238px] bg-white rounded-l-2xl p-4 flex flex-col justify-between relative">
                <div>
                  <h3 className="font-bold text-gray-900 text-[15px] leading-tight mb-2 line-clamp-2">
                    {voucher.title}
                  </h3>
                </div>
                <p className="text-[12px] text-gray-500">
                  Mã ưu đãi:
                  <span className="text-black ml-1">{voucher.code}</span>
                </p>
                <div className="absolute -right-3 -top-3 w-6 h-6 bg-[#CDECFE] rounded-full z-10"></div>
                <div className="absolute -right-3 -bottom-3 w-6 h-6 bg-[#CDECFE] rounded-full z-10"></div>
              </div>

              {/* Phần Phải */}
              <div className="w-[135px] bg-[#9F7AEA] rounded-r-2xl flex flex-col items-center justify-center text-white p-2 relative border-l-2 border-dashed border-[#CDECFE]/30">
                <div className="text-center leading-none mb-1">
                  <span className="font-bold text-[20px] block">
                    {voucher.discount}
                  </span>
                  <span className="font-bold text-[18px] block">
                    {voucher.sub}
                  </span>
                </div>
                <span className="text-[10px] mb-3 opacity-90 text-center">
                  Đơn tối thiểu: {voucher.minSpend}
                </span>

                {/* Nút Lưu Mã */}
                <button
                  onClick={() => handleSave(voucher)}
                  className="bg-white text-[#9F7AEA] text-xs font-bold py-1.5 px-5 rounded-full hover:bg-gray-100 transition-colors shadow-sm active:scale-95"
                >
                  Lưu mã
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default VoucherPage;
