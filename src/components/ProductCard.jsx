import React from "react";
import { Circle } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard() {
  const products = [
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best1.jpg",
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best2.jpg",
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best3.jpg",
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best4.jpg",
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best5.jpg",
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best6.jpg",
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best7.jpg",
    },
  ];

  return (
    <div className="px-8 sm:px-40 flex flex-col items-center py-24 gap-16">
      <div className="max-w-52 flex flex-col gap-5">
        <h5>Featured Products</h5>
        <h4 className="h4 font-bold flex justify-center text-textColor">
          BESTSELLER PRODUCTS
        </h4>
        <p className="text-SecondaryTextColor h7">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className=" flex flex-wrap gap-16 sm:gap-0 sm:flex-row sm:justify-between sm:flex-wrap">
        {products.map((product, index) => (
          <div className="relative cursor-pointer flex flex-col gap-4 w-full sm:w-[23%] ">
            <img src={product.img} alt="best1" className="h-cardBestceller" />
            <h6 className="font-bold h6 flex justify-center text-textColor">
              {product.title}
            </h6>
            <p className="font-bold h7 flex justify-center text-SecondaryTextColor">
              {product.department}
            </p>
            <div className="flex justify-center gap-2">
              <h6 className="font-bold h6 flex justify-center text-muted">
                {product.originalPrice}
              </h6>
              <h6 className="font-bold h6 flex justify-center text-Secondary">
                {product.salePrice}
              </h6>
            </div>
            <div className="flex justify-center">
              <Link to="" className="bg-Primary rounded-full">
                <Circle size={16} />
              </Link>
              <Link to="" className="bg-Secondary rounded-full">
                <Circle size={16} />
              </Link>
              <Link to="" className="bg-alert rounded-full">
                <Circle size={16} />
              </Link>
              <Link to="" className="bg-darkBackground rounded-full">
                <Circle size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
