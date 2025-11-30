import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- IMPORT TỪ DỰ ÁN CỦA BẠN (Đảm bảo đường dẫn đúng) ---
import logo from "../../assets/images/logoTourVN.jpg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

// --- ICON SVG COMPONENTS ---
const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1 .437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
      clipRule="evenodd"
    />
  </svg>
);

const LogOutIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
    />
  </svg>
);

// --- HELPER FUNCTIONS ---
// Hàm tạo ảnh placeholder base64 để tránh lỗi network khi ảnh chính hỏng
const getPlaceholderImage = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#e5e7eb"/><text x="50" y="50" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">No Image</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return getPlaceholderImage();
  if (imagePath.startsWith("http")) return imagePath;
  return `http://localhost:5000${imagePath}`;
};

const HighlightText = ({ text, highlight }) => {
  if (!highlight?.trim() || !text) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-orange-500 font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

// --- SEARCH BAR COMPONENT ---
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tours, setTours] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Gọi API lấy dữ liệu Tour từ Backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tours");
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();

        let tourData = [];
        if (Array.isArray(data)) tourData = data;
        else if (data.tours && Array.isArray(data.tours)) tourData = data.tours;
        else if (data.data && Array.isArray(data.data)) tourData = data.data;

        setTours(tourData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu tìm kiếm:", error);
      }
    };
    fetchTours();
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lọc kết quả tìm kiếm
  useEffect(() => {
    if (searchTerm.trim() === "" || !tours.length) {
      setSearchResults([]);
      return;
    }
    const results = tours.filter(
      (tour) =>
        tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.subtitle2?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, tours]);

  const handleNavigate = (id) => {
    setShowDropdown(false);
    setSearchTerm("");
    navigate(`/booking/${id}`);
  };

  return (
    <div className="relative w-[300px] hidden md:block" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="w-full h-10 pl-4 pr-10 text-sm bg-gray-100 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {showDropdown && searchTerm && (
        <div className="absolute top-12 left-0 w-[400px] bg-white rounded-lg shadow-xl border border-gray-100 max-h-[400px] overflow-y-auto z-[100]">
          {searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((tour) => {
                const tourId = tour._id || tour.id;
                return (
                  <div
                    key={tourId}
                    onClick={() => handleNavigate(tourId)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <img
                      src={getImageUrl(tour.image)}
                      alt={tour.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getPlaceholderImage();
                      }}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-200"
                    />
                    <div className="flex flex-col text-left">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        <HighlightText
                          text={tour.title}
                          highlight={searchTerm}
                        />
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        <HighlightText
                          text={tour.subtitle2}
                          highlight={searchTerm}
                        />
                      </p>
                      {tour.price > 0 && (
                        <p className="text-xs font-semibold text-orange-500 mt-0.5">
                          {Number(tour.price).toLocaleString("vi-VN")}{" "}
                          {tour.currency || "VNĐ"}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              {tours.length === 0
                ? "Đang tải dữ liệu..."
                : `Không tìm thấy kết quả cho "${searchTerm}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- HEADER COMPONENT ---
function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const totalItems = safeCartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowUserMenu(false);
  };

  const GuestHeader = () => (
    <div className="flex items-center justify-between h-16 max-w-[1160px] mx-auto px-4 lg:px-0">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="TourVN"
            className="w-[115px] h-[32px] object-contain"
          />
        </Link>
        <SearchBar />
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
          className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          Trợ Giúp
        </Link>
        <Link
          to="/recent"
          className="hidden lg:block px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          Xem Gần Đây
        </Link>
        <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>
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
    <div className="flex items-center justify-between h-16 max-w-[1160px] mx-auto px-4 lg:px-0">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="TourVN"
            className="w-[115px] h-[32px] object-contain"
          />
        </Link>
        <SearchBar />
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
              <UserIcon className="w-6 h-6 text-gray-400" />
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
                  <LogOutIcon className="w-4 h-4" /> Đăng xuất
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
