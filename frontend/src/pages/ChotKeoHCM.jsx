import React from "react";
import Header from "../components/common/Header.jsx";
import ChotGapKeo from "../components/common/ChotKeoBanner.jsx";
import SectionChotKeo from "../components/layout/SectionChotKeo.jsx";

function ChotKeoHCM() {
  return (
    <>
      <div>
        <Header />
      </div>

      <div>
        <ChotGapKeo />
      </div>

      <div>
        <SectionChotKeo />
      </div>
    </>
  );
}

export default ChotKeoHCM;
