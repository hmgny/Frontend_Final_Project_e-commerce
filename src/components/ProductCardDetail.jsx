import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { connect } from "react-redux";
import {
  nextSlide,
  prevSlide,
  goToSlide,
} from "../store/actions/carouselActions";

function ProductCardDetail({
  currentIndex,
  images,
  nextSlide,
  prevSlide,
  goToSlide,
}) {
  return (
    <div className="bg-lightGray flex flex-col">
      <div className="flex flex-col items-start gap-4 max-w-2xl mx-auto p-4">
        {/* Main Carousel */}
        <div className="relative w-full">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-[500px] object-cover rounded-lg"
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/80 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/80 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-20 h-20 ${
                currentIndex === index ? "border-2 border-Primary" : ""
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col  gap-4 p-12">
        {/* Right side - Product Details */}
        <div className="w-1/2 flex flex-col gap-6">
          <h5 className="h5 font-bold text-textColor">Floating Phone</h5>

          {/* Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <span key={star} className="text-yellow-400 text-2xl">
                  ★
                </span>
              ))}
              <span className="text-yellow-400 text-2xl">☆</span>
            </div>
            <span className="text-gray-600 ml-2">10 Reviews</span>
          </div>

          {/* Price */}
          <div className="h4 font-bold text-textColor">$1,139.33</div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Availability :</span>
            <span className="text-Primary">In Stock</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>

          <hr className="flex  text-gray-600"></hr>
          {/* Color Options */}
          <div className="flex gap-4">
            <button className="w-7 h-7 rounded-full bg-Primary"></button>
            <button className="w-7 h-7 rounded-full bg-green-500"></button>
            <button className="w-7 h-7 rounded-full bg-orange-500"></button>
            <button className="w-7 h-7 rounded-full bg-darkBackground"></button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-Primary text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors ">
              Select Options
            </button>
            <button className="p-3 w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-3 w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              <ShoppingCart size={20} />
            </button>
            <button className="p-3 w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              <Eye size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentIndex: state.carousel.currentIndex,
  images: state.carousel.images,
});

const mapDispatchToProps = {
  nextSlide,
  prevSlide,
  goToSlide,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardDetail);
