import jwt from "jsonwebtoken";

// Hàm helper để tạo token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Hết hạn sau 30 ngày
  });
};

export default generateToken;
