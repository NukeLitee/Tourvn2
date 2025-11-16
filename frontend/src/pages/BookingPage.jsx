import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// 1. Import TẤT CẢ nguồn dữ liệu
import { sampleToursData, chotkeoData, experienceData } from "../data.js";

import BookingForm from "../components/common/BookingForm";
import CheckoutSidebar from "../components/common/CheckoutSidebar";
import TourCardDiv from "../components/layout/TourCardDiv";
import Header from "../components/common/Header";
import TourImageGallery from "../components/common/TourImageGallery";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

function BookingPage() {
  const { id } = useParams();
  const [tourData, setTourData] = useState(null);

  useEffect(() => {
    // 2. GỘP tất cả dữ liệu vào một mảng chung để tìm kiếm
    // (Lưu ý: Đảm bảo ID giữa các mảng không bị trùng nhau, ví dụ: tour1, c1, e1...)
    const allProducts = [
      ...(sampleToursData || []),
      ...(chotkeoData || []),
      ...(experienceData || []),
    ];

    // 3. Tìm sản phẩm trong danh sách gộp
    const foundTour = allProducts.find((t) => String(t.id) === String(id));

    if (foundTour) {
      // 4. Xử lý ảnh cho Gallery
      // Nếu data gốc chỉ có 1 'image', ta nhân bản nó lên thành 4 để Gallery không bị lỗi
      const galleryImages =
        foundTour.images && foundTour.images.length >= 4
          ? foundTour.images
          : [
              foundTour.image,
              foundTour.image,
              foundTour.image,
              foundTour.image,
            ];

      setTourData({
        ...foundTour,
        images: galleryImages,
      });
    }
  }, [id]);

  const handleBookingSubmit = (formData) => {
    console.log("Đang gửi đơn hàng cho:", tourData?.title);
    // Logic submit...
  };

  // Hiển thị loading/lỗi nếu chưa có data
  if (!tourData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto pt-20 text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            Đang tải thông tin hoặc không tìm thấy dịch vụ...
          </h2>
          <p className="text-gray-400 mt-2">ID đang tìm: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-['Poppins',_sans-serif]">
      <Header />

      <main className="container mx-auto max-w-[1160px] py-10 px-4">
        {/* --- PHẦN 1: TIÊU ĐỀ & GALLERY --- */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {tourData.title}
        </h2>

        <TourImageGallery images={tourData.images} />

        {/* --- PHẦN 2: BỐ CỤC 2 CỘT --- */}
        <div className="flex flex-col lg:flex-row lg:gap-8 mt-8">
          {/* CỘT TRÁI: HỘP THÔNG BÁO */}
          <div className="w-full lg:flex-grow">
            <div className="bg-pink-50 border border-pink-200 text-pink-800 p-5 rounded-xl">
              <div className="flex items-start">
                <InformationCircleIcon className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-pink-600" />
                <ul className="text-sm list-disc list-inside space-y-2">
                  <li>Tiết kiệm đến nơi phiêu lưu thời gian sắp hàng...</li>
                  <li>Đăng ký dễ dàng nhất, hoàn tất thủ tục trong 60 giây.</li>
                  <li>
                    Xét duyệt nhanh nhất, hoàn thành xét duyệt chỉ trong 1 ngày
                    làm việc.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: CHECKOUT SIDEBAR */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0 mt-8 lg:mt-0">
            <CheckoutSidebar
              price={tourData.price}
              currency={tourData.currency || "VNĐ"}
              onSubmit={handleBookingSubmit}
            />
          </div>
        </div>

        {/* --- PHẦN 3: GỢI Ý --- */}
        <div className="mt-16 pb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Có thể bạn sẽ thích
          </h2>
          <TourCardDiv />
        </div>
      </main>
    </div>
  );
}

export default BookingPage;
