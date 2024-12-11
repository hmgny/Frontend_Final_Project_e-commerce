import React from "react" 

function Slider() {
  

    return (
      <div className="bg-[url('/images/homeHero.jpg')] bg-no-repeat bg-cover bg-top text-lightTextColor flex justify-center items-center  ">
      <div className="flex flex-col items-center gap-12 py-44 max-w-64 ">
        <h6 className="h6 text-base font-bold">SUMMER 2020</h6>
        <h2 className="h2 text-4xl font-bold">NEW COLLECTION</h2>
        <h4 className="text-xl text-lightGray">We know how large objects will act, but things on a small scale.</h4>
        <button className="bg-succes text-lightTextColor text-3xl font-bold w-56 h-16 rounded-md">SHOP NOW</button>
      </div>
      </div>
    )
  }
  
  export default Slider
  