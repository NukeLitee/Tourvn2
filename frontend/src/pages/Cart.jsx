import React from "react";
import Headers from "../components/common/Header.jsx";

function Cart() {
  return (
    <>
      <div>
        <Headers />
      </div>
      <div className="flex justify-around mx-auto">
        <div className="w-[858px] h-[52px] ">
          <div className="flex justify-between w-[810px] h-[28px]">
            <div className="flex">
              <input type="checkbox" /> <p>Tất cả</p>
            </div>
            <button className="cursor-pointer">Xóa dịch vụ đã chọn</button>
          </div>
        </div>
        <div>aside</div>
      </div>
    </>
  );
}
export default Cart;
