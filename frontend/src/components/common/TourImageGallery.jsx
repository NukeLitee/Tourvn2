import React from "react";

function TourImageGallery({ images }) {
  // 1. Hàm xử lý đường dẫn ảnh (Quan trọng)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/765x455?text=No+Image";

    // Nếu là link online (http...) thì giữ nguyên
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Nếu là link nội bộ (/images/...) thì ghép với server backend
    return `http://localhost:5000${imagePath}`;
  };

  // Fallback: Nếu không có đủ 4 ảnh, dùng placeholder
  // (Lưu ý: Logic này đã được xử lý 1 phần ở BookingPage, nhưng giữ ở đây để an toàn)
  const defaultImages = [
    "https://via.placeholder.com/765x455",
    "https://via.placeholder.com/373x224",
    "https://via.placeholder.com/182x223",
    "https://via.placeholder.com/183x223",
  ];

  const displayImages = images && images.length >= 4 ? images : defaultImages;

  return (
    // Container chính w-1160px h-455px
    <div className="w-full h-[455px] relative mt-6">
      {/* Bố cục Flexbox (gap-2 tạo khoảng cách 8px) */}
      <div className="flex h-full gap-2">
        {/* Cột Trái (2/3 chiều rộng) - Ảnh Lớn */}
        <div className="w-2/3 h-full">
          <img
            src={getImageUrl(displayImages[0])}
            alt="Tour Gallery 1"
            className="w-full h-full object-cover rounded-l-xl cursor-pointer hover:opacity-95 transition-opacity"
          />
        </div>

        {/* Cột Phải (1/3 chiều rộng) */}
        <div className="w-1/3 h-full flex flex-col gap-2">
          {/* Hàng Trên (1/2 chiều cao) */}
          <div className="h-1/2">
            <img
              src={getImageUrl(displayImages[1])}
              alt="Tour Gallery 2"
              className="w-full h-full object-cover rounded-tr-xl cursor-pointer hover:opacity-95 transition-opacity"
            />
          </div>

          {/* Hàng Dưới (1/2 chiều cao, chứa 2 ảnh nhỏ) */}
          <div className="h-1/2 flex gap-2">
            {/* Ảnh dưới-phải-1 */}
            <div className="w-1/2 h-full">
              <img
                src={getImageUrl(displayImages[2])}
                alt="Tour Gallery 3"
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
              />
            </div>

            {/* Ảnh dưới-phải-2 */}
            <div className="w-1/2 h-full">
              <img
                src={getImageUrl(displayImages[3])}
                alt="Tour Gallery 4"
                className="w-full h-full object-cover rounded-br-xl cursor-pointer hover:opacity-95 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nút "Thư viện ảnh" */}
      <button
        className="
        absolute bottom-4 right-4 
        bg-white 
        text-black 
        text-sm 
        font-semibold 
        px-4 py-2 
        rounded-lg 
        shadow-md
        hover:bg-gray-100
        transition-colors
        z-10
      "
      >
        Thư viện ảnh
      </button>
    </div>
  );
}

export default TourImageGallery;
