import mongoose from "mongoose";

const bookingItemSchema = new mongoose.Schema({
  // Dùng để lưu thông tin sản phẩm tại thời điểm đặt
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  // Liên kết đến sản phẩm gốc
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tour",
  },
});

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookingItems: [bookingItemSchema], // Mảng các tour đã đặt
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      required: true,
      default: "pending", // Trạng thái: pending, confirmed, cancelled
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
