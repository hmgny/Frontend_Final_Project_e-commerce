import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../store/actions/productActions";
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
import { Link } from "react-router-dom";

function ProductCardDetail({
  currentIndex,
  images,
  nextSlide,
  prevSlide,
  goToSlide,
}) {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { selectedProduct, isLoading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-Primary"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div>No product found.</div>;
  }

  const productImages = selectedProduct.images || [];
  return (
    <>
      <div className="flex justify-between items-center bg-white shadow-sm sticky top-0 z-10">
        <div className="px-8 py-4">
          <button
            onClick={() => history.goBack()}
            className="h7 flex items-center gap-2 text-Primary hover:text-Primary/80 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to
          </button>
        </div>
        <div className="flex gap-2 h7 font-bold justify-center sm:justify-start p-4">
          <Link to="/" className="text-SecondaryTextColor hover:text-black">
            Home
          </Link>
          <p className="text-SecondaryTextColor">
            <ChevronRight />
          </p>
          <Link to="/shop" className="text-SecondaryTextColor hover:text-black">
            Shop
          </Link>
        </div>
      </div>

      <div className="bg-lightGray flex flex-col sm:flex-row">
        <div className="flex flex-col items-start gap-4 max-w-2xl mx-auto p-4">
          {/* Main Carousel */}
          <div className="relative w-full">
            {selectedProduct.images && (
              <img
                src={selectedProduct.images[currentIndex]?.url}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            )}

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
            {selectedProduct.images &&
              selectedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-20 h-20 ${
                    currentIndex === index ? "border-2 border-Primary" : ""
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-12">
          {/* Right side - Product Details */}
          <div className="w-1/2 flex flex-col gap-6">
            <h5 className="h5 font-bold text-textColor">
              {selectedProduct.name}
            </h5>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < Math.round(selectedProduct.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {selectedProduct.reviewsCount} Reviews
              </span>
            </div>

            {/* Price */}

            <div className="flex gap-5 mt-2">
              <span className="h4 text-textColor line-through">
                ₺{selectedProduct.price}
              </span>
              <span className="h4 text-Secondary font-bold">
                ₺
                {`${(
                  Math.floor((selectedProduct.price / 2) * 100) / 100
                ).toFixed(2)}`}
              </span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Availability :</span>
              <span className="text-Primary">
                {selectedProduct.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            <hr className="flex text-gray-600"></hr>
            {/* Color Options */}
            <div className="flex gap-4">
              <button className="w-7 h-7 rounded-full bg-Primary"></button>
              <button className="w-7 h-7 rounded-full bg-green-500"></button>
              <button className="w-7 h-7 rounded-full bg-orange-500"></button>
              <button className="w-7 h-7 rounded-full bg-darkBackground"></button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="bg-Primary text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors">
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
    </>
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
