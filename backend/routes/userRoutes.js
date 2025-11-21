import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  saveVoucher, // Import
  getUserVouchers, // Import
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// ✅ Route mới cho Vouchers
router
  .route("/vouchers")
  .post(protect, saveVoucher) // Lưu voucher
  .get(protect, getUserVouchers); // Lấy danh sách

export default router;
