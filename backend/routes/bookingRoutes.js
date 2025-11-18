import express from "express";
import {
  createBooking,
  getMyBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/bookings (Tạo đơn đặt hàng - cần đăng nhập)
router.route("/").post(protect, createBooking);

// GET /api/bookings/mybookings (Lấy đơn hàng của tôi - cần đăng nhập)
router.route("/mybookings").get(protect, getMyBookings);

export default router;
