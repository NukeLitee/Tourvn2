import React, { useState, useMemo } from "react";
import Header from "../components/common/Header.jsx";
import CheckoutSidebar from "../components/common/CheckoutSidebar.jsx";
import CartItem from "../components/common/CartItem"; // Component con mới
import { sampleCartData } from "../data.js"; // Import data mẫu

function CartPage() {
  // 1. State chính: Mảng các item trong giỏ hàng
  const [cartItems, setCartItems] = useState(sampleCartData);
  // 2. State phụ: Mảng các ID được chọn (tick)
  // Mặc định chọn tất cả
  const [selectedIds, setSelectedIds] = useState(
    sampleCartData.map((item) => item.id)
  );

  // --- HÀM XỬ LÝ LOGIC ---

  // 3. Hàm thay đổi số lượng
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng < 1

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 4. Hàm xóa 1 item
  const handleDeleteItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    // Cũng xóa khỏi mảng "selected"
    setSelectedIds((prevIds) => prevIds.filter((id) => id !== itemId));
  };

  // 5. Hàm xử lý tick chọn 1 item
  const handleSelect = (itemId) => {
    setSelectedIds(
      (prevIds) =>
        prevIds.includes(itemId)
          ? prevIds.filter((id) => id !== itemId) // Bỏ chọn
          : [...prevIds, itemId] // Thêm vào
    );
  };

  // 6. Hàm xử lý tick "Tất cả"
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(cartItems.map((item) => item.id)); // Chọn tất cả
    } else {
      setSelectedIds([]); // Bỏ chọn tất cả
    }
  };

  // 7. Hàm xóa các item đã chọn
  const handleDeleteSelected = () => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !selectedIds.includes(item.id))
    );
    setSelectedIds([]); // Xóa xong thì reset mảng selected
  };

  // 8. TÍNH TOÁN TỔNG TIỀN (Chỉ tính các item được chọn)
  const totalPrice = useMemo(() => {
    const total = cartItems.reduce((acc, item) => {
      if (selectedIds.includes(item.id)) {
        // Chuyển string giá (vd: "1,090,972") thành số
        const priceNumber = parseFloat(item.price.replace(/[.,]/g, ""));
        return acc + priceNumber * item.quantity;
      }
      return acc;
    }, 0);
    // Format lại thành string có dấu phẩy
    return total.toLocaleString("vi-VN");
  }, [cartItems, selectedIds]);

  // 9. Hàm xử lý khi nhấn nút "Thanh toán"
  const handleCheckout = () => {
    console.log("Tiến hành thanh toán cho các item:", selectedIds);
    console.log("Tổng tiền:", totalPrice);
    // ... Logic chuyển sang trang thanh toán ...
  };

  const allSelected =
    selectedIds.length === cartItems.length && cartItems.length > 0;

  return (
    <div className="bg-gray-100 min-h-screen font-['Poppins',_sans-serif]">
      <Header />

      <main className="container mx-auto max-w-[1160px] py-10">
        <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>

        {/* BỐ CỤC 2 CỘT */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* CỘT TRÁI (LIST ITEMS) */}
          <div className="w-full lg:flex-grow">
            {/* Header của giỏ hàng */}
            <div className="flex justify-between items-center bg-white p-4 rounded-t-lg shadow-sm border-b">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
                <label>Tất cả ({cartItems.length} dịch vụ)</label>
              </div>
              <button
                onClick={handleDeleteSelected}
                className="text-red-500 hover:text-red-700 disabled:text-gray-400"
                disabled={selectedIds.length === 0}
              >
                Xóa dịch vụ đã chọn
              </button>
            </div>

            {/* Danh sách các CartItem */}
            <div className="flex flex-col gap-4 mt-4">
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
          </div>

          {/* CỘT PHẢI (CHECKOUT SIDEBAR) */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0 mt-8 lg:mt-0">
            <CheckoutSidebar
              price={totalPrice}
              currency="VNĐ"
              onSubmit={handleCheckout}
              // Tùy chỉnh text cho nút
              submitButtonText="Thanh toán"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
; 
export default CartPage;
