import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import tourRoutes from "./routes/tourRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/tours", tourRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload", uploadRoutes);

// --- CẤU HÌNH STATIC FOLDER (QUAN TRỌNG) ---
// Lấy đường dẫn thư mục hiện tại (cách làm cho ES Module)
const __dirname = path.resolve();

// Cho phép truy cập thư mục 'uploads' thông qua đường dẫn /uploads
// Ví dụ: Nếu có file ảnh backend/uploads/image-123.png,
// trình duyệt có thể xem qua http://localhost:5000/uploads/image-123.png
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
