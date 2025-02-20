import React from "react";

function HomeContainer() {
  return (
    <div className="text-textColor flex flex-col gap-8 items-center h-[999px] sm:flex-row sm:owerflow-hidden sm:justify-evenly ">
      <img
        src="/images/cift_png.png"
        alt=""
        className="object-bottom object-cover sm:object-left sm:w-1/2 sm:aspect-square sm:object-contain"
      />
      <div className=" sm:flex sm:flex-col  sm:justify-center hidden sm:text-left sm:items-start sm:gap-6 sm:max-w-96 ">
        <h6 className="h4  text-Secondary2">SPRINT 2024</h6>
        <h2 className="h2 text-4xl font-bold ">Make your loved ones happy</h2>
        <h5 className="h5 text-SecondaryTextColor">
          Gift ideas for your loved ones
        </h5>
        <div className="sm:flex sm:gap-4">
          <button className="bg-Primary text-lightTextColor text-3xl h7 font-bold w-[165px] h-[52px] rounded-md">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
