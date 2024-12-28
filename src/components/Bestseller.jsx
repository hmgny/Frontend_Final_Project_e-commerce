import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Bestseller() {
  const { productList } = useSelector((state) => state.product || []);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const history = useHistory();

  const handleProductClick = (product) => {
    // Ürün adından slug oluşturuluyor
    const nameSlug = product.name.toLowerCase().replace(/\s+/g, "-");
    window.scrollTo(0, 0);
    history.push(
      `/shop/${product.gender}/${product.category_name}/${product.category_id}/${nameSlug}/${product.id}`
    );
  };

  useEffect(() => {
    // Ürün listesi mevcutsa, sıralama işlemi yap
    if (productList.length > 0) {
      const sortedProducts = productList
        .sort((a, b) => b.rating - a.rating) // Puanlarına göre sıralama
        .slice(0, 8); // İlk 8 ürünü alıyoruz
      setTopRatedProducts(sortedProducts);
    }
  }, [productList]);

  return (
    <div className="px-8 sm:px-40 flex flex-col items-center py-24 gap-16">
      <div className="max-w-52 flex flex-col gap-5 sm:max-w-screen-2xl text-center">
        <h5 className="h5 text-SecondaryTextColor flex justify-center">
          Featured Products
        </h5>
        <h4 className="h4 font-bold flex justify-center text-textColor ">
          BESTSELLER PRODUCTS
        </h4>
        <p className="text-SecondaryTextColor h7 justify-center">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Yalnızca en yüksek puanlı 8 ürünü ShopCard bileşeniyle göster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {topRatedProducts.map((product) => (
          <div key={product.id} className="flex flex-col my-12">
            <div className="relative group overflow-hidden mx-8 hover:scale-105">
              {product.images.map((image, imageIndex) => (
                <img
                  onClick={() => handleProductClick(product)}
                  key={imageIndex}
                  src={image.url}
                  alt={`${product.name} - Image ${imageIndex + 1}`}
                  className="w-full object-cover aspect-[3/4]"
                />
              ))}
            </div>
            <div className="flex flex-col items-center mt-4">
              <h3 className="text-base font-bold text-textColor">
                {product.name}
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
    </div>
  );
}

export default Bestseller;
