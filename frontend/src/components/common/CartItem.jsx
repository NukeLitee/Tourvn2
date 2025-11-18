import React from "react";
// (Cần cài: npm install @heroicons/react)
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

function CartItem({ item, isSelected, onSelect, onQuantityChange, onDelete }) {
  // Tính tổng phụ cho riêng item này
  // Chuyển đổi giá từ string sang number (vd: "1.090.972" -> 1090972)
  const priceString = String(item.price).replace(/[.,]/g, "");
  const priceNumber = parseFloat(priceString) || 0;
  const subtotal = (priceNumber * item.quantity).toLocaleString("vi-VN");

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Phần nội dung chính */}
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Checkbox và Ảnh */}
        <div className="flex items-start md:items-center gap-4">
          <input
            type="checkbox"
            className="h-5 w-5 mt-1 md:mt-0 cursor-pointer"
            checked={isSelected}
            onChange={() => onSelect(item.id)}
          />
          <img
            src={item.image}
            alt={item.title}
            className="w-24 h-24 md:w-28 md:h-28 rounded-lg object-cover flex-shrink-0"
          />
        </div>

        {/* Thông tin */}
        <div className="flex-grow">
          <h3 className="font-semibold text-base md:text-lg">{item.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {item.description}
          </p>
          {item.tag && (
            <span
              className="
              border border-orange-400 text-orange-500 text-xs font-semibold
              px-2 py-0.5 rounded-md bg-white mt-2 inline-block
            "
            >
              {item.tag}
            </span>
          )}
        </div>

        {/* Bộ đếm số lượng */}
        <div className="flex items-center justify-start md:justify-center gap-2">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="p-1.5 rounded-full border hover:bg-gray-100 disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </button>

          <span className="font-bold text-lg w-10 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="p-1.5 rounded-full border hover:bg-gray-100"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Footer của Card */}
      <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
        <div>
          <button className="text-blue-600 hover:underline text-sm mr-4">
            Sửa
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:underline text-sm"
          >
            Xóa
          </button>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold">đ {subtotal}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
