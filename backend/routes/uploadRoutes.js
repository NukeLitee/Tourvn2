import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Lỗi: Chỉ chấp nhận file ảnh!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Route Upload
router.post("/", upload.single("image"), (req, res) => {
  // Thay res.send thành res.json để trả về định dạng JSON chuẩn
  // Điều này sẽ biến chuỗi /uploads/abc.jpg thành "/uploads/abc.jpg" (có ngoặc kép)
  res.json(`/${req.file.path.replace(/\\/g, "/")}`);
});

export default router;
