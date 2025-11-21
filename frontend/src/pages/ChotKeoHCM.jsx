import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import ChotGapKeo from "../components/common/ChotKeoBanner.jsx";
import SectionChotKeo from "../components/layout/SectionChotKeo.jsx";

function ChotKeoHCM() {
  const location = useLocation();

  // 1. Lấy dữ liệu ExperienceCard từ state (nếu có)
  const experienceData = location.state?.experienceData;

  // 2. Xác định từ khóa lọc
  // Ví dụ: Nếu subtitle2 là "Du lịch TPHCM", ta lấy từ khóa là "Hồ Chí Minh" hoặc "TPHCM"
  // Ở đây tôi lấy nguyên chuỗi subtitle2 hoặc title làm từ khóa lọc đơn giản
  const filterKeyword =
    experienceData?.subtitle2?.replace("Du lịch ", "") || "";

  return (
    <>
      <Header />

      <ChotGapKeo
        title={experienceData?.title || "Ưu đãi độc quyền"}
        bgImage={experienceData?.image}
      />

      <div className="mt-8">
        <SectionChotKeo filterKeyword={filterKeyword} />
      </div>
    </>
  );
}

export default ChotKeoHCM;
