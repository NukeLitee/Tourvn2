import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Đăng ký người dùng mới
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Kiểm tra email tồn tại?
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); // Bad request
    throw new Error('Email đã được sử dụng');
  }

  // 2. Tạo user mới
  const user = await User.create({
    name,
    email,
    password,
  });

  // 3. Trả về thông tin user và token
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
    throw new Error('Dữ liệu người dùng không hợp lệ');
  }
});

// @desc    Đăng nhập
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Tìm user bằng email
  const user = await User.findOne({ email });

  // 2. Kiểm tra user và mật khẩu
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Email hoặc mật khẩu không đúng');
  }
});

// @desc    Lấy thông tin cá nhân
// @route   GET /api/users/profile
// @access  Private (Cần token)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
});

export { registerUser, loginUser, getUserProfile };