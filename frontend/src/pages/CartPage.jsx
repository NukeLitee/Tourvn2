import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import điều hướng

// --- IMPORT TỪ PROJECT CỦA BẠN ---
import Header from "../components/common/Header";
import CheckoutSidebar from "../components/common/CheckoutSidebar";
import CartItem from "../components/common/CartItem";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // 2. Import Auth

function CartPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Lấy thông tin user

  // Lấy state và hàm từ CartContext
  const { cartItems, updateQuantity, removeFromCart, removeSelectedItems } =
    useCart();

  const [selectedIds, setSelectedIds] = useState([]);

  // Đồng bộ selectedIds khi cartItems thay đổi
  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => cartItems.some((item) => item.id === id))
    );
  }, [cartItems]);

  // --- Các hàm xử lý logic giỏ hàng (Giữ nguyên) ---
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

  // Tính tổng tiền
  const totalPrice = useMemo(() => {
    const total = cartItems.reduce((acc, item) => {
      if (selectedIds.includes(item.id)) {
        // Xử lý giá (loại bỏ dấu chấm/phẩy nếu có để parse số)
        const priceString = String(item.price).replace(/[.,]/g, "");
        const priceNumber = parseFloat(priceString) || 0;
        return acc + priceNumber * item.quantity;
      }
      return acc;
    }, 0);
    return total.toLocaleString("vi-VN");
  }, [cartItems, selectedIds]);

  // --- CHỨC NĂNG THANH TOÁN MỚI (Đã tích hợp API) ---
  const handleCheckout = async () => {
    // 1. Validate: Phải chọn sản phẩm
    if (selectedIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán");
      return;
    }

    // 2. Validate: Phải đăng nhập
    if (!user) {
      const confirmLogin = window.confirm(
        "Vui lòng đăng nhập để tiếp tục thanh toán. Đi đến trang đăng nhập?"
      );
      if (confirmLogin) navigate("/login");
      return;
    }

    try {
      // 3. Chuẩn bị dữ liệu đơn hàng
      const checkoutItems = cartItems.filter((item) =>
        selectedIds.includes(item.id)
      );

      // Helper parse giá
      const parsePrice = (p) => parseFloat(String(p).replace(/[.,]/g, "")) || 0;
      const totalAmount = checkoutItems.reduce(
        (acc, item) => acc + parsePrice(item.price) * item.quantity,
        0
      );

      const orderData = {
        orderItems: checkoutItems.map((item) => ({
          name: item.title || item.name, // Tên sản phẩm
          qty: item.quantity,
          image: item.image,
          price: parsePrice(item.price),
          product: item.id, // ID sản phẩm
        })),
        shippingAddress: {
          address: user.address || "Cập nhật địa chỉ",
          city: "Hồ Chí Minh",
          phone: user.phone || "0909000000", // Giá trị mặc định nếu thiếu để tránh lỗi validation
        },
        paymentMethod: "Thanh toán khi nhận hàng (COD)",
        totalPrice: totalAmount,
      };

      // 4. Gọi API tạo đơn hàng
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Gửi token
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Đặt hàng thành công!");

        // Xóa các sản phẩm đã mua khỏi giỏ
        removeSelectedItems(selectedIds);
        setSelectedIds([]);

        // Chuyển hướng sang trang Đơn hàng
        navigate("/profile/bookings");
      } else {
        alert(data.message || "Thanh toán thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      alert("Có lỗi xảy ra khi kết nối đến server.");
    }
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
                <label className="font-medium text-gray-700 select-none">
                  Tất cả ({cartItems.length} dịch vụ)
                </label>
              </div>
              <button
                onClick={handleDeleteSelected}
                className="text-red-500 hover:text-red-700 disabled:text-gray-400 font-medium text-sm transition-colors"
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
              onSubmit={handleCheckout} // Gắn hàm thanh toán vào đây
              submitButtonText={`Thanh toán (${selectedIds.length})`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
