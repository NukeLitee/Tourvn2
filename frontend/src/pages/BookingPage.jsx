import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

import CheckoutSidebar from "../components/common/CheckoutSidebar";
import TourCardDiv from "../components/layout/TourCardDiv";
import Header from "../components/common/Header";
import TourImageGallery from "../components/common/TourImageGallery";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // State quản lý dữ liệu và trạng thái tải
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetch dữ liệu từ API Backend
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setLoading(true);
        setError(null); // Reset lỗi trước khi gọi mới

        // GỌI API THẬT TỪ BACKEND
        const response = await fetch(`http://localhost:5000/api/tours/${id}`);

        if (!response.ok) {
          // Thử đọc tin nhắn lỗi từ backend gửi về
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Lỗi kết nối: ${response.status}`
          );
        }

        const data = await response.json();

        // Xử lý logic ảnh (nếu API trả về ít ảnh, tự nhân bản để Gallery đẹp)
        const galleryImages =
          data.images && data.images.length >= 4
            ? data.images
            : [
                data.image || "https://via.placeholder.com/765x455",
                data.image || "https://via.placeholder.com/373x224",
                data.image || "https://via.placeholder.com/182x223",
                data.image || "https://via.placeholder.com/183x223",
              ];

        setTourData({ ...data, images: galleryImages });
      } catch (err) {
        console.error("Lỗi fetch tour:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTourDetails();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!tourData) return;

    const itemToAdd = {
      id: tourData._id, // Lưu ý dùng _id từ MongoDB
      title: tourData.title,
      image: tourData.image,
      price: tourData.price,
      description: `[${tourData.tags?.[0] || "Ưu đãi"}] ${tourData.title}`,
      tag: tourData.salePercentage
        ? `Sale ${tourData.salePercentage}`
        : tourData.tags?.[0] || null,
      quantity: 1,
    };

    addToCart(itemToAdd);
    alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
    navigate("/cart");
  };

  // 1. Màn hình Loading
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-gray-600 font-medium">
            Đang tải thông tin tour...
          </div>
        </div>
      </>
    );
  }

  // 2. Màn hình Lỗi
  if (error || !tourData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
          <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Không tìm thấy trang
            </h2>
            <p className="text-gray-500 mb-6">
              {error || "Tour này không tồn tại hoặc đã bị xóa."}
            </p>
            <p className="text-sm text-gray-400 mb-6">ID đang tìm: {id}</p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>
      </>
    );
  }

  // 3. Màn hình hiển thị chi tiết (Khi có dữ liệu)
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen font-['Poppins',_sans-serif]">
        <main className="container mx-auto max-w-[1160px] py-10 px-4">
          {/* Title & Gallery */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {tourData.title}
          </h2>
          <TourImageGallery images={tourData.images} />

          {/* Content & Sidebar */}
          <div className="flex flex-col lg:flex-row lg:gap-8 mt-8">
            {/* Cột trái */}
            <div className="w-full lg:flex-grow">
              <div className="bg-pink-50 border border-pink-200 text-pink-800 p-5 rounded-xl">
                <div className="flex items-start">
                  <InformationCircleIcon className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-pink-600" />
                  <ul className="text-sm list-disc list-inside space-y-2">
                    <li>Tiết kiệm đến nơi phiêu lưu thời gian sắp hàng...</li>
                    <li>
                      Đăng ký dễ dàng nhất, hoàn tất thủ tục trong 60 giây.
                    </li>
                    <li>
                      Xét duyệt nhanh nhất, hoàn thành xét duyệt chỉ trong 1
                      ngày làm việc.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hiển thị mô tả chi tiết từ DB */}
              <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Giới thiệu dịch vụ
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {tourData.description ||
                    "Chưa có mô tả chi tiết cho dịch vụ này."}
                </p>
              </div>
            </div>

            {/* Cột phải: Sidebar */}
            <div className="w-full lg:w-[360px] lg:flex-shrink-0 mt-8 lg:mt-0">
              <CheckoutSidebar
                price={Number(tourData.price).toLocaleString("vi-VN")}
                currency={tourData.currency || "VNĐ"}
                onSubmit={handleAddToCart}
                submitButtonText="Thêm vào giỏ hàng"
              />
            </div>
          </div>

          {/* Gợi ý - Vẫn dùng component cũ nhưng nên cập nhật nó sau để fetch API */}
          <div className="mt-16 pb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Có thể bạn sẽ thích
            </h2>
            <TourCardDiv />
          </div>
        </main>
      </div>
    </>
  );
}

export default BookingPage;
