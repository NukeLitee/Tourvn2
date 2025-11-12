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
                    py-[7px] px-[12px] w-[294px]
                    text-[14px] font-medium text-center text-white
                    border rounded-[50px] 
                    bg-blue-400 shadow-md
                    hover:bg-blue-500 active:scale-95 transition duration-150"
        >
          Xem tất cả
        </button>
      </div>
    </div>
  );
}

export default SectionDuLich;
