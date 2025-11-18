import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    // Chúng ta sẽ dùng _id của MongoDB thay cho id: 't1', 'c1'...
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }, // Dùng Number cho giá
    currency: { type: String, default: "VNĐ" },

    // Các trường dữ liệu từ TourCard
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    bookingsCount: { type: String }, // "100k+" là string
    salePercentage: { type: String }, // "20%" là string

    // Các trường dữ liệu từ ExperienceCard
    subtitle1: { type: String },
    subtitle2: { type: String },
    buttonText: { type: String },

    // Các trường dùng cho trang BookingPage
    description: { type: String },
    images: [{ type: String }], // Mảng gallery

    // Trường để phân loại (tour, chotkeo, experience)
    category: {
      type: String,
      required: true,
      enum: ["tour", "chotkeo", "experience", "promotion"],
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
