import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/users/register (Đăng ký)
router.route("/register").post(registerUser);

// POST /api/users/login (Đăng nhập)
router.route("/login").post(loginUser);

// GET /api/users/profile (Lấy thông tin cá nhân - cần đăng nhập)
router.route("/profile").get(protect, getUserProfile);

export default router;
