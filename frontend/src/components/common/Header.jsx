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
      <div className="flex items-center gap-[6px]">
        <ul className="flex gap-[6px]">
          <li className="bg-[#E6E4E0] px-[25px] py-[6px] rounded-full hover:text-white hover:bg-[#04EEF6] cursor-pointer transition">
            <a href="">Trang chủ</a>
          </li>
          <li className="bg-[#E6E4E0] px-[25px] py-[6px] rounded-full hover:text-white hover:bg-[#04EEF6] cursor-pointer transition">
            <a href="">Trợ Giúp</a>
          </li>
          <li className="bg-[#E6E4E0] px-[25px] py-[6px] rounded-full hover:text-white hover:bg-[#04EEF6] cursor-pointer transition">
            <a href="">Xem Gần Đây</a>
          </li>
        </ul>
        {/* Button */}
        <button className="bg-[#E6E4E0] text-black px-4 py-2 rounded-full hover:bg-[#04EEF6] transition">
          Đăng nhập
        </button>
        <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-[#04EEF6] transition">
          Đăng ký
        </button>
      </div>
    </div>
  );
}
