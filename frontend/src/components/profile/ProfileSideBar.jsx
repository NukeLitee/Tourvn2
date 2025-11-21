import React from "react";
import { Link, useLocation } from "react-router-dom"; // 1. Import useLocation
import { useAuth } from "../../context/AuthContext";
import {
  TicketIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftEllipsisIcon,
  CreditCardIcon,
  UserGroupIcon,
  MapPinIcon,
  HeartIcon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function ProfileSidebar() {
  const { user } = useAuth();
  const location = useLocation(); // 2. Lấy location để active menu

  // 3. Thêm trường 'path' cho mỗi item
  const menuItems = [
    {
      icon: TicketIcon,
      label: "Mã Ưu đãi",
      value: "Xem",
      path: "/profile/vouchers",
    },
    {
      icon: ClipboardDocumentListIcon,
      label: "Đơn hàng",
      path: "/profile/bookings",
    }, // Ví dụ
    { icon: ChatBubbleLeftEllipsisIcon, label: "Đánh giá" },
    { icon: CreditCardIcon, label: "Quản lý phương thức thanh toán" },
    { icon: UserGroupIcon, label: "Quản lý thông tin khách" },
    { icon: MapPinIcon, label: "Quản lý thông tin giao hàng" },
    { icon: HeartIcon, label: "Yêu thích", path: "/saved" },
    { icon: DevicePhoneMobileIcon, label: "Quản lý đăng nhập" },
    { icon: Cog6ToothIcon, label: "Cài đặt", path: "/profile" },
  ];

  // Hàm kiểm tra active
  const isActive = (path) => {
    if (!path) return false;
    // Active nếu path trùng khớp hoặc là trang con (ví dụ /profile/edit vẫn active Cài đặt)
    if (path === "/profile" && location.pathname === "/profile/edit")
      return true;
    return location.pathname === path;
  };

  return (
    <div className="w-full lg:w-[300px] flex-shrink-0">
      {/* Header Sidebar (Giữ nguyên) */}
      <div
        className="rounded-t-2xl p-6 text-center text-white"
        style={{
          background:
            "linear-gradient(69deg, rgba(0, 219, 222, 1) 0%, rgba(142, 132, 245, 1) 100%)",
        }}
      >
        <div className="w-20 h-20 mx-auto bg-white rounded-full p-1 mb-3 overflow-hidden">
          {user?.avatar ? (
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt="User"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <UserCircleIcon className="w-full h-full text-gray-300" />
          )}
        </div>
        <h3 className="font-bold text-lg">
          {user?.name || "Người dùng TourVN"}
        </h3>
        <Link
          to="/profile/edit"
          className="text-xs opacity-80 hover:opacity-100 flex items-center justify-center gap-1 mt-1 hover:underline"
        >
          Cập nhật thông tin cá nhân ›
        </Link>
      </div>

      {/* Menu List (Cập nhật logic Link và Active) */}
      <div className="bg-white rounded-b-2xl shadow-sm py-2 overflow-hidden">
        {menuItems.map((item, index) => (
          <Link
            to={item.path || "#"} // Link đến path nếu có
            key={index}
            className={`
              flex items-center justify-between px-6 py-4 cursor-pointer transition-colors border-l-4
              ${
                isActive(item.path)
                  ? "border-[#0292D3] text-[#0292D3] font-medium bg-blue-50/50"
                  : "border-transparent text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-6 h-6" />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.value && (
              <span className="text-xs font-semibold text-gray-400">
                {item.value}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProfileSidebar;
