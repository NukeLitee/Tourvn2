import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Tạo đơn hàng mới
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Không có sản phẩm nào trong giỏ hàng");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: true, // Giả sử thanh toán luôn thành công cho demo
      paidAt: Date.now(),
      status: "Đang xử lý",
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Lấy đơn hàng của người dùng đã đăng nhập
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // Tìm đơn hàng theo user ID và sắp xếp mới nhất lên đầu
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

export { addOrderItems, getMyOrders };
