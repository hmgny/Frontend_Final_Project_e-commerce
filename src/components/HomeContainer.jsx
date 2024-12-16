import React from "react";

function HomeContainer() {
  return (
    <div className="text-textColor flex flex-col gap-8 items-center h-[999px] sm:flex-row sm:owerflow-hidden sm:justify-evenly ">
      <div className=" flex flex-col pt-28 gap-8 max-w-64 text-center justify-center items-center sm:hidden ">
        <h6 className="h6 text-muted">SUMMER 2020</h6>
        <h2 className="h2 text-4xl font-bold ">Part Of the Neural Universe</h2>
        <h5 className="h5 text-SecondaryTextColor">
          We know how large objects will act, but things on a small scale.
        </h5>
        <button className="bg-Primary text-lightTextColor text-3xl h7 font-bold w-[165px] h-[52px] rounded-md">
          BUY NOW
        </button>
        <button className="bg-lightBackground border-Primary text-Primary text-3xl h7 font-bold w-[165px] h-[52px] rounded-md">
          Learn More
        </button>
      </div>
      <img
        src="/images/cift_png.png"
        alt=""
        className="object-bottom object-cover sm:object-left sm:w-1/2 sm:aspect-square sm:object-contain"
      />
      <div className=" sm:flex sm:flex-col  sm:justify-center hidden sm:text-left sm:items-start sm:gap-6 sm:max-w-96 ">
        <h6 className="h6 text-muted">SUMMER 2020</h6>
        <h2 className="h2 text-4xl font-bold ">Part Of the Neural Universe</h2>
        <h5 className="h5 text-SecondaryTextColor">
          We know how large objects will act, but things on a small scale.
        </h5>
        <div className="sm:flex sm:gap-4">
          <button className="bg-Primary text-lightTextColor text-3xl h7 font-bold w-[165px] h-[52px] rounded-md">
            BUY NOW
          </button>
          <button className="bg-lightBackground border-Primary text-Primary text-3xl h7 font-bold w-[165px] h-[52px] rounded-md">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
