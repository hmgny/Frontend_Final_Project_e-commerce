import React, { useEffect, useRef, useState } from "react";
import { User, Search, ShoppingCart, AlignRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions/categoryActions";

function Header() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const cart = useSelector((state) => state.shoppingCart.cart || []);

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    );
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <header className="flex flex-col px-8 py-4 sm:flex-row sm:justify-between">
      <div className="flex justify-between w-full">
        <Link
          to="/"
          className="h4 font-bold text-textColor sm:flex sm:justify-start"
        >
          Bandage
        </Link>
        <div className="sm:flex gap-10 items-center hidden">
          <Link
            to="/"
            className="text-SecondaryTextColor h4 hover:text-black hover:font-bold"
          >
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <Link
              to="/shop"
              className="text-SecondaryTextColor h4 hover:text-black hover:font-bold"
            >
              Shop
            </Link>
            {showCategories && (
              <div className="absolute bg-white w-96 flex gap-20 p-4 z-10 shadow-lg">
                {/* Kadın kategorilerini listele */}
                <div>
                  <p className="h6 font-bold pb-4">WOMEN</p>
                  <ul className="space-y-2">
                    {categories
                      .filter((category) => category.gender === "k")
                      .map((category) => (
                        <li key={category.id}>
                          <Link
                            to={`/shop/${category.gender}/${category.code}`}
                            className="text-lg"
                          >
                            {category.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Erkek kategorilerini listele */}
                <div className="mt-4">
                  <p className="h6 font-bold pb-4">MEN</p>
                  <ul className="space-y-2">
                    {categories
                      .filter((category) => category.gender === "e")
                      .map((category) => (
                        <li key={category.id}>
                          <Link
                            to={`/shop/${category.gender}/${category.code}`}
                            className="text-lg"
                          >
                            {category.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <Link
            to=""
            className="text-SecondaryTextColor h4 hover:text-black hover:font-bold"
          >
            About
          </Link>
          <Link
            to=""
            className="text-SecondaryTextColor h4 hover:text-black hover:font-bold"
          >
            Blog
          </Link>
          <Link
            to="/product/:id"
            className="text-SecondaryTextColor h4 hover:text-black hover:font-bold"
          >
            Product
          </Link>
          <Link
            to=""
            className="text-SecondaryTextColor h4 hover:text-black hover:font-bold"
          >
            Contact
          </Link>
        </div>

        <div className="flex gap-5 items-center justify-end">
          <div className="flex gap-1">
            {user ? (
              <div className="flex items-center">
                <Avatar
                  className="hidden sm:block"
                  name={user.name}
                  src={user.mail || ""}
                  size="40"
                  round={true}
                />
                <h6 className="text-Primary h6 font-bold ml-2 hidden sm:block">
                  {user.name}
                </h6>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-red-500 font-bold"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="flex items-center">
                  <User className="text-black sm:text-Primary w-6 h-6" />
                  <h6 className="text-Primary h6 font-bold">Login</h6>
                </Link>
                <span className="text-Primary h6 font-bold">/</span>
                <Link to="/signup" className="flex items-center">
                  <h6 className="text-Primary h6 font-bold">Register</h6>
                </Link>
              </div>
            )}
          </div>
          <Link to="" className="w-6 h-6">
            <Search className="text-black sm:text-Primary" />
          </Link>
          <div>
            <div className="relative group">
              <button
                onClick={toggleCart}
                className="relative focus:outline-none"
              >
                <ShoppingCart className="text-black sm:text-Primary" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.reduce((total, item) => total + item.count, 0)}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              <div
                className={`absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg z-50 ${
                  showCart ? "block" : "hidden"
                }`}
              >
                <div className="p-4">
                  <div className="max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 py-2 border-b"
                      >
                        <img
                          src={
                            item.product.image?.url ||
                            item.product.images?.[0]?.url
                          }
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {item.count} x ${item.product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {cart.length > 0 ? (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-medium mb-4">
                        <span>Toplam:</span>
                        <span>
                          $
                          {cart
                            .reduce(
                              (total, item) =>
                                total + item.product.price * item.count,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <Link
                        to="/shoppingCart"
                        className="block w-full bg-Primary text-white text-center py-2 rounded hover:bg-Primary/90"
                      >
                        Sepete Git
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p>Sepetiniz boş</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Link to="" className="sm:w-6 sm:h-6 hidden sm:block">
            <Heart className="sm:text-Primary" />
          </Link>
          <button
            className="w-6 h-6 sm:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AlignRight className="text-black" />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col items-center gap-7 py-20 sm:flex-row sm:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/"
          className="text-SecondaryTextColor h3  hover:text-black hover:font-bold"
        >
          Home
        </Link>
        <div
          className="relative"
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <Link
            to="/shop"
            className="text-SecondaryTextColor h3 hover:text-black hover:font-bold"
          >
            Shop
          </Link>
          {showCategories && (
            <div className="absolute bg-white w-96 flex gap-20 p-4 z-10 shadow-lg">
              {/* Kadın kategorilerini listele */}
              <div>
                <p className="h6 font-bold pb-4">WOMEN</p>
                <ul className="space-y-2">
                  {categories
                    .filter((category) => category.gender === "k")
                    .map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/shop/${category.gender}/${category.code}`}
                          className="text-lg"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              {/* Erkek kategorilerini listele */}
              <div className="mt-4">
                <p className="h6 font-bold pb-4">MEN</p>
                <ul className="space-y-2">
                  {categories
                    .filter((category) => category.gender === "e")
                    .map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/shop/${category.gender}/${category.code}`}
                          className="text-lg"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <Link
          to="/product/:id"
          className="text-SecondaryTextColor h3  hover:text-black hover:font-bold"
        >
          About
        </Link>
        <Link
          to=""
          className="text-SecondaryTextColor h3  hover:text-black hover:font-bold"
        >
          Blog
        </Link>
        <Link
          to=""
          className="text-SecondaryTextColor h3  hover:text-black hover:font-bold"
        >
          Contact
        </Link>
        <Link
          to=""
          className="text-SecondaryTextColor h3 hover:text-black hover:font-bold"
        >
          Pages
        </Link>
      </div>
    </header>
  );
}

export default Header;
