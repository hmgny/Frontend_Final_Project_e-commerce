import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { fetchProducts } from "@/store/actions/productActions";

function ShopCard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // Parse URL parameters
  const queryParams = new URLSearchParams(location.search);
  const urlLimit = parseInt(queryParams.get("limit")) || 25;
  const urlOffset = parseInt(queryParams.get("offset")) || 0;
  const urlCategory = queryParams.get("category") || "";

  const {
    productList = [],
    fetchState,
    total,
  } = useSelector((state) => state.product || {});

  const initialPage = Math.floor(urlOffset / urlLimit) + 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [productsPerPage] = useState(urlLimit);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const totalPages = Math.ceil(total / productsPerPage);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset page when category changes
    history.push(`/shop?category=${category}`);
  };

  const handleProductClick = (product) => {
    // Create URL-friendly slug from product name
    const nameSlug = product.name.toLowerCase().replace(/\s+/g, "-");
    window.scrollTo(0, 0);
    history.push(
      `/shop/${product.gender}/${product.category_name}/${product.category_id}/${nameSlug}/${product.id}`
    );
  };

  // Handle pagination
  const paginate = (newPage) => {
    setCurrentPage(newPage);
    const newOffset = (newPage - 1) * productsPerPage;
    const basePath = location.pathname.includes("/shop") ? "/shop" : "/home";
    history.push(`${basePath}?limit=${productsPerPage}&offset=${newOffset}`);
  };
  useEffect(() => {
    const offset = (currentPage - 1) * productsPerPage;

    if (selectedCategory) {
      // Fetch products by category
      dispatch(
        fetchProducts({
          category: selectedCategory,
        })
      );
    } else {
      // Fetch products with pagination
      dispatch(
        fetchProducts({
          limit: productsPerPage,
          offset: offset,
        })
      );
    }
  }, [dispatch, currentPage, productsPerPage, selectedCategory]);

  // Category list rendering
  const renderCategories = () => (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={selectedCategory === category ? "active" : ""}
        >
          {category}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-8 sm:px-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {productList.map((product, index) => (
          <div key={product.id || index} className="flex flex-col my-12">
            <div className="relative group overflow-hidden mx-8 hover:scale-105">
              {product.images.map((image, imageIndex) => (
                <img
                  onClick={() => handleProductClick(product)}
                  key={imageIndex}
                  src={image.url}
                  alt={`${product.name} - Image ${imageIndex + 1}`}
                  className="w-full object-cover aspect-[3/4] "
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
                <span className="text-Secondary font-bold">
                  {`${(Math.floor((product.price / 2) * 100) / 100).toFixed(
                    2
                  )}₺`}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="w-4 h-4 rounded-full bg-Primary"></button>
                <button className="w-4 h-4 rounded-full bg-green-500"></button>
                <button className="w-4 h-4 rounded-full bg-orange-500"></button>
                <button className="w-4 h-4 rounded-full bg-darkBackground"></button>
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
