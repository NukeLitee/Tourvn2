import React from "react";
import Header from "../common/Header";
import ProfileSidebar from "../profile/ProfileSideBar";
import { Outlet } from "react-router-dom"; // Dùng Outlet để render các route con

function ProfileLayout({ children }) {
  return (
    <div className="bg-[#EBF8FF] min-h-screen font-['Poppins',_sans-serif]">
      <Header />

      <main className="container mx-auto max-w-[1160px] py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* CỘT TRÁI: SIDEBAR (Cố định) */}
          <ProfileSidebar />

          {/* CỘT PHẢI: NỘI DUNG THAY ĐỔI */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Nếu dùng children (cách truyền thống) */}
            {children}

            {/* Nếu dùng Outlet (cho nested routes trong tương lai) */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileLayout;
