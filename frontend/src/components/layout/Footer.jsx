import React from "react";
import { Link } from "react-router-dom";
const FacebookIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const PaymentIcon = ({ type }) => {
  switch (type) {
    case "visa":
      return (
        <svg
          className="h-8"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#F3F4F6" />
          <path
            d="M19.965 22.36L22.245 8.16H25.325L23.045 22.36H19.965ZM32.745 22.02C32.725 22.02 30.705 23.02 28.605 23.02C23.945 23.02 22.845 20.66 22.925 18.96C23.025 16.66 25.105 15.38 26.685 14.6C27.485 14.2 27.845 13.92 27.845 13.44C27.845 12.72 27.085 12.38 25.765 12.38C24.485 12.38 23.545 12.8 22.425 13.32L21.745 10.14C22.945 9.6 25.205 9.1 27.245 9.1C31.545 9.1 34.345 11.22 34.345 14.62C34.345 19.34 29.345 19.34 29.045 20.66C28.945 21.08 29.245 21.1 29.545 21.1C30.645 21.1 32.245 20.66 33.145 20.12L33.745 22.28L32.745 22.02ZM37.945 22.36H40.825L38.245 8.16H35.665C34.765 8.16 34.125 8.72 33.725 9.62L29.025 22.36H32.105L32.745 20.6H36.845L37.245 22.36H37.945ZM33.625 18.24L35.225 13.8L36.225 18.24H33.625ZM16.425 8.16L13.525 16.24L12.125 9.32C11.925 8.64 11.325 8.16 10.725 8.16H6.125L5.925 9.1C7.325 9.4 9.625 10.2 11.125 11.02L9.625 18.24L7.625 8.16H4.525L8.525 22.36H11.825L16.425 8.16Z"
            fill="#1434CB"
          />
        </svg>
      );
    case "mastercard":
      return (
        <svg
          className="h-8"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#F3F4F6" />
          <path d="M19.5 22H16.5V10H19.5V22Z" fill="#252525" />
          <circle cx="18" cy="16" r="7" fill="#EB001B" />
          <circle cx="30" cy="16" r="7" fill="#F79E1B" />
          <path
            d="M24 20.5C22.6193 20.5 21.3431 19.9404 20.4289 19.0262C19.5147 18.1121 19 16.8906 19 15.5625C19 14.2344 19.5147 13.0129 20.4289 12.0988C21.3431 11.1846 22.6193 10.625 24 10.625C25.3807 10.625 26.6569 11.1846 27.5711 12.0988C28.4853 13.0129 29 14.2344 29 15.5625C29 16.8906 28.4853 18.1121 27.5711 19.0262C26.6569 19.9404 25.3807 20.5 24 20.5Z"
            fill="#FF5F00"
          />
        </svg>
      );
    default:
      return null;
  }
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 font-['Poppins',_sans-serif]">
      <div className="max-w-[1160px] mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* CỘT 1: THÔNG TIN LIÊN HỆ */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-[16px] font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Thông tin liên hệ
            </h3>

            <div className="flex flex-col space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800 min-w-[50px]">
                  Email:
                </span>
                <a
                  href="mailto:ex@gmail.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  ex@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800 min-w-[50px]">
                  SĐT:
                </span>
                <a
                  href="tel:0909000000"
                  className="hover:text-blue-600 transition-colors"
                >
                  0909***000
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800 min-w-[50px]">
                  FB:
                </span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  <FacebookIcon className="w-4 h-4" />
                  fb.com/abc.xyz.profile
                </a>
              </div>
            </div>
          </div>

          {/* CỘT 2: ĐIỀU KHOẢN - CHÍNH SÁCH */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-[16px] font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Điều khoản - Chính sách
            </h3>

            <ul className="flex flex-col space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-orange-500 hover:pl-1 transition-all duration-300"
                >
                  • Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-orange-500 hover:pl-1 transition-all duration-300"
                >
                  • Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation-policy"
                  className="hover:text-orange-500 hover:pl-1 transition-all duration-300"
                >
                  • Chính sách hoàn hủy
                </Link>
              </li>
              <li>
                <Link
                  to="/payment-guide"
                  className="hover:text-orange-500 hover:pl-1 transition-all duration-300"
                >
                  • Hướng dẫn thanh toán
                </Link>
              </li>
              <li>
                <Link
                  to="/complaint"
                  className="hover:text-orange-500 hover:pl-1 transition-all duration-300"
                >
                  • Giải quyết khiếu nại
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 3: PHƯƠNG THỨC THANH TOÁN */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-[16px] font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Phương thức thanh toán
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {/* Visa */}
              <div className="bg-white border border-gray-100 rounded-lg p-2 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
                <PaymentIcon type="visa" />
              </div>

              {/* Mastercard */}
              <div className="bg-white border border-gray-100 rounded-lg p-2 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
                <PaymentIcon type="mastercard" />
              </div>

              {/* MoMo (Dùng ảnh placeholder hoặc text nếu không có icon) */}
              <div className="bg-white border border-gray-100 rounded-lg p-2 shadow-sm flex items-center justify-center h-[48px] hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-[#A50064]">
                  MOMO
                </span>
              </div>

              {/* ZaloPay */}
              <div className="bg-white border border-gray-100 rounded-lg p-2 shadow-sm flex items-center justify-center h-[48px] hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-[#0068FF]">
                  ZaloPay
                </span>
              </div>

              {/* Cash */}
              <div className="bg-white border border-gray-100 rounded-lg p-2 shadow-sm flex items-center justify-center h-[48px] hover:shadow-md transition-shadow col-span-2">
                <span className="text-[10px] font-medium text-gray-600">
                  Tiền mặt tại văn phòng
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Chấp nhận thanh toán an toàn & bảo mật
            </p>
          </div>
        </div>

        {/* COPYRIGHT BOTTOM */}
        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2024 TourVN. All rights reserved. | Thiết kế bởi ABC Group
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
