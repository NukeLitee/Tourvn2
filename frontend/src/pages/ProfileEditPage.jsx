import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileLayout from "../components/layout/ProfileLayout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function ProfileEditPage() {
  const { user, updateProfile, loading } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState(""); // Thêm đổi mật khẩu nếu muốn
  const [message, setMessage] = useState("");

  // Điền dữ liệu cũ vào form
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Gọi hàm updateProfile từ Context
    const result = await updateProfile({
      name,
      phone,
      address,
      password: password || undefined, // Chỉ gửi password nếu người dùng nhập
    });

    if (result.success) {
      setMessage("Cập nhật thông tin thành công!");
      setPassword(""); // Xóa mật khẩu sau khi lưu
    } else {
      setMessage("Lỗi: " + result.message);
    }
  };

  return (
    <ProfileLayout>
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Thông tin cá nhân
        </h2>

        {message && (
          <div
            className={`p-3 rounded mb-4 text-sm ${
              message.includes("thành công")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ tên"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ"
            />
          </div>

          {/* Email (Không cho sửa) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="w-full h-[48px] rounded-xl bg-gray-100 border border-gray-300 px-4 flex items-center text-gray-500 cursor-not-allowed">
              {user?.email}
            </div>
          </div>

          {/* Mật khẩu mới (Tùy chọn) */}
          <div className="mt-4 border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đổi mật khẩu mới (Để trống nếu không đổi)
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="mt-4 w-32"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </form>
      </div>
    </ProfileLayout>
  );
}

export default ProfileEditPage;
