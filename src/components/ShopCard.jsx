import React, { useState } from 'react';

function ShopCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const products = [
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best1.jpg",
      colors: ["blue", "green", "orange", "black"]
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best2.jpg",
      colors: ["blue", "green", "orange", "black"]
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best3.jpg",
      colors: ["blue", "green", "orange", "black"]
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best4.jpg",
      colors: ["blue", "green", "orange", "black"]
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best5.jpg",
      colors: ["blue", "green", "orange", "black"]
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best6.jpg",
      colors: ["blue", "green", "orange", "black"]
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best7.jpg",
      colors: ["blue", "green", "orange", "black"]
    },
    {
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$16.48",
      salePrice: "$6.48",
      img: "/images/best8.jpg",
      colors: ["blue", "green", "orange", "black"]
    }
  ];

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-20">
        {currentProducts.map((product, index) => (
          <div key={index} className="flex flex-col">
            <div className="relative group overflow-hidden mx-8">
              <img
                src={product.img}
                alt={product.title}
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center mt-4">
              <h3 className="text-base font-bold text-textColor">{product.title}</h3>
              <p className="text-SecondaryTextColor text-sm">{product.department}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-SecondaryTextColor line-through">{product.originalPrice}</span>
                <span className="text-Primary">{product.salePrice}</span>
              </div>
              <div className="flex gap-2 mt-2">
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full`}
                    style={{ backgroundColor: color }}
                  />
                ))}
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
            className={`px-4 py-2 border ${currentPage === 1 ? 'bg-gray-100' : 'bg-white'}`}
          >
            First
          </button>
          {[...Array(pageNumbers)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border ${
                currentPage === i + 1 ? 'bg-Primary text-white' : 'bg-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers}
            className={`px-4 py-2 border ${currentPage === pageNumbers ? 'bg-gray-100' : 'bg-white'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;