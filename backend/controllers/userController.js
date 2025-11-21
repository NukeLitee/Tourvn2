import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Đăng ký người dùng mới
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email đã được sử dụng");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Dữ liệu người dùng không hợp lệ");
  }
});

// @desc    Đăng nhập & lấy token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email hoặc mật khẩu không đúng");
  }
});

// @desc    Lấy thông tin cá nhân
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
    });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy người dùng");
  }
});

// @desc    Cập nhật thông tin cá nhân
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Không tìm thấy người dùng");
  }
});

// @desc    Lưu mã ưu đãi (Voucher) vào tài khoản
// @route   POST /api/users/vouchers
// @access  Private
const saveVoucher = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // 1. Tạo bản sao dữ liệu gửi lên để xử lý
    const voucherData = { ...req.body };

    // 2. QUAN TRỌNG: Xóa trường "id" (số) hoặc "_id" nếu frontend gửi lên
    // Điều này bắt buộc để MongoDB tự tạo ObjectId mới chuẩn xác, tránh lỗi CastError
    delete voucherData.id;
    delete voucherData._id;

    // 3. Kiểm tra dữ liệu bắt buộc
    if (!voucherData.code || !voucherData.title) {
      res.status(400);
      throw new Error("Dữ liệu voucher thiếu thông tin bắt buộc (code, title)");
    }

    // 4. Khởi tạo mảng vouchers nếu user cũ chưa có
    if (!user.vouchers) {
      user.vouchers = [];
    }

    // 5. Kiểm tra trùng lặp (dựa vào mã code)
    const alreadySaved = user.vouchers.find((v) => v.code === voucherData.code);

    if (alreadySaved) {
      // --- SỬA LỖI Ở ĐÂY ---
      // Trả về JSON thay vì throw Error để tránh crash/log server không cần thiết
      return res.status(400).json({
        message: "Bạn đã lưu mã ưu đãi này rồi",
        success: false,
      });
    }

    // 6. Thêm vào mảng và lưu
    user.vouchers.push(voucherData);
    await user.save();

    res.status(201).json({ message: "Đã lưu mã ưu đãi thành công" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Lấy danh sách voucher đã lưu
// @route   GET /api/users/vouchers
// @access  Private
const getUserVouchers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user.vouchers || []);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  saveVoucher,
  getUserVouchers,
};
