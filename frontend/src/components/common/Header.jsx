import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/LogoTourVN.jpg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

import { BsSearch, BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const GuestHeader = () => (
    <div className="flex items-center justify-between h-16 max-w-[1160px] mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="TourVN"
            className="w-[115px] h-[32px] object-contain"
          />
        </Link>
        <div className="relative w-[300px] hidden md:block">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full h-10 pl-4 pr-10 text-sm bg-gray-100 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-gray-300"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
            <BsSearch className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          Trang chủ
        </Link>
        <Link
          to="/help"
          className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          Trợ Giúp
        </Link>
        <Link
          to="/recent"
          className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          Xem Gần Đây
        </Link>
        <div className="w-px h-6 bg-gray-200 mx-2"></div>
        <Link
          to="/login"
          className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          Đăng nhập
        </Link>
        <Link
          to="/register"
          className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-colors"
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );

  const UserHeader = () => (
    <div className="flex items-center justify-between h-16 max-w-[1160px] mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="TourVN"
            className="w-[115px] h-[32px] object-contain"
          />
        </Link>

        <div className="relative w-[300px] hidden md:block">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full h-10 pl-4 pr-10 text-sm bg-gray-100 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-gray-300"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
            <BsSearch className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="hidden lg:block px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          Trang chủ
        </Link>
        <Link
          to="/help"
          className="hidden lg:block px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          Trợ giúp
        </Link>
        <Link
          to="/recent"
          className="hidden xl:block px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          Xem gần đây
        </Link>

        <Link
          to="/cart"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full relative transition-colors group ml-2"
        >
          <span className="text-sm font-medium text-gray-800 group-hover:text-black">
            Giỏ hàng
          </span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ring-2 ring-white">
              {totalItems}
            </span>
          )}
        </Link>

        <div className="relative ml-2">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-gray-300 transition-all overflow-hidden focus:outline-none"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <BsPersonCircle className="w-6 h-6 text-gray-400" />
            )}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user?.name || "Người dùng"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600"
                >
                  Hồ sơ của tôi
                </Link>
                <Link
                  to="/bookings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600"
                >
                  Đơn hàng của tôi
                </Link>
              </div>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                >
                  <FiLogOut className="w-4 h-4" /> Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 font-['Poppins',_sans-serif] shadow-sm">
      {user ? <UserHeader /> : <GuestHeader />}
    </nav>
  );
}

export default Header;
