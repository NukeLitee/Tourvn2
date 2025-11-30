import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Cờ để kiểm tra xem việc load dữ liệu lần đầu (khi đổi user) đã xong chưa
  // Tránh việc Save chạy trước Load gây ghi đè dữ liệu rỗng/cũ lên user mới
  const isLoadedRef = useRef(false);

  // Tạo key động dựa vào user ID.
  // Nếu chưa login thì dùng "cart_guest", nếu login thì "cart_USERID"
  const cartKey = user && user._id ? `cart_${user._id}` : "cart_guest";

  // 1. LOAD GIỎ HÀNG (Chạy khi cartKey thay đổi - tức là khi đổi user)
  useEffect(() => {
    isLoadedRef.current = false; // Đánh dấu đang load
    const storedCart = localStorage.getItem(cartKey);

    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Lỗi parse giỏ hàng:", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]); // User mới chưa có giỏ thì rỗng
    }

    isLoadedRef.current = true; // Đánh dấu đã load xong
  }, [cartKey]);

  // 2. SAVE GIỎ HÀNG (Chạy khi cartItems thay đổi)
  useEffect(() => {
    // Chỉ lưu khi đã load xong dữ liệu của user đó
    if (isLoadedRef.current) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, cartKey]);

  // --- CÁC HÀM XỬ LÝ (GIỮ NGUYÊN LOGIC CŨ) ---

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // Hàm xóa nhiều item (dùng cho nút "Xóa đã chọn" và sau khi Thanh toán)
  const removeSelectedItems = (selectedIds) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !selectedIds.includes(item.id))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        removeSelectedItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
