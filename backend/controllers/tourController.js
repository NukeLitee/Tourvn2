import asyncHandler from "express-async-handler";
import mongoose from "mongoose"; // 1. Import mongoose
import Tour from "../models/tourModel.js";

// @desc    Lấy tất cả sản phẩm
// @route   GET /api/tours
// @access  Public
const getAllTours = asyncHandler(async (req, res) => {
  const tours = await Tour.find({});
  res.json(tours);
});

// @desc    Lấy 1 sản phẩm bằng ID
// @route   GET /api/tours/:id
// @access  Public
const getTourById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 2. QUAN TRỌNG: Kiểm tra ID có đúng định dạng MongoDB không
  // Nếu ID là "2", "c2"... (dữ liệu cũ) thì sẽ chặn lại ngay, không để Server bị sập
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error(`Sản phẩm không tìm thấy (ID không hợp lệ: ${id})`);
  }

  // 3. Tìm trong DB
  const tour = await Tour.findById(id);

  if (tour) {
    res.json(tour);
  } else {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }
});

// @desc    Lấy sản phẩm theo danh mục
// @route   GET /api/tours/category/:category
// @access  Public
const getToursByCategory = asyncHandler(async (req, res) => {
  const tours = await Tour.find({ category: req.params.category });
  res.json(tours);
});

export { getAllTours, getTourById, getToursByCategory };
