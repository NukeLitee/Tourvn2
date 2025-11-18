import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// 1. Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Lưu vào thư mục 'uploads/' ở root của backend
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // Đổi tên file: tên-gốc + ngày-giờ + đuôi-file (để tránh trùng tên)
    // Ví dụ: image-123456789.jpg
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// 2. Hàm kiểm tra loại file (chỉ cho phép ảnh)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  // Kiểm tra đuôi file
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Kiểm tra mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Lỗi: Chỉ chấp nhận file ảnh!");
  }
}

// 3. Khởi tạo Multer
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// 4. Tạo Route Upload
// Frontend sẽ gọi POST /api/upload và gửi file kèm theo
router.post("/", upload.single("image"), (req, res) => {
  // Trả về đường dẫn file để Frontend lưu vào state hoặc gửi tiếp lên DB
  // Ví dụ: /uploads/image-171558293.jpg
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
});

export default router;
