import asyncHandler from "express-async-handler";
import Booking from "../models/bookingModel.js";

// @desc    Tạo đơn đặt hàng mới
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  // Dữ liệu gửi lên từ CartPage (sau khi nhấn "Thanh toán")
  const { cartItems, totalPrice } = req.body;

  if (!cartItems || cartItems.length === 0) {
    res.status(400);
    throw new Error("Không có sản phẩm nào trong giỏ hàng");
  }

  // 1. Chuyển đổi cartItems (từ Context) thành bookingItems (cho Model)
  const bookingItems = cartItems.map((item) => ({
    title: item.title,
    quantity: item.quantity,
    image: item.image,
    price: parseFloat(String(item.price).replace(/[.,]/g, "")), // Đảm bảo giá là Number
    tour: item.id, // Lưu ID của tour
  }));

  // 2. Tính lại tổng tiền ở backend (để bảo mật, không tin tưởng frontend)
  const calculatedTotalPrice = bookingItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 3. Tạo đơn hàng mới
  const booking = new Booking({
    user: req.user._id, // Lấy từ middleware 'protect'
    bookingItems,
    totalPrice: calculatedTotalPrice,
    status: "pending", // Mặc định là 'chờ xử lý'
  });

  const createdBooking = await booking.save();

  // 4. Trả về đơn hàng đã tạo
  res.status(201).json(createdBooking);
});

// @desc    Lấy các đơn hàng của người dùng
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
});

export { createBooking, getMyBookings };
