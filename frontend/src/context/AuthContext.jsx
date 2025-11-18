import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kiểm tra xem người dùng đã đăng nhập chưa khi tải trang (F5)
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Hàm Đăng nhập
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Gọi API Backend
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      // Lưu thông tin user (bao gồm token) vào localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return true; // Trả về true nếu thành công
    } catch (err) {
      setError(err.message);
      return false; // Trả về false nếu thất bại
    } finally {
      setLoading(false);
    }
  };

  // Hàm Đăng ký
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Hàm Đăng xuất
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
