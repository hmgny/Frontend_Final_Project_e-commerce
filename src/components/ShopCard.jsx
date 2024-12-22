import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { fetchProducts } from "@/store/actions/productActions";
import { Circle } from "lucide-react";

function ShopCard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // Parse URL parameters
  const queryParams = new URLSearchParams(location.search);
  const urlLimit = parseInt(queryParams.get("limit")) || 25;
  const urlOffset = parseInt(queryParams.get("offset")) || 0;

  const {
    productList = [],
    fetchState,
    total,
  } = useSelector((state) => state.product || {});

  const [productsPerPage] = useState(urlLimit);
  const [currentPage, setCurrentPage] = useState(
    Math.floor(urlOffset / productsPerPage) + 1
  );

  useEffect(() => {
    // Calculate offset based on current page
    const offset = (currentPage - 1) * productsPerPage;
    history.replace({
      pathname: "shop/",
      search: `?limit=${productsPerPage}&offset=${offset}`,
    });

    dispatch(
      fetchProducts({
        limit: productsPerPage,
        offset: offset,
      })
    );
  }, [dispatch, currentPage, productsPerPage, history]);

  if (fetchState === "LOADING") {
    return <Circle className="animate-spin" />;
  }

  if (fetchState === "FAILED") {
    return <div className="error">Failed to load products</div>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(total / productsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  return (
    <div className="p-8 sm:px-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {productList.map((product, index) => (
          <div key={product.id || index} className="flex flex-col">
            <div className="relative group overflow-hidden mx-8">
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
                  )}₺`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination UI */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border disabled:bg-gray-100"
          >
            First
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border disabled:bg-gray-100"
          >
            Previous
          </button>

          {/* Sayfa numaraları */}
          {[...Array(totalPages)].map((_, i) => {
            // Sadece aktif sayfayı ve etrafındaki 2 sayfayı göster
            if (
              i + 1 === 1 ||
              i + 1 === totalPages ||
              (i + 1 >= currentPage - 2 && i + 1 <= currentPage + 2)
            ) {
              return (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 border ${
                    currentPage === i + 1 ? "bg-Primary text-white" : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              );
            }
            return null;
          })}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border disabled:bg-gray-100"
          >
            Next
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border disabled:bg-gray-100"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
