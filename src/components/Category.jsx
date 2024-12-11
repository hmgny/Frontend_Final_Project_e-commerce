import React from "react";

function Category() {
  return (
    <div className="container flex flex-col items-center py-24 gap-16">
     
      <div className=" flex flex-col gap-8">    
        <div className="relative cursor-pointer ">   
          <img className="w-Card h-Category object-cover" src="/images/men.jpg" alt="Men" />
          <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2">
            MEN
          </button>
        </div>


        <div className="relative cursor-pointer ">
          <img className="w-Card h-CategorySmall object-cover" src="/images/accersories.jpg" alt="Men" />
          <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2">
            ACCESSORIES
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Category;
