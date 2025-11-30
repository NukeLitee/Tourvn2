import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

// --- IMPORT TỪ PROJECT CỦA BẠN ---
// (Hệ thống preview báo lỗi dòng này là bình thường, chạy trên máy bạn sẽ OK)
import ProfileLayout from "../components/layout/ProfileLayout";
import { useAuth } from "../context/AuthContext";

function ProfileOrderPage() {
  const [searchText, setSearchText] = useState("");

  // State dữ liệu đơn hàng
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy thông tin user từ Context
  const { user } = useAuth();

  // Gọi API lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user || !user.token) {
          setLoading(false);
          return;
        }

        const response = await fetch("/api/orders/myorders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Lỗi lấy đơn hàng:", data.message);
        }
      } catch (error) {
        console.error("Lỗi kết nối:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Helper: Format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Helper: Format ngày
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // Helper: Màu sắc trạng thái
  const getStatusColor = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes("hoàn thành") || s.includes("đã giao"))
      return "bg-green-100 text-green-600";
    if (s.includes("chờ") || s.includes("đang"))
      return "bg-orange-100 text-orange-600";
    if (s.includes("hủy")) return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <ProfileLayout>
      {/* --- 1. Search Bar Section --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
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

      {/* --- 2. Order List Section (Đã xóa Tabs) --- */}
      <div className="min-h-[400px] space-y-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500 font-light">
            Đang tải danh sách đơn hàng...
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => {
            // Lấy thông tin sản phẩm đầu tiên để hiển thị
            const firstItem =
              order.orderItems && order.orderItems.length > 0
                ? order.orderItems[0]
                : {};
            const otherItemsCount = order.orderItems
              ? order.orderItems.length - 1
              : 0;

            return (
              <div
                key={order._id}
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
                      <span className="text-gray-800 font-bold">
                        #
                        {order._id
                          .substring(order._id.length - 8)
                          .toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${getStatusColor(
                      order.status || "Đang xử lý"
                    )}`}
                  >
                    {order.status || "Đang xử lý"}
                  </div>
                </div>

                {/* Body */}
                <div className="flex gap-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                    <img
                      src={firstItem.image || "https://via.placeholder.com/150"}
                      alt={firstItem.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2 mb-2 hover:text-[#FF5B00] cursor-pointer leading-snug">
                        {firstItem.name}
                        {otherItemsCount > 0 && (
                          <span className="text-gray-400 font-normal text-xs ml-1">
                            (+{otherItemsCount} sản phẩm khác)
                          </span>
                        )}
                      </h3>

                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-500 font-light">
                          Ngày đặt: {formatDate(order.createdAt)}
                        </p>
                        <p className="text-xs text-gray-500 font-light">
                          Số lượng: x{firstItem.qty}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="mt-5 pt-4 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3 ml-auto sm:ml-0 order-1 sm:order-2">
                    <span className="text-xs text-gray-500 font-light">
                      Tổng tiền:
                    </span>
                    <div className="text-[#FF5B00] font-bold text-lg">
                      {formatCurrency(order.totalPrice)}
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
            );
          })
        ) : (
          // Empty State
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
