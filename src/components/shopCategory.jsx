import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react"; // Ok ikonları
import { Link } from "react-router-dom";
import { fetchCategories } from "../store/actions/categoryActions";
import { fetchProducts, setFilter } from "../store/actions/productActions";

function ShopCategory() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // Local state to manage visibility of additional categories (only category names)
  const [showCategories, setShowCategories] = useState(false); // Kategori isimlerinin görünürlüğü için state
  const [showAll, setShowAll] = useState(false); // Kategorilerin tüm resimlerinin görünürlüğü için state

  useEffect(() => {
    dispatch(fetchCategories()); // Kategorileri almak için dispatch
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // İlk 5 kategori (resimler için)
  const topCategories = [...categories].slice(0, 5);
  // Tüm kategoriler (kategori isimleri ve linkler)
  const allCategories = categories;
  // Kalan kategoriler
  const remainingCategories = categories.slice(5);

  const handleCategoryClick = (category) => {
    dispatch(setFilter(category.id));
    dispatch(fetchProducts({ category: category.id }));
  };

  return (
    <div className="bg-lightGray flex flex-col sm:px-40">
      <div className="flex flex-col gap-16 px-4 sm:px-16 py-8 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="h4 font-bold flex justify-center">
          Shop
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="ml-2"
          >
            {showCategories ? <ChevronUp /> : <ChevronDown />}{" "}
            {/* Ok ikonunu değiştirmek */}
          </button>
        </h4>
        <div className="flex gap-2 h7 font-bold justify-center">
          <Link to="/">Home</Link>
          <p>
            <ChevronRight />
          </p>
          <Link to="/shop">Shop</Link>
        </div>
      </div>
      <div className="flex gap-40">
        {/* Eğer showCategories true ise kategori isimlerini ve linklerini göster */}
        {showCategories && (
          <div className="py-4 px-4">
            <p className="text-lg font-bold pb-4">WOMEN</p>
            <ul className="space-y-2">
              {categories
                .filter((category) => category.gender === "k")
                .map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/shop/${category.gender}/${category.title}/${category.id}`}
                      className="text-lg"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {showCategories && (
          <div className="py-4 px-4">
            <p className="text-lg font-bold pb-4">MEN</p>
            <ul className="space-y-2">
              {categories
                .filter((category) => category.gender === "e")
                .map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/shop/${category.gender}/${category.title}/${category.id}`}
                      className="text-lg"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {/* Kategorilerin görsel olarak görünmesini sağlıyoruz */}
      <div className="grid grid-cols-1 gap-6 px-4 py-4 sm:grid-cols-5 sm:gap-4">
        {topCategories.map((category) => (
          <Link
            to={`/shop/${category.gender}/${category.title}/${category.id}`}
            key={category.id}
            className="relative group"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="relative mx-2 overflow-hidden sm:h6">
              <img
                src={category.img}
                alt={category.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold">{category.title}</h3>
                <p className="mt-2">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More butonu sadece resimlerin görünürlüğünü kontrol eder */}
      {showAll && (
        <div className="grid grid-cols-1 gap-6 px-4 pb-8 sm:grid-cols-5 sm:gap-4">
          {remainingCategories.map((category) => (
            <Link
              to={`/shop/${category.gender}/${category.title}/${category.id}`}
              key={category.id}
              className="relative group"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="relative mx-2 overflow-hidden sm:h6">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="mt-2">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Show More/Show Less butonu */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="flex items-center"
      >
        {showAll ? "Show Less" : "Show More"}
        <ChevronDown
          className={`ml-2 ${showAll ? "transform rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

export default ShopCategory;
