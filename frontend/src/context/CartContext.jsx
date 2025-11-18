import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Lấy dữ liệu từ localStorage nếu có
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : [];
  });

  // Lưu vào localStorage mỗi khi cart thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Hàm thêm vào giỏ hàng
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Nếu có rồi thì tăng số lượng
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Nếu chưa có thì thêm mới với quantity = 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Hàm xóa khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Hàm cập nhật số lượng
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Hàm xóa các sản phẩm đã chọn (cho trang CartPage)
  const removeSelectedItems = (selectedIds) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !selectedIds.includes(item.id))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        removeSelectedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
