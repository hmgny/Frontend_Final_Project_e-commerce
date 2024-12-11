import React from "react" 

function Slider() {
  

    return (
      <div className="bg-[url('/images/homeHero.jpg')] bg-no-repeat bg-cover bg-top text-lightTextColor flex justify-center items-center sm:items-start sm:justify-start sm:px-40 ">
        <div className="flex flex-col items-center sm:items-start gap-12 py-44 max-w-64 sm:max-w-none">
          <h6 className="h6 font-bold">SUMMER 2020</h6>
          <h2 className="h2 sm:h1 font-bold">NEW COLLECTION</h2>
          <h4 className="h4 sm:h5 sm:max-w-80 text-lightGray">
            We know how large objects will act, but things on a small scale.
          </h4>
          <button className="bg-succes text-lightTextColor text-3xl font-bold w-56 h-16 rounded-md">
            SHOP NOW
          </button>
        </div>
      </div>
    )
  }
  
  export default Slider
  