import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import tourRoutes from "./routes/tourRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tours", tourRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

// --- CẤU HÌNH STATIC FOLDER (SỬA LẠI CHO ĐÚNG CẤU TRÚC CỦA BẠN) ---
const __dirname = path.resolve();

// Code cũ (SAI với máy bạn): app.use('/images', express.static(path.join(__dirname, 'images')));

// Code mới (ĐÚNG): Trỏ vào thư mục 'data/images' như trong hình bạn gửi
app.use("/images", express.static(path.join(__dirname, "data", "images")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
