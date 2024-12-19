import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/actions/productActions";
import { Circle } from "lucide-react";

function ShopCard() {
  const dispatch = useDispatch();
  const { productList = [], fetchState } = useSelector(
    (state) => state.product || {}
  );
  const [currentPage, setCurrentPage] = useState(1); // Burada currentPage'i tanımladık
  let productsPerPage = window.innerWidth < 600 ? 5 : 12;

  window.addEventListener("resize", () => {
    productsPerPage = window.innerWidth < 600 ? 5 : 12;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (fetchState === "LOADING") {
    return <Circle />;
  }

  if (fetchState === "FAILED") {
    return <div className="error">Failed to load products</div>;
  }

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = Math.ceil(productList.length / productsPerPage);

  return (
    <div className="p-8 sm:px-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {currentProducts.map((product, index) => (
          <div key={index} className="flex flex-col">
            <div key={index} className="relative group overflow-hidden mx-8">
              {product.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image.url}
                  alt={`${product.name} - Image ${imageIndex + 1}`}
                  className="w-full object-cover aspect-[3/4]"
                />
              ))}
            </div>
            <div className="flex flex-col items-center mt-4">
              <h3 className="text-base font-bold text-textColor">
                {product.description}
              </h3>
              <p className="text-SecondaryTextColor text-sm">
                {product.department}
              </p>
              <div className="flex gap-2 mt-2">
                <span className="text-SecondaryTextColor line-through">
                  {product.price}₺
                </span>
                <span className="text-Primary">
                  {`${(Math.floor((product.price / 2) * 100) / 100).toFixed(
                    2
                  )}`}
                  ₺{" "}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(1)}
            className={`px-4 py-2 border ${
              currentPage === 1 ? "bg-gray-100" : "bg-white"
            }`}
          >
            First
          </button>
          {[...Array(pageNumbers)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border ${
                currentPage === i + 1 ? "bg-Primary text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers}
            className={`px-4 py-2 border ${
              currentPage === pageNumbers ? "bg-gray-100" : "bg-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
