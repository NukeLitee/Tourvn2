import mongoose from "mongoose";
import dotenv from "dotenv";
import tours from "./data/tours.js"; // Import dữ liệu từ file trên
import User from "./models/userModel.js";
import Tour from "./models/tourModel.js";
import Booking from "./models/bookingModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Xóa sạch dữ liệu cũ để tránh trùng lặp
    await Booking.deleteMany();
    await Tour.deleteMany();
    // await User.deleteMany(); // Bỏ comment nếu muốn xóa cả user

    // Nhập dữ liệu tour mới
    await Tour.insertMany(tours);

    console.log("Dữ liệu đã được nhập thành công!");
    process.exit();
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Booking.deleteMany();
    await Tour.deleteMany();
    // await User.deleteMany();

    console.log("Dữ liệu đã bị xóa!");
    process.exit();
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
    process.exit(1);
  }
};

// Kiểm tra tham số dòng lệnh để quyết định nhập hay xóa
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
