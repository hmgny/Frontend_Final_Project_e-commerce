import React from "react";
import ShopCard from "./ShopCard";


function ProductCard() {
  

  return (
    <div className="px-8 sm:px-40 flex flex-col items-center py-24 gap-16">
      <div className="max-w-52 flex flex-col gap-5 sm:max-w-screen-2xl text-center">
        <h5 className="h5 text-SecondaryTextColor flex justify-center">
          Featured Products
        </h5>
        <h4 className="h4 font-bold flex justify-center text-textColor ">
          BESTSELLER PRODUCTS
        </h4>
        <p className="text-SecondaryTextColor h7 justify-center">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <ShopCard/>
    </div>
  );
}

export default ProductCard;
