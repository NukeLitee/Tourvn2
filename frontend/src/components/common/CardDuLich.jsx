import React from "react";
import { Link } from "react-router-dom";
import caurongdanang from "../../assets/images/danangcaurong.jpg";
import sectionNhaTrang from "../../assets/images/section_nhatrang.jpg";
const Diadiem = [
  { 
    id: 1,
    name: "Hồ Chí Minh",
    slug: "ho-chi-minh",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=400",
  },
  {
    id: 2,
    name: "Nha Trang",
    slug: "nha-trang",
    image: sectionNhaTrang,
  },
  {
    id: 3,
    name: "Đà Nẵng",
    slug: "da-nang",
    image: caurongdanang, // Ảnh placeholder
  },
  {
    id: 4,
    name: "Hà Nội",
    slug: "ha-noi",
    image:
      "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=400",
  },
  {
    id: 5,
    name: "Hồ Chí Minh",
    slug: "ho-chi-minh",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=400",
  },
  {
    id: 6,
    name: "Nha Trang",
    slug: "nha-trang",
    image: sectionNhaTrang,
  },
  {
    id: 7,
    name: "Đà Nẵng",
    slug: "da-nang",
    image:
      "https://images.unsplash.com/photo-1559592413-7cec4d0ea49b?q=80&w=400", // Ảnh placeholder
  },
  {
    id: 8,
    name: "Hà Nội",
    slug: "ha-noi",
    image:
      "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=400",
  },
];

function CardDuLich() {
  return (
    <div className="max-w-7xl mx-auto flex gap-5 py-[15px] -m-[15px] overflow-x-auto pb-4 no-scrollbar">
      {Diadiem.map((item) => (
        <Link
          to={`/city/${item.slug}`} // Link tới trang chi tiết (CityPage)
          key={item.id}
          className="relative block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 hover:scale-[1.01] hover:-translate-y-2 w-[175px] h-[235px]"
        >
          <div className="w-full h-full relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 text-white p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <p className="text-xl m-0 font-semibold">{item.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardDuLich;
