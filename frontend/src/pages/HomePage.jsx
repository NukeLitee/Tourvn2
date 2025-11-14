import React from "react";
import Header from "../components/common/Header.jsx";
import TourCardDiv from "../components/layout/TourCardDiv.jsx";
import HeroBanner from "../components/common/HeroBanner.jsx";
import ExperienceSlider from "../components/layout/ExperienceSlider.jsx";
import FeaturedActivities from "../components/sections/FeaturedActivities.jsx";
import SectionDuLich from "../components/layout/SectionDuLich.jsx";
import SectionDuLich from "../components/layout/SectionDuLich.jsx";
function HomePage() {
  return (
    <>
      <Header />
      <div >
        <HeroBanner />
      </div>
      <div className="mt-[51px]">
        <SectionDuLich/>
      </div>
      <div className="mt-[51px]">
        <FeaturedActivities />
      </div>
      <div className="mt-[51px]">
        <ExperienceSlider />
      </div>
    </>
  );
}
export default HomePage;
