import React, { useState, useEffect } from "react";

const sliderImages = [
  "/images/men_png_yesil.png",
  "/images/best1.jpg",
  "/images/best2.jpg",
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
    <div className="relative w-full h-screen">
      {/* Kaydırılabilir içerik */}
      <div className="flex transition-all duration-500 ease-in-out">
        {/* Slider içeriği */}
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-screen flex flex-col gap-8 justify-center items-center sm:items-start pt-56 sm:px-44 bg-Secondary text-lightTextColor"
            style={{ display: index === currentIndex ? "flex" : "none" }} // Yalnızca geçerli slayt gösterilsin
          >
            <div className="flex flex-col gap-8 max-w-64 sm:max-w-none">
              <h5 className="h5 text-base">SUMMER 2020</h5>
              <h2 className="h2 text-4xl font-bold">NEW COLLECTION</h2>
              <h4 className="text-xl text-lightGray">
                We know how large objects will act, but things on a small scale.
              </h4>
              <h4 className="h4 text-base font-bold">$16.48</h4>
              <button className="bg-succes text-lightTextColor text-3xl h7 font-bold w-56 h-16 rounded-md">
                ADD TO CART
              </button>
            </div>
            <img
              src={image}
              alt={`Carousel Image ${index + 1}`}
              className="object-top object-cover w-full h-[600px] sm:h-[800px] mt-8"
            />
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
