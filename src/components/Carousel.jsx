import React, { useState, useEffect } from "react";

const sliderImages = [
  "/images/men_png_yesil.png",
  "/images/men_png_yesil.png",
  "/images/men_png_yesil.png",
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Otomatik kaydırma işlemi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000); // 5 saniyede bir kaydırma

    return () => clearInterval(interval); // Temizlik
  }, []);

  // Sonraki slayta git
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  // Önceki slayta git
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative  w-full h-[50%] overflow-hidden">
      {/* Kaydırılabilir içerik */}
      <div className="flex transition-all duration-500 ease-in-out ">
        {/* Slider içeriği */}
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0  w-full h-full flex flex-col gap-8 justify-center pt-52 sm:pt-0  bg-Secondary text-lightTextColor"
            style={{ display: index === currentIndex ? "flex" : "none" }} // Yalnızca geçerli slayt gösterilsin
          >
            <div className="flex flex-col items-center sm:flex-row sm:justify-around">
              <div className="flex flex-col gap-8 max-w-64 sm:max-w-96 items-center text-center sm:text-start sm:items-start ">
                <h5 className="h4 text-base">SPRINT 2024</h5>
                <h2 className="h2 text-4xl font-bold sm:h1 sm:leading-[80px]">
                  Favorite Classic Products
                </h2>
                <h4 className="text-xl text-lightGray ">
                  For those who can't give up the classics
                </h4>
                <div className="flex flex-col gap-6 sm:flex-row items-center">
                  <h4 className="h4 text-base font-bold">$16.48</h4>
                  <button className="bg-succes text-lightTextColor text-3xl h7 font-bold w-56 h-16 rounded-md">
                    ADD TO CART
                  </button>
                </div>
              </div>
              <img
                src={image}
                alt={`Carousel Image ${index + 1}`}
                className=" object-top object-cover h-[600px] mt-8 sm:mt-0 sm:pt-20  sm:h-3/4"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sol ve sağ oklar */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl text-lightTextColor"
        onClick={goToPrev}
      >
        &#10094;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-lightTextColor"
        onClick={goToNext}
      >
        &#10095;
      </button>
    </div>
  );
}

export default Carousel;
