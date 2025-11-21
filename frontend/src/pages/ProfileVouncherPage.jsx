import React, { useState, useEffect } from "react";
import ProfileLayout from "../components/layout/ProfileLayout";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext"; // 1. Import

function ProfileVouchersPage() {
  const [activeTab, setActiveTab] = useState("available");
  const [promoCode, setPromoCode] = useState("");

  const { fetchUserVouchers } = useAuth(); // 2. Lấy hàm fetch
  const [myVouchers, setMyVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. Gọi API lấy danh sách voucher đã lưu
  useEffect(() => {
    const loadVouchers = async () => {
      const data = await fetchUserVouchers();
      setMyVouchers(data);
      setLoading(false);
    };
    loadVouchers();
  }, []);

  return (
    <ProfileLayout>
      {/* ... Banner & Input (Giữ nguyên code cũ) ... */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nhập mã khuyến mãi"
              className="w-full h-11 px-4 border border-gray-200 rounded-lg outline-none focus:border-[#FF5B00] transition-colors text-sm text-gray-600 font-light"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
          <button className="bg-[#FF5B00] text-white px-8 rounded-lg font-bold text-sm hover:bg-[#e55200] transition-colors shadow-md">
            Sử dụng
          </button>
        </div>
      </div>

      <div className="min-h-[400px]">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`pb-3 px-1 mr-8 font-bold text-base transition-colors relative ${
              activeTab === "available"
                ? "text-[#FF5B00]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Áp dụng ({myVouchers.length})
            {activeTab === "available" && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF5B00]"></div>
            )}
          </button>
          <button
            className={`pb-3 px-1 font-normal text-base transition-colors relative ${
              activeTab === "unavailable"
                ? "text-[#FF5B00]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("unavailable")}
          >
            Không áp dụng
            {activeTab === "unavailable" && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF5B00]"></div>
            )}
          </button>
        </div>

        {/* Danh sách Voucher */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Đang tải mã ưu đãi...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTab === "available" &&
              myVouchers.map((voucher, index) => (
                // Render từng voucher (Lưu ý: key nên là _id nếu có, hoặc index)
                <div
                  key={voucher._id || index}
                  className="flex flex-col w-full max-w-[380px] shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden"
                >
                  {/* Phần trên Xanh */}
                  <div className="bg-[#00C08B] p-5 text-white relative">
                    <h3 className="text-xl font-bold mb-3">{voucher.title}</h3>
                    <ul className="list-none space-y-1 mb-3">
                      {/* Nếu description là mảng thì map, nếu string thì hiện thẳng */}
                      {Array.isArray(voucher.description) ? (
                        voucher.description.map((line, idx) => (
                          <li
                            key={idx}
                            className="text-[11px] leading-relaxed opacity-95 font-light"
                          >
                            {line}
                          </li>
                        ))
                      ) : (
                        <li className="text-[11px] leading-relaxed opacity-95 font-light">
                          {voucher.description}
                        </li>
                      )}
                    </ul>
                    {/* Răng cưa */}
                    <div
                      className="absolute -bottom-1 left-0 w-full h-2 z-10"
                      style={{
                        background:
                          "radial-gradient(circle, transparent 4px, #00C08B 4px) top left",
                        backgroundSize: "12px 12px",
                        backgroundRepeat: "repeat-x",
                        transform: "rotate(180deg)",
                      }}
                    ></div>
                  </div>

                  {/* Phần dưới Trắng */}
                  <div className="bg-white p-4 pt-6 border border-t-0 border-gray-100 rounded-b-lg flex flex-col gap-1 relative">
                    {/* Răng cưa khớp */}
                    <div
                      className="absolute -top-1 left-0 w-full h-2 z-0"
                      style={{
                        background:
                          "radial-gradient(circle, #00C08B 4px, transparent 4px) top left",
                        backgroundSize: "12px 12px",
                        backgroundRepeat: "repeat-x",
                      }}
                    ></div>

                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                      {voucher.code}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 w-[60%] line-clamp-1">
                        {voucher.subtext || "Ưu đãi độc quyền"}
                      </p>
                      <span className="text-xs text-[#FF5B00] font-medium bg-[#FFF0E6] px-2 py-1 rounded">
                        {voucher.warning || "Sắp hết hạn"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {activeTab === "available" && myVouchers.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400 text-sm">
                  Bạn chưa lưu mã ưu đãi nào.
                </p>
                <p className="text-xs text-blue-500 mt-2 cursor-pointer">
                  Đi săn mã ngay!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}

export default ProfileVouchersPage;
