import React from "react";
import Banner from "../../assets/images/bannerHCM.jpg";


function ChotKeoBanner(){
    return (
        <>
        <div className="
            w-full h-[472px] relative flex mb-[64px]">
            <div className="absolute w-full h-[472px] overflow-hidden">
                <img src={Banner} alt="Chốt Gấp Kèo Hồ Chí Minh"
                className="w-full h-[472px] object-cover object-top" />
            </div>

            <div className="absolute inset-0 bg-black opacity-30"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center
                            text-white ">
                <h2 className="text-[43px] font-bold font-['Poppins',sans-serif] ">Chốt Gấp Kèo Hồ Chí Minh</h2>
                <p className="text-[20px] font-md font-['Poppins',sans-serif]">
                    Deal Hot nhất Thành phố Hồ Chí Minh</p>
            </div>
        </div>
        </>
    );
}

export default ChotKeoBanner;