import React from "react";
import logo from "../assets/images/LogoTourVN.jpg";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";

function LoginPage() {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(69deg, rgba(0, 219, 222, 1) 0%, rgba(142, 132, 245, 1) 100%)",
      }}
    >
      <div className="flex flex-col justify-center items-center bg-[#DDF4FF] w-[436px] h-[663px] rounded-[20px] relative shadow-2xl">
        {/* img */}
        <img
          src={logo}
          alt="logo"
          className="w-[82px] h-[24px] absolute top-8 left-10"
        />
        <h3 className="font-['Poppins',_sans-serif] text-[28px] mb-[44px] mt-[19px]">
          Đăng nhập hoặc Đăng ký
        </h3>
        <form className="flex flex-col items-center gap-4 w-full">
          {" "}
          {/* Khoảng cách giữa các phần tử */}
          {/* === CÁC NÚT ĐĂNG NHẬP BÊN THỨ BA === */}
          {/* Nút Google */}
          <button
            type="button"
            className="
            relative  flex items-center justify-center w-[356px] h-[48px] rounded-xl bg-white border border-[1px] border-[#000000] gap-3 font-medium text-gray-700  hover:bg-gray-50 transition-colors
            "
          >
            <FcGoogle className="w-6 h-6 absolute left-5" />
            <span>Google</span>
          </button>
          {/* Nút Email */}
          <button
            type="button"
            className="
              flex items-center justify-center w-[356px] h-[48px] rounded-xl bg-white border border-[1px] border-[#000000] font-medium text-gray-700 hover:bg-gray-50 transition-colors relative
            "
          >
            <HiOutlineMail className="w-6 h-6 text-gray-500 absolute left-5" />
            <span>Email</span>
          </button>
          {/* Nút Số điện thoại */}
          <button
            type="button"
            className="relative flex items-center justify-center w-[356px] h-[48px] rounded-xl bg-white border border-[1px] border-[#000000] gap-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors
            "
          >
            <BsTelephone className="w-5 h-5 text-gray-500 absolute left-5" />
            <span>Số điện thoại</span>
          </button>
          <div className="flex justify-center w-[356px] h-[48px] rounded-[15px] items-center text-center bg-[#FFFFFF] border-[1px] border-[#000000]">
            <input
              type="text"
              className="font-['Poppins',_sans-serif] w-[302px] h-full outline-none text-center text-[#000000] "
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div className="flex justify-center w-[356px] h-[48px] rounded-[15px] items-center text-center bg-[#FFFFFF] border-[1px] border-[#000000]">
            <input
              type="password"
              className="font-['Poppins',_sans-serif] w-[302px] h-full outline-none text-center text-[#000000]"
              placeholder="Nhập mật khẩu"
            />
          </div>
        </form>
        <div className="flex gap-[8px] mt-4">
          <button className="w-[174px] h-[48px] font-['Poppins',_sans-serif] border-[1px] border-[#000000] bg-[#FFFFFF] rounded-[15px] hover:bg-[#0292D3] hover:text-[#FFFFFF] transition-colors">
            Đăng nhập
          </button>
          <button className="w-[174px] h-[48px] font-['Poppins',_sans-serif] border-[1px] border-[#000000] bg-[#0292D3] rounded-[15px] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000] transition-colors">
            Đăng ký
          </button>
        </div>
        <div className="flex flex-col items-center text-xs mt-4 font-['Poppins',_sans-serif] text-center text-[#4F4F4F] gap-1">
          <span>Bằng cách đăng ký và đăng nhập, bạn đã hiểu và đồng ý với</span>
          <span>Điều khoản sử dụng và Chính sách bảo mật của TourVN </span>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
