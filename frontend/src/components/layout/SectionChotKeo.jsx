import React from "react";
import {chotkeoData} from "../../data.js";
import ChotKeoCard from "../common/ChotKeoCard";


function SectionChotKeo(){
    return(
        <>
        <div className="container mx-auto w-[1160px] h-[440px] relative flex flex-col">

      {/* 9. "Viewport": Thêm 'overflow-hidden' ĐỂ ẨN card thứ 5 */}
        <div
          className="grid grid-cols-4 not-first-of-type: gap-6 pb-4 transition-transform duration-500 ease-in-out"
        >
          {chotkeoData.map((chot) => (
            // Thêm 'flex-shrink-0' để card không bị "bóp méo"
            <div key={chot.id} className="flex-shrink-0">
              <ChotKeoCard chot={chot} />
            </div>
          ))}
        </div>
    </div>
        </>
        
    );
}

export default SectionChotKeo;