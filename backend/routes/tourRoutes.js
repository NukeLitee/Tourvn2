import express from "express";
import {
  getAllTours,
  getTourById,
  getToursByCategory,
} from "../controllers/tourController.js";

const router = express.Router();

// GET /api/tours (Lấy tất cả tour)
router.route("/").get(getAllTours);

// GET /api/tours/category/:categoryName (Lấy tour theo loại)
router.route("/category/:category").get(getToursByCategory);

// GET /api/tours/:id (Lấy 1 tour bằng ID)
router.route("/:id").get(getTourById);

export default router;
