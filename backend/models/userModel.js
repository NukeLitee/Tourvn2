import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Schema cho một Voucher được lưu
const voucherSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  discount: { type: String },
  minSpend: { type: String },
  // Lưu ý: description có thể là mảng hoặc string, nên để Mixed hoặc xử lý kỹ
  description: { type: mongoose.Schema.Types.Mixed },
  expiry: { type: String },
  sub: { type: String }, // Thêm trường này nếu frontend có gửi
  subtext: { type: String }, // Thêm trường này
  warning: { type: String }, // Thêm trường này
  link: { type: String }, // Thêm trường này
  savedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    avatar: { type: String, default: "" },

    // Danh sách voucher đã lưu
    vouchers: [voucherSchema],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
