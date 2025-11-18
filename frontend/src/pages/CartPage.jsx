import React, { useState, useMemo, useEffect } from "react";
import Header from "../components/common/Header";
import CheckoutSidebar from "../components/common/CheckoutSidebar";
import CartItem from "../components/common/CartItem";
// 1. Bỏ import sampleCartData, thay bằng useCart
import { useCart } from "../context/CartContext";

function CartPage() {
  // 2. Lấy state và hàm từ Context
  const { cartItems, updateQuantity, removeFromCart, removeSelectedItems } =
    useCart();

  const [selectedIds, setSelectedIds] = useState([]);

  // Cập nhật selectedIds khi cartItems thay đổi (ví dụ khi xóa item)
  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => cartItems.some((item) => item.id === id))
    );
  }, [cartItems]);

  // 3. Các hàm xử lý logic (đã được đơn giản hóa nhờ Context)
  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleSelect = (itemId) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(itemId)
        ? prevIds.filter((id) => id !== itemId)
        : [...prevIds, itemId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(cartItems.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = () => {
    removeSelectedItems(selectedIds);
    setSelectedIds([]);
  };

  const totalPrice = useMemo(() => {
    const total = cartItems.reduce((acc, item) => {
      if (selectedIds.includes(item.id)) {
        // Chuyển đổi giá từ string sang number (vd: "1.090.972" -> 1090972)
        // Lưu ý: Đảm bảo data.js dùng dấu chấm hoặc không dấu cho giá
        const priceString = String(item.price).replace(/[.,]/g, "");
        const priceNumber = parseFloat(priceString) || 0;
        return acc + priceNumber * item.quantity;
      }
      return acc;
    }, 0);
    return total.toLocaleString("vi-VN");
  }, [cartItems, selectedIds]);

  const handleCheckout = () => {
    if (selectedIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán");
      return;
    }
    console.log("Thanh toán items:", selectedIds);
    alert("Chức năng thanh toán đang phát triển!");
  };

  const allSelected =
    cartItems.length > 0 && selectedIds.length === cartItems.length;

  return (
    <div className="bg-gray-100 min-h-screen font-['Poppins',_sans-serif]">
      <Header />

      <main className="container mx-auto max-w-[1160px] py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Giỏ hàng ({cartItems.length})
        </h1>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* CỘT TRÁI (LIST ITEMS) */}
          <div className="w-full lg:flex-grow">
            <div className="flex justify-between items-center bg-white p-4 rounded-t-lg shadow-sm border-b mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  disabled={cartItems.length === 0}
                />
                <label className="font-medium text-gray-700">
                  Tất cả ({cartItems.length} dịch vụ)
                </label>
              </div>
              <button
                onClick={handleDeleteSelected}
                className="text-red-500 hover:text-red-700 disabled:text-gray-400 font-medium text-sm"
                disabled={selectedIds.length === 0}
              >
                Xóa dịch vụ đã chọn
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedIds.includes(item.id)}
                    onSelect={handleSelect}
                    onQuantityChange={handleQuantityChange}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CỘT PHẢI (CHECKOUT SIDEBAR) */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0 mt-8 lg:mt-0">
            <CheckoutSidebar
              price={totalPrice}
              currency="VNĐ"
              onSubmit={handleCheckout}
              submitButtonText={`Thanh toán (${selectedIds.length})`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
