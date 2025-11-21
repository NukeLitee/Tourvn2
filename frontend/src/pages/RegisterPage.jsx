import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/images/LogoTourVN.jpg";
// Import icons (nếu cần dùng lại social login)
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      alert("Đăng ký thành công!");
      navigate("/"); // Chuyển về trang chủ
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
        <img src={logo} alt="logo" className="w-[82px] h-[24px] mb-6" />
        <h3 className="text-[28px] mb-6 font-semibold text-gray-900">
          Đăng ký tài khoản
        </h3>

        {error && (
          <p className="text-red-500 text-sm mb-4 px-4 text-center">{error}</p>
        )}

        <form
          className="flex flex-col items-center gap-4 w-full px-6"
          onSubmit={handleRegister}
        >
          {/* Input Tên */}
          <div className="w-[356px] h-[48px] rounded-[15px] bg-white border border-black flex items-center px-4">
            <input
              type="text"
              className="w-full h-full outline-none text-center text-black"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input Email */}
          <div className="w-[356px] h-[48px] rounded-[15px] bg-white border border-black flex items-center px-4">
            <input
              type="email"
              className="w-full h-full outline-none text-center text-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div className="w-[356px] h-[48px] rounded-[15px] bg-white border border-black flex items-center px-4">
            <input
              type="password"
              className="w-full h-full outline-none text-center text-black"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Input Confirm Password */}
          <div className="w-[356px] h-[48px] rounded-[15px] bg-white border border-black flex items-center px-4">
            <input
              type="password"
              className="w-full h-full outline-none text-center text-black"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-[8px] mt-4 w-[356px] justify-center">
            {/* Nút quay lại Đăng nhập */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-[174px] h-[48px] border border-black bg-white rounded-[15px] hover:bg-[#0292D3] hover:text-white transition-colors"
            >
              Đăng nhập
            </button>

            {/* Nút Submit Đăng ký */}
            <button
              type="submit"
              disabled={loading}
              className="w-[174px] h-[48px] border border-black bg-[#0292D3] rounded-[15px] text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Đăng ký"}
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center text-xs mt-4 text-center text-[#4F4F4F] gap-1 px-4">
          <span>Bằng cách đăng ký, bạn đã hiểu và đồng ý với</span>
          <span className="underline cursor-pointer">
            Điều khoản sử dụng và Chính sách bảo mật của TourVN
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
