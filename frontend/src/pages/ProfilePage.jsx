import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import ProfileSidebar from "../components/profile/ProfileSideBar";
import { useAuth } from "../context/AuthContext";
import {
  EyeSlashIcon,
  ChevronRightIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function ProfilePage() {
  const { user, updateProfile, loading } = useAuth();

  // State cho các form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ type: "", content: "" });
  const [uploading, setUploading] = useState(false);

  // Load dữ liệu user vào form
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        email: user.email || "",
        avatar: user.avatar || "",
      }));
    }
  }, [user]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý Upload Avatar
  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);
    setUploading(true);
    setMessage({ type: "", content: "" }); // Reset thông báo cũ

    try {
      // Thêm log để debug
      console.log("Đang gửi ảnh lên:", "http://localhost:5000/api/upload");

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formDataUpload,
        // LƯU Ý: KHÔNG ĐƯỢC THÊM 'Content-Type': 'multipart/form-data'
        // Fetch sẽ tự động thêm header này kèm theo boundary chính xác
      });

      // Kiểm tra nếu lỗi (ví dụ 404 hoặc 500)
      if (!res.ok) {
        const errorText = await res.text(); // Đọc lỗi từ server trả về
        throw new Error(`Lỗi Server (${res.status}): ${errorText}`);
      }

      const data = await res.json(); // data chính là đường dẫn ảnh: "/uploads/image-..."
      console.log("Upload thành công, đường dẫn:", data);

      // Cập nhật state để hiển thị ngay
      setFormData((prev) => ({ ...prev, avatar: data }));

      // Gọi API cập nhật profile để lưu đường dẫn vào DB
      const updateRes = await updateProfile({ avatar: data });

      if (updateRes.success) {
        setMessage({
          type: "success",
          content: "Cập nhật ảnh đại diện thành công!",
        });
      } else {
        setMessage({
          type: "error",
          content: "Đã upload nhưng lỗi lưu vào DB: " + updateRes.message,
        });
      }
    } catch (error) {
      console.error("Lỗi chi tiết:", error); // Xem lỗi này trong F12 -> Console
      setMessage({ type: "error", content: `Lỗi upload: ${error.message}` });
    } finally {
      setUploading(false);
    }
  };

  // Xử lý Lưu Thông tin cá nhân
  const handleSaveInfo = async () => {
    setMessage({ type: "", content: "" });
    const result = await updateProfile({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    });
    if (result.success) {
      setMessage({
        type: "success",
        content: "Cập nhật thông tin thành công!",
      });
    } else {
      setMessage({ type: "error", content: result.message });
    }
  };

  // Xử lý Lưu Mật khẩu
  const handleSavePassword = async () => {
    setMessage({ type: "", content: "" });
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", content: "Mật khẩu xác nhận không khớp!" });
      return;
    }
    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        content: "Mật khẩu phải có ít nhất 6 ký tự",
      });
      return;
    }

    const result = await updateProfile({ password: formData.password });
    if (result.success) {
      setMessage({ type: "success", content: "Đổi mật khẩu thành công!" });
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } else {
      setMessage({ type: "error", content: result.message });
    }
  };

  // Hàm helper lấy URL ảnh
  const getAvatarUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `http://localhost:5000${path}`;
  };

  return (
    <div className="bg-[#EBF8FF] min-h-screen font-['Poppins',_sans-serif]">
      <Header />

      <main className="container mx-auto max-w-[1160px] py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* CỘT TRÁI: SIDEBAR */}
          <ProfileSidebar />

          {/* CỘT PHẢI: NỘI DUNG CHÍNH */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Thông báo chung */}
            {message.content && (
              <div
                className={`p-4 rounded-lg text-sm font-medium ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.content}
              </div>
            )}

            {/* 1. Thông tin cá nhân & Avatar */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Thông tin cá nhân
              </h2>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 relative group">
                    {formData.avatar ? (
                      <img
                        src={getAvatarUrl(formData.avatar)}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="w-full h-full text-gray-300" />
                    )}

                    {/* Overlay Upload Icon */}
                    <label
                      htmlFor="avatar-upload"
                      className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    >
                      <CameraIcon className="w-8 h-8 text-white" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadAvatar}
                      disabled={uploading}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {uploading ? "Đang tải..." : "Thay đổi ảnh"}
                  </span>
                </div>

                {/* Form Inputs */}
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-[#0292D3]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-[#0292D3]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-[#0292D3]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Không thể thay đổi)
                    </label>
                    <div className="w-full h-10 px-3 bg-gray-100 border border-gray-300 rounded-lg flex items-center text-gray-500 text-sm">
                      {formData.email}
                    </div>
                  </div>

                  <div className="md:col-span-2 mt-2">
                    <button
                      onClick={handleSaveInfo}
                      disabled={loading}
                      className="px-6 py-2 bg-[#0292D3] text-white rounded-full text-sm font-medium hover:bg-[#0281ba] transition-colors"
                    >
                      Lưu thông tin
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Đổi mật khẩu */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Đổi mật khẩu
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Đặt mật khẩu mới để bảo vệ tài khoản của bạn.
              </p>

              <div className="flex flex-col gap-4 max-w-md">
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu mới"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-gray-300 rounded-full outline-none focus:border-[#0292D3]"
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-gray-300 rounded-full outline-none focus:border-[#0292D3]"
                  />
                </div>

                <button
                  onClick={handleSavePassword}
                  disabled={loading}
                  className="w-24 h-10 bg-[#D9D9D9] text-white font-medium rounded-full mt-2 hover:bg-gray-400 transition-colors"
                >
                  Lưu
                </button>
              </div>
            </div>

            {/* 3. Tuỳ chỉnh thông báo (Chỉ là UI, vì Backend chưa hỗ trợ lưu setting này) */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Tuỳ chỉnh thông báo
              </h2>
              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">
                    Cập nhật và Ưu đãi
                  </h4>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="text-[#0292D3] rounded"
                      />{" "}
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="text-[#0292D3] rounded"
                      />{" "}
                      <span className="text-sm">SMS</span>
                    </label>
                  </div>
                </div>
                <button className="px-6 py-2 bg-[#D9D9D9] text-white font-medium rounded-full hover:bg-gray-400 transition-colors text-sm">
                  Cập nhật tuỳ chọn
                </button>
              </div>
            </div>

            {/* 4. Xoá tài khoản */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-medium text-red-600">Xoá tài khoản</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Hành động này không thể hoàn tác
                  </p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
