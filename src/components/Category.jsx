import React from "react";

function Category() {
  return (
    <div className="px-8 sm:px-40 flex flex-col items-center py-24 gap-16 ">
      <div className="max-w-52 sm:max-w-none flex flex-col gap-5 text-center ">
        <h4 className="h4 font-bold flex justify-center text-textColor">
          EDITOR'S PICK
        </h4>
        <p className="text-SecondaryTextColor h6">
          Choices That Will Warm Your Heart
        </p>
      </div>
      <div className=" flex flex-col gap-8 sm:flex-row">
        <div className="relative cursor-pointer sm:w-1/2">
          <img
            className="w-Card h-Category sm:w-full sm:aspect-square object-cover"
            src="/images/men.jpg"
            alt="Men"
          />
          <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2 sm:px-10">
            MEN
          </button>
        </div>

        <div className="relative cursor-pointer sm:w-1/4">
          <img
            className="w-Card h-Category object-cover sm:w-full "
            src="/images/women.jpg"
            alt="Men"
          />
          <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2 sm:px-6">
            WOMEN
          </button>
        </div>
        <div className="flex flex-col gap-8 sm:gap-6 sm:w-1/4">
          <div className="relative cursor-pointer ">
            <img
              className="w-Card h-CategorySmall object-cover sm:w-full sm:h-56"
              src="/images/accersories.jpg"
              alt="Men"
            />
            <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2 sm:px-6">
              ACCESSORIES
            </button>
          </div>

          <div className="relative cursor-pointer sm:w-full sm:h-56 ">
            <img
              className="w-Card h-CategorySmall object-cover  "
              src="/images/kids.jpg"
              alt="Men"
            />
            <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2">
              KIDS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
