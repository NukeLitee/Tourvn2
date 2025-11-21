import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // ... (giữ nguyên code cũ)
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const register = async (name, email, password) => {
    // ... (giữ nguyên code cũ)
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  const updateProfile = async (userData) => {
    // ... (giữ nguyên code cũ)
    try {
      const token = user?.token;
      if (!token) throw new Error("Token not found");
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      const updated = { ...data, token: data.token || token };
      localStorage.setItem("userInfo", JSON.stringify(updated));
      setUser(updated);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ✅ HÀM MỚI: LƯU VOUCHER
  const saveUserVoucher = async (voucherData) => {
    try {
      const token = user?.token;
      if (!token) {
        alert("Vui lòng đăng nhập để lưu mã!");
        return false;
      }

      const res = await fetch("http://localhost:5000/api/users/vouchers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(voucherData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ✅ HÀM MỚI: LẤY DANH SÁCH VOUCHER
  const fetchUserVouchers = async () => {
    try {
      const token = user?.token;
      if (!token) return [];

      const res = await fetch("http://localhost:5000/api/users/vouchers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return res.ok ? data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        saveUserVoucher,
        fetchUserVouchers, // Export hàm mới
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
