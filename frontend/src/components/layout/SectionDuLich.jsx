import React from "react";
import { BsDuffleFill } from "react-icons/bs";
import CardDuLich from "../common/CardDuLich";

function SectionDuLich() {
  return (
    <div className="w-[1160px] mx-auto relative pt-[51px]">
      <div className="pb-[32px]  ">
        <p
          className="w-auto h-[36px]
                    text-[28px] font-semibold"
        >
          Bạn muốn đi đâu?
        </p>
      </div>

      <div className="">
        <CardDuLich />
      </div>

      <div
        className="mt-[32px]
                            flex justify-center"
      >
        <button
          className="
          bg-cyan-500          
          hover:bg-cyan-600    
          text-white           
          font-semibold
          font-['Poppins',_sans-serif]
          text-lg
          w-[190px]
          h-[36px]            
          rounded-full         
          transition-colors
        "
        >
          Xem tất cả
        </button>
      </div>
    </div>
  );
}

export default SectionDuLich;
