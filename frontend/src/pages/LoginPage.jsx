import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Import hook useAuth
import logo from "../assets/images/LogoTourVN.jpg";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";

function LoginPage() {
  // State để lưu dữ liệu người dùng nhập
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Lấy hàm login và các state từ Context
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  // Hàm xử lý khi bấm nút Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn trang web reload
    const success = await login(email, password);
    if (success) {
      alert("Đăng nhập thành công!");
      navigate("/"); // Chuyển hướng về trang chủ
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center font-['Poppins',_sans-serif]"
      style={{
        background:
          "linear-gradient(69deg, rgba(0, 219, 222, 1) 0%, rgba(142, 132, 245, 1) 100%)",
      }}
    >
      <div className="flex flex-col justify-center items-center bg-[#DDF4FF] w-[436px] h-auto py-10 rounded-[20px] relative shadow-2xl">
        <img
          src={logo}
          alt="logo"
          className="w-[82px] h-[24px] absolute top-8 left-10"
        />
        <h3 className="text-[28px] mb-[44px] mt-[24px]">Đăng nhập</h3>

        {/* Hiển thị lỗi nếu đăng nhập thất bại */}
        {error && (
          <p className="text-red-500 text-sm mb-4 px-4 text-center">{error}</p>
        )}

        {/* Form xử lý submit */}
        <form
          className="flex flex-col items-center gap-4 w-full"
          onSubmit={handleLogin}
        >
          {/* Các nút Social Login (Giữ nguyên UI) */}
          <button
            type="button"
            className="relative flex items-center justify-center w-[356px] h-[48px] rounded-xl bg-white border border-[1px] border-[#000000] gap-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FcGoogle className="w-6 h-6 absolute left-5" />
            <span>Google</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center w-[356px] h-[48px] rounded-xl bg-white border border-[1px] border-[#000000] font-medium text-gray-700 hover:bg-gray-50 transition-colors relative"
          >
            <HiOutlineMail className="w-6 h-6 text-gray-500 absolute left-5" />
            <span>Email</span>
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center w-[356px] h-[48px] rounded-xl bg-white border border-[1px] border-[#000000] gap-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <BsTelephone className="w-5 h-5 text-gray-500 absolute left-5" />
            <span>Số điện thoại</span>
          </button>

          {/* Input Email */}
          <div className="flex justify-center w-[356px] h-[48px] rounded-[15px] items-center text-center bg-[#FFFFFF] border-[1px] border-[#000000]">
            <input
              type="email"
              className="font-['Poppins',_sans-serif] w-[302px] h-full outline-none text-center text-[#000000]"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div className="flex justify-center w-[356px] h-[48px] rounded-[15px] items-center text-center bg-[#FFFFFF] border-[1px] border-[#000000]">
            <input
              type="password"
              className="font-['Poppins',_sans-serif] w-[302px] h-full outline-none text-center text-[#000000]"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Các nút hành động */}
          <div className="flex gap-[8px] mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-[174px] h-[48px] border-[1px] border-[#000000] bg-[#FFFFFF] rounded-[15px] hover:bg-[#0292D3] hover:text-[#FFFFFF] transition-colors disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-[174px] h-[48px] border-[1px] border-[#000000] bg-[#0292D3] rounded-[15px] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000] transition-colors"
            >
              Đăng ký
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center text-xs mt-4 text-center text-[#4F4F4F] gap-1 px-4">
          <span>Bằng cách đăng ký và đăng nhập, bạn đã hiểu và đồng ý với</span>
          <span className="underline cursor-pointer">
            Điều khoản sử dụng và Chính sách bảo mật của TourVN
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
