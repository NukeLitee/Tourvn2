import React from "react";
import logo from "../../assets/images/logoTourVN.jpg"; // ✅ đường dẫn ảnh logo của bạn
import SearchBar from "./Searchbar.jsx";

export default function Header() {
  return (
    <div className="w-[1512px] max-w-[1512px] h-[60px] mx-auto flex items-center justify-between px-6">
      <div className="flex gap-[6px]">
        <img src={logo} alt="" />
        <SearchBar />
      </div>
      {/* Ul li list */}
      <div className="flex items-center gap-8">
        <ul className="flex gap-6">
          <li className="hover:text-blue-500 cursor-pointer transition">
            Trang chủ
          </li>
          <li className="hover:text-blue-500 cursor-pointer transition">
            Trợ giúp
          </li>
          <li className="hover:text-blue-500 cursor-pointer transition">
            Xem gần đây
          </li>
        </ul>
        {/* Button */}
        <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-[#04EEF6] transition">
          Đăng nhập
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-[#04EEF6] transition">
          Đăng ký
        </button>
      </div>
    </div>
  );
}
