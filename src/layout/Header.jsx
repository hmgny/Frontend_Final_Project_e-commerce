import React from "react";

import { User, Search, ShoppingCart, AlignRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="flex flex-col px-8 py-4 sm:flex-row sm:justify-between">
        <div className=" flex justify-between w-full">
          <Link
            to=""
            className="h4 font-bold text-textColor sm:flex sm:justify-start"
          >
            Bandage
          </Link>
          <div className="sm:flex sm:flex-row sm:items-center hidden sm:gap-5 mr-72 ml-16 ">
            <Link to="" className="text-SecondaryTextColor h7 font-bold">
              Home
            </Link>
            <Link to="" className="text-SecondaryTextColor h7 font-bold">
              Shop{" "}
            </Link>
            <Link to="" className="text-SecondaryTextColor h7 font-bold">
              About
            </Link>
            <Link to="" className="text-SecondaryTextColor h7 font-bold">
              Blog
            </Link>
            <Link to="" className="text-SecondaryTextColor h7 font-bold">
              Contact
            </Link>
            <Link to="" className="text-SecondaryTextColor h7 font-bold">
              Pages
            </Link>
          </div>
          <div className="flex gap-5 items-center justify-end">
            <div className="flex gap-1">
              <Link to="" className="flex">
                <p className="w-6 h-6">
                  <User className="text-black sm:text-Primary" />
                </p>
                <h6 className="hidden sm:block text-Primary h6 font-bold">
                  Login
                </h6>
              </Link>
              <h6 className="hidden sm:block text-Primary h6 font-bold">/</h6>
              <Link to="/signup" className="flex">
                <h6 className="hidden sm:block text-Primary h6 font-bold">
                  Register
                </h6>
              </Link>
            </div>

            <Link to="" className="w-6 h-6">
              <Search className="text-black sm:text-Primary" />
            </Link>
            <Link to="" className="w-6 h-6">
              <ShoppingCart className="text-black sm:text-Primary" />
            </Link>
            <Link to="" className="w-6 h-6 sm:hidden">
              <AlignRight className="text-black " />
            </Link>
            <Link to="" className="sm:w-6 sm:h-6 hidden sm:block">
              <Heart className="sm:text-Primary " />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-7 py-20 sm:flex-row sm:hidden">
          <Link to="" className="text-SecondaryTextColor h3">
            Home
          </Link>
          <Link to="" className="text-SecondaryTextColor h3">
            Product
          </Link>
          <Link to="" className="text-SecondaryTextColor h3">
            Pricing
          </Link>
          <Link to="" className="text-SecondaryTextColor h3">
            Contact
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
