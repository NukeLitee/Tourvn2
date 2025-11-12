import React from "react";
import logo from "../../assets/images/logoTourVN.jpg";
import SearchBar from "./Searchbar.jsx";
import ButtonRoute from "./ButtonRoute.jsx";

export default function Header() {
  const navButtons = [
    { label: "Trang chủ", path: "/" },
    { label: "Trợ Giúp", path: "/help" },
    { label: "Xem Gần Đây", path: "/recent" },
  ];

  const actionButtons = [
    { label: "Đăng nhập", path: "/login", bg: "#E6E4E0", textColor: "black" },
    { label: "Đăng ký", path: "/register", bg: "black", textColor: "white" },
  ];

  return (
    <div className="w-[1160px] max-w-[1512px] h-[60px] mx-auto flex items-center justify-between ">
      {/* Logo + Search */}
      <div className="flex gap-[6px]">
        <img src={logo} alt="Logo" />
        <SearchBar />
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-[6px]">
        <ul className="flex gap-[6px]">
          {navButtons.map((btn, index) => (
            <li key={index}>
              <ButtonRoute {...btn} />
            </li>
          ))}
        </ul>

        {/* Action buttons */}
        {actionButtons.map((btn, index) => (
          <ButtonRoute key={index} {...btn} />
        ))}
      </div>
    </div>
  );
}
