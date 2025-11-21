import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

// Chỉ import ProfileLayout, không import Header/Sidebar rời nữa
import ProfileLayout from "../components/layout/ProfileLayout";

function ProfileOrderPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");

  // Mock Data: Danh sách đơn hàng
  const [orders, setOrders] = useState([
    {
      id: "ORD-2411-001",
      title: "[Sale Thứ 6] Tour Khám Phá Đảo Phú Quý 3N2Đ",
      image:
        "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=400&q=80",
      price: "2.500.000đ",
      originalPrice: "3.000.000đ",
      status: "Hoàn thành",
      date: "20/11/2025",
      quantity: 2,
      tags: ["Tour biển đảo", "Bán chạy"],
    },
    {
      id: "ORD-2411-002",
      title: "Vé Cáp Treo Sun World Ba Den Mountain",
      image:
        "https://images.unsplash.com/photo-1589556264800-08ae9e1f9836?auto=format&fit=crop&w=400&q=80",
      price: "550.000đ",
      originalPrice: "600.000đ",
      status: "Chờ thanh toán",
      date: "21/11/2025",
      quantity: 1,
      tags: ["Vé tham quan"],
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-100 text-green-600";
      case "Chờ thanh toán":
        return "bg-orange-100 text-orange-600";
      case "Đã hủy":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <ProfileLayout>
      {/* --- 1. Search Bar Section --- */}
      {/* Giữ nguyên style bo góc, đổ bóng nhẹ */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng theo Mã đơn hoặc Tên sản phẩm..."
              className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg outline-none focus:border-[#FF5B00] focus:ring-1 focus:ring-[#FF5B00] transition-colors text-sm text-gray-600 font-light bg-white"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="bg-[#FF5B00] text-white px-8 h-11 rounded-lg font-bold text-sm hover:bg-[#e55200] transition-colors shadow-md whitespace-nowrap">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* --- 2. Tabs Section --- */}
      <div className="bg-white rounded-t-xl px-2 border-b border-gray-200 shadow-sm mt-6">
        <div className="flex overflow-x-auto no-scrollbar px-2">
          {[
            "Tất cả",
            "Chờ thanh toán",
            "Đang xử lý",
            "Hoàn thành",
            "Đã hủy",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 mr-4 text-base transition-colors relative whitespace-nowrap ${
                activeTab === tab
                  ? "text-[#FF5B00] font-bold"
                  : "text-gray-500 hover:text-gray-700 font-normal"
              }`}
            >
              {tab}
              {tab === "Tất cả" && (
                <span className="text-xs ml-1 opacity-70">
                  ({orders.length})
                </span>
              )}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF5B00] rounded-t-md"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- 3. Order List Section --- */}
      {/* Wrapper min-height để tránh layout bị nhảy khi không có đơn hàng */}
      <div className="min-h-[400px] mt-6 space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Header: ID & Status */}
              <div className="flex justify-between items-start border-b border-dashed border-gray-100 pb-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="bg-[#009688] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm w-fit uppercase tracking-wider">
                    Yêu thích
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <ClipboardDocumentListIcon className="w-4 h-4" />
                    Mã đơn:{" "}
                    <span className="text-gray-800 font-bold">{order.id}</span>
                  </div>
                </div>
                <div
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </div>
              </div>

              {/* Body */}
              <div className="flex gap-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                  <img
                    src={order.image}
                    alt={order.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2 mb-2 hover:text-[#FF5B00] cursor-pointer leading-snug">
                      {order.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {order.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-200 font-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-gray-500 font-light">
                        Ngày đặt: {order.date}
                      </p>
                      <p className="text-xs text-gray-500 font-light">
                        Số lượng: x{order.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer: Price & Actions */}
              <div className="mt-5 pt-4 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 ml-auto sm:ml-0 order-1 sm:order-2">
                  {order.originalPrice && (
                    <div className="text-xs text-gray-400 line-through font-light">
                      {order.originalPrice}
                    </div>
                  )}
                  <div className="text-[#FF5B00] font-bold text-lg">
                    {order.price}
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto order-2 sm:order-1">
                  <button className="flex-1 sm:flex-none px-6 py-2 text-xs sm:text-sm font-bold border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors h-10">
                    Xem chi tiết
                  </button>
                  <button className="flex-1 sm:flex-none px-6 py-2 text-xs sm:text-sm font-bold bg-[#FF5B00] text-white rounded-lg hover:bg-[#e55200] shadow-sm transition-colors shadow-orange-100 h-10">
                    Mua lại
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3076/3076753.png"
                alt="Empty"
                className="w-12 h-12 opacity-30"
              />
            </div>
            <p className="text-gray-500 font-light">
              Chưa có đơn hàng nào trong mục này.
            </p>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}

export default ProfileOrderPage;
