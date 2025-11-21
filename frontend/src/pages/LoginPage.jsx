import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/images/LogoTourVN.jpg";

// Icons
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";

// Common Components
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import SocialButton from "../components/common/SocialButton";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      alert("Đăng nhập thành công!");
      navigate("/");
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center font-['Poppins',_sans-serif]"
      // Sử dụng lại background gradient cũ của bạn
      style={{
        background:
          "linear-gradient(69deg, rgba(0, 219, 222, 1) 0%, rgba(142, 132, 245, 1) 100%)",
      }}
    >
      {/* Container chính: Giữ nguyên style cũ */}
      <div className="flex flex-col justify-center items-center bg-[#DDF4FF] w-[436px] h-[663px] rounded-[20px] relative shadow-2xl">
        {/* Logo: Giữ nguyên vị trí absolute */}
        <img
          src={logo}
          alt="logo"
          className="w-[82px] h-[24px] absolute top-8 left-10"
        />

        {/* Tiêu đề: Giữ nguyên style cũ */}
        <h3 className="font-['Poppins',_sans-serif] text-[28px] mb-[44px] mt-[19px]">
          Đăng nhập hoặc Đăng ký
        </h3>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-red-100 px-4 py-2 rounded w-[356px]">
            {error}
          </p>
        )}

        <form
          className="flex flex-col items-center gap-4 w-full"
          onSubmit={handleLogin}
        >
          {/* Social Buttons */}
          <div className="w-[356px]">
            <SocialButton icon={FcGoogle} label="Google" />
          </div>
          <div className="w-[356px]">
            <SocialButton
              icon={HiOutlineMail}
              label="Email"
              iconColor="text-gray-500"
            />
          </div>
          <div className="w-[356px]">
            <SocialButton
              icon={BsTelephone}
              label="Số điện thoại"
              iconColor="text-gray-500"
            />
          </div>

          {/* Inputs: Cần override style của Input component để giống cũ */}
          <div className="w-[356px]">
            <Input
              type="email"
              placeholder="Nhập email" // Hoặc "Nhập tên đăng nhập" như cũ
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Thêm className để căn giữa text nếu muốn giống hệt cũ: text-center
              className="text-center"
            />
          </div>

          <div className="w-[356px]">
            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center"
            />
          </div>

          {/* Ô nhập lại mật khẩu (Chỉ dùng cho Register, nhưng trong code cũ bạn có để ở Login)
              Nếu bạn muốn bỏ nó ở trang Login thì xóa dòng dưới này đi. 
          */}
          {/* <div className="w-[356px]">
             <Input type="password" placeholder="Nhập lại mật khẩu" className="text-center" />
          </div> */}

          {/* Action Buttons */}
          <div className="flex gap-[8px] mt-4">
            <Button
              type="submit"
              variant="outline" // Hoặc tạo variant mới nếu cần background trắng border đen
              className="w-[174px] h-[48px] border-[1px] border-[#000000] bg-[#FFFFFF] rounded-[15px] hover:bg-[#0292D3] hover:text-[#FFFFFF]"
              disabled={loading}
            >
              {loading ? "..." : "Đăng nhập"}
            </Button>

            <Button
              type="button"
              variant="primary"
              className="w-[174px] h-[48px] border-[1px] border-[#000000] bg-[#0292D3] rounded-[15px] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </Button>
          </div>
        </form>

        {/* Footer Text */}
        <div className="flex flex-col items-center text-xs mt-4 font-['Poppins',_sans-serif] text-center text-[#4F4F4F] gap-1 px-4">
          <span>Bằng cách đăng ký và đăng nhập, bạn đã hiểu và đồng ý với</span>
          <span className="cursor-pointer hover:underline">
            Điều khoản sử dụng và Chính sách bảo mật của TourVN
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
