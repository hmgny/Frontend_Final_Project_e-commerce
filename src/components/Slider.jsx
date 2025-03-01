import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sliderImages = [
  "/images/homeHero.jpg",
  "/images/homeHero.jpg",
  "/images/homeHero.jpg",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Otomatik kaydırma işlemi
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
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
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className="min-w-full bg-no-repeat bg-cover bg-top text-lightTextColor flex justify-center items-center sm:items-start sm:justify-start sm:px-40"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="flex flex-col items-center sm:items-start gap-12 py-44 max-w-64 sm:max-w-none text-center">
              <h6 className="h4 font-bold">SPRING 2024</h6>
              <h2 className="h2 sm:h1 font-bold">NEW COLLECTION</h2>
              <h3 className="h3 sm:h5 sm:max-w-80 text-lightGray">
                Don't miss the blooming Spring discounts
              </h3>
              <Link to="/shop">
                <button className="bg-succes text-lightTextColor text-3xl font-bold w-56 h-16 rounded-md">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Sol ve sağ oklar */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-5xl text-lightTextColor"
        onClick={goToPrev}
      >
        &#10094;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-5xl text-lightTextColor"
        onClick={goToNext}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
