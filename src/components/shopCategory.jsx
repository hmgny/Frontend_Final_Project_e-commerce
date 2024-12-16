import React from "react";
import { Link } from "react-router-dom";

function ShopCategory() {
  const categories = [
    {
      image: "/images/homeHero.jpg",
      title: "CLOTHS",
      items: "5 Items"
    },
    {
      image: "/images/best2.jpg",
      title: "CLOTHS",
      items: "5 Items"
    },
    {
      image: "/images/best3.jpg",
      title: "CLOTHS",
      items: "5 Items"
    },
    {
      image: "/images/best4.jpg",
      title: "CLOTHS",
      items: "5 Items"
    },
    {
      image: "/images/best5.jpg",
      title: "CLOTHS",
      items: "5 Items"
    }
  ];

  return (
    <div className="bg-lightGray flex flex-col">
      <div className="flex flex-col gap-16 px-4 py-8">
        <h4 className="h4 font-bold flex justify-center">Shop</h4>
        <div className="flex gap-2 h7 font-bold justify-center">
          <p>Home</p>
          <p>/</p>
          <p>Shop</p>
        </div> 
      </div>
      <div className="grid grid-cols-1 gap-6 px-4 py-8">
        {categories.map((category, index) => (
          <Link to="/shop" key={index} className="relative group">
            <div className="relative mx-8 overflow-hidden">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold">{category.title}</h3>
                <p className="mt-2">{category.items}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShopCategory;