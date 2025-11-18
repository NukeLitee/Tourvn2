const tours = [
  // --- LOẠI 1: TOUR (Cho TourCardDiv) ---
  {
    title: "Vé Xe Buýt 2 Tầng Ngắm Cảnh - TP.HCM",
    image: "./images/tour-1.jpg", // Đảm bảo bạn đã có ảnh này trong backend/public/images/
    price: 150000,
    currency: "VNĐ",
    category: "tour", // Quan trọng
    tags: ["Phổ biến", "Ngắm cảnh"],
    rating: 4.5,
    reviewsCount: 1200,
    bookingsCount: "5k+",
    salePercentage: "10%",
    subtitle1: "Khám phá Sài Gòn",
    subtitle2: "TP. Hồ Chí Minh",
    buttonText: "Đặt ngay",
    description:
      "Ngắm nhìn toàn cảnh thành phố Hồ Chí Minh từ xe buýt 2 tầng thoáng nóc...",
    images: [
      "./images/tour-1.jpg",
      "./images/tour-2.jpg",
      "./images/tour-3.jpg",
      "./images/tour-4.jpg",
    ],
  },
  {
    title: "Tour Địa Đạo Củ Chi Nửa Ngày",
    image: "/images/tour-2.jpg",
    price: 450000,
    category: "tour",
    tags: ["Lịch sử", "Tour ngày"],
    rating: 4.8,
    reviewsCount: 850,
    bookingsCount: "2k+",
    images: ["/images/tour-2.jpg", "/images/tour-1.jpg"],
  },
  {
    title: "Khám Phá Đồng Bằng Sông Cửu Long",
    image: "/images/tour-3.jpg",
    price: 800000,
    category: "tour",
    tags: ["Thiên nhiên", "Sông nước"],
    rating: 4.7,
    reviewsCount: 500,
    bookingsCount: "1k+",
    images: ["/images/tour-3.jpg"],
  },
  {
    title: "Tour Ẩm Thực Đường Phố Sài Gòn",
    image: "/images/tour-4.jpg",
    price: 600000,
    category: "tour",
    tags: ["Ẩm thực", "Xe máy"],
    rating: 4.9,
    reviewsCount: 2100,
    bookingsCount: "8k+",
    images: ["/images/tour-4.jpg"],
  },

  // --- LOẠI 2: CHỐT KÈO (Cho SectionChotKeo) ---
  {
    title: "Du Thuyền Ăn Tối Sông Sài Gòn - Deal Sốc",
    image: "/images/tour-2.jpg",
    price: 350000,
    category: "chotkeo", // Quan trọng
    tags: ["Flash Sale", "Ăn tối"],
    rating: 4.6,
    reviewsCount: 300,
    bookingsCount: "900+",
    salePercentage: "30%",
    images: ["/images/tour-2.jpg"],
  },
  {
    title: "Vé Công Viên Nước Đầm Sen - Mua 1 Tặng 1",
    image: "/images/tour-3.jpg",
    price: 120000,
    category: "chotkeo",
    tags: ["Mua 1 tặng 1"],
    rating: 4.2,
    reviewsCount: 150,
    bookingsCount: "3k+",
    salePercentage: "50%",
    images: ["/images/tour-3.jpg"],
  },
  {
    title: "Buffet Tối 5 Sao Tại Landmark 81",
    image: "/images/tour-1.jpg",
    price: 1500000,
    category: "chotkeo",
    tags: ["Sang trọng"],
    rating: 5.0,
    reviewsCount: 100,
    bookingsCount: "200+",
    salePercentage: "15%",
    images: ["/images/tour-1.jpg"],
  },
  {
    title: "Vé Xem Show À Ố - Giá Hủy Diệt",
    image: "/images/tour-4.jpg",
    price: 500000,
    category: "chotkeo",
    tags: ["Nghệ thuật"],
    rating: 4.9,
    reviewsCount: 600,
    bookingsCount: "1.5k+",
    salePercentage: "25%",
    images: ["/images/tour-4.jpg"],
  },

  // --- LOẠI 3: TRẢI NGHIỆM (Cho FeaturedActivities) ---
  {
    title: "Vé Tham Quan Landmark 81 SkyView",
    image: "/images/tour-3.jpg",
    price: 810000,
    category: "experience", // Quan trọng
    tags: ["Vé tham quan", "Hot"],
    rating: 4.8,
    reviewsCount: 5000,
    bookingsCount: "50k+",
    subtitle1: "Ngắm toàn cảnh Sài Gòn",
    subtitle2: "Trải nghiệm độ cao",
    buttonText: "Đặt ngay",
    images: ["/images/tour-2.jpg", "/images/tour-1.jpg"],
  },
  {
    title: "Lớp Học Nấu Ăn Món Việt",
    image: "/images/tour-4.jpg",
    price: 400000,
    category: "experience",
    tags: ["Văn hóa", "Học tập"],
    rating: 4.9,
    reviewsCount: 200,
    bookingsCount: "500+",
    subtitle1: "Tự tay làm Phở",
    subtitle2: "Trải nghiệm văn hóa",
    buttonText: "Tham gia",
    images: ["/images/tour-4.jpg"],
  },
  {
    title: "Vé Bảo Tàng Chứng Tích Chiến Tranh",
    image: "/images/tour-1.jpg",
    price: 40000,
    category: "experience",
    tags: ["Lịch sử"],
    rating: 4.7,
    reviewsCount: 10000,
    bookingsCount: "100k+",
    subtitle1: "Tìm hiểu lịch sử",
    subtitle2: "Bảo tàng",
    buttonText: "Mua vé",
    images: ["./images/tour-1.jpg"],
  },
  {
    title: "Workshop Làm Gốm",
    image: "/images/tour-2.jpg",
    price: 250000,
    category: "experience",
    tags: ["Thủ công"],
    rating: 4.6,
    reviewsCount: 150,
    bookingsCount: "300+",
    subtitle1: "Sáng tạo nghệ thuật",
    subtitle2: "Cuối tuần",
    buttonText: "Đặt chỗ",
    images: ["./public/images/tour-1.jpg"],
  },
  {
    title: "Workshop Làm Gốm",
    image: "/images/tour-2.jpg",
    price: 250000,
    category: "experience",
    tags: ["Thủ công"],
    rating: 4.6,
    reviewsCount: 150,
    bookingsCount: "300+",
    subtitle1: "Sáng tạo nghệ thuật",
    subtitle2: "Cuối tuần",
    buttonText: "Đặt chỗ",
    images: ["./public/images/tour-1.jpg"],
  },
];

export default tours;
// ```

// ---

// ### Bước 2: Chạy lệnh Seeder để "Đẩy" dữ liệu vào MongoDB

// Mở terminal tại thư mục `backend` và chạy lệnh sau (lệnh này sẽ xóa dữ liệu cũ và nạp dữ liệu mới từ file trên):

// ```bash
// node seeder.js
