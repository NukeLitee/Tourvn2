// /frontend/src/components/common/TourImageGallery.jsx

import React from 'react';

function TourImageGallery({ images }) {
  // Ảnh mặc định nếu prop 'images' không được truyền
  const defaultImages = [
    'https://via.placeholder.com/765x455',
    'https://via.placeholder.com/373x224',
    'https://via.placeholder.com/182x223',
    'https://via.placeholder.com/183x223',
  ];
  
  // Sử dụng 'images' prop nếu có, nếu không thì dùng 'defaultImages'
  const displayImages = (images && images.length >= 4) ? images : defaultImages;

  return (
    // Container chính w-1160px h-455px
    <div className="w-full h-[455px] relative">
      
      {/* Bố cục Flexbox (gap-2 tạo khoảng cách 8px) */}
      <div className="flex h-full gap-2">
        
        {/* Cột Trái (2/3 chiều rộng) */}
        <div className="w-2/3 h-full">
          <img 
            src={displayImages[0]} 
            alt="Tour Gallery 1" 
            className="w-full h-full object-cover rounded-l-xl" // Bo góc trái
          />
        </div>
        
        {/* Cột Phải (1/3 chiều rộng) */}
        <div className="w-1/3 h-full flex flex-col gap-2">
          
          {/* Hàng Trên (1/2 chiều cao) */}
          <div className="h-1/2">
            <img 
              src={displayImages[1]} 
              alt="Tour Gallery 2" 
              className="w-full h-full object-cover rounded-tr-xl" // Bo góc trên-phải
            />
          </div>
          
          {/* Hàng Dưới (1/2 chiều cao, chứa 2 ảnh nhỏ) */}
          <div className="h-1/2 flex gap-2">
            
            {/* Ảnh dưới-phải-1 (1/2 chiều rộng) */}
            <div className="w-1/2 h-full">
              <img 
                src={displayImages[2]} 
                alt="Tour Gallery 3" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Ảnh dưới-phải-2 (1/2 chiều rộng) */}
            <div className="w-1/2 h-full">
              <img 
                src={displayImages[3]} 
                alt="Tour Gallery 4" 
                className="w-full h-full object-cover rounded-br-xl" // Bo góc dưới-phải
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Nút "Thư viện ảnh" */}
      <button className="
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
      ">
        Thư viện ảnh
      </button>
    </div>
  );
}

export default TourImageGallery;