import React from "react";

function Carousel() {
  return (
    <div className="bg-Secondary text-lightTextColor flex flex-col gap-8 justify-center items-center h-[1250px] ">
      <div className=" flex flex-col gap-8 pt-56 max-w-64 ">
        <h5 className="h5 text-base">SUMMER 2020</h5>
        <h2 className="h2 text-4xl font-bold">NEW COLLECTION</h2>
        <h4 className="text-xl text-lightGray">
          We know how large objects will act, but things on a small scale.
        </h4>
        <h4 className="h4 text-base font-bold">$16.48</h4>
        <button className="bg-succes text-lightTextColor text-3xl h7 font-bold w-56 h-16 rounded-md">
          ADD TO CART
        </button>
      </div>
      <img src="/images/men_png_yesil.png" alt="" className="object-top object-cover w-full overflow-hidden" />
    </div>
  );
}

export default Carousel;
