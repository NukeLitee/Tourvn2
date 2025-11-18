import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Middleware "protect" để bảo vệ các route cần đăng nhập
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Lấy token từ header 'Authorization'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Lấy thông tin user từ token (trừ mật khẩu)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Xác thực thất bại, token không hợp lệ");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Xác thực thất bại, không tìm thấy token");
  }
});

// (Tùy chọn) Middleware kiểm tra Admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Không có quyền Admin");
  }
};

export { protect, admin };
