import React from "react";
import { Link } from "react-router-dom";
import HoChiMinh from "../../assets/images/Hochiminh.jpg";
import NhaTrang from "../../assets/images/Nhatrang.jpg";
import DaNang from "../../assets/images/danang.jpg"
import HaNoi from "../../assets/images/hanoi.jpg"

const Diadiem =[
    {id: 1, image: HoChiMinh , name: "Hồ Chí Minh"},
    {id: 2, image: NhaTrang, name: "Nha Trang"},
    {id: 3, image: DaNang, name: "Đà Nẵng"},
    {id: 4, image: HaNoi, name: "Hà nội"},
    {id: 4, image: HaNoi, name: "Hà nội"},
    {id: 4, image: HaNoi, name: "Hà nội"},
];


function CardDuLich() {
    return (
        <>
        <div className="max-w-7xl mx-auto flex gap-5 py-[15px] -m-[15px]">
            {Diadiem.map((item, index) => (
                <Link to = {item.name} key = {index} className="relative block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex-shrink-0
                                                                transition-all duration-300 hover:scale-[1.01] hover:-translate-y-2">
                    <div className="card-content-wrapper ">
                        <img src = {item.image} alt={item.name} className="w-[175px] h-[235px] object-cover "/>
                        <div className="absolute inset-x-0 bottom-0 text-white p-5
                                        from-black/100 bg-gradient-to-t via-black/50 to-transparent
                                        ">
                            <p className="text-xl m-0 font-semibold" >{item.name}</p>
                            </div>
                    </div>
                </Link>
            ))}
        </div>
        </>
    );
}

export default CardDuLich;