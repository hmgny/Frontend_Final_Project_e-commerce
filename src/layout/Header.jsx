import React from "react" 
import {User , Search , ShoppingCart, AlignRight} from "lucide-react"


function Header() {
  

    return (
      <>
      <header className="flex flex-col p-8 sm:p-12 py-4 sm:flex-row sm:justify-between">
        <div className=" flex justify-between w-full">
          <a className="h4 font-bold text-textColor sm:flex sm:justify-start">Bandage</a>
          <div className="sm:flex sm:flex-row sm:items-center hidden sm:gap-5 mr-72 ml-16 ">
            <a className="text-SecondaryTextColor h7 font-bold">Home</a>
            <a className="text-SecondaryTextColor h7 font-bold">Shop </a>
            <a className="text-SecondaryTextColor h7 font-bold">About</a>
            <a className="text-SecondaryTextColor h7 font-bold">Blog</a>
            <a className="text-SecondaryTextColor h7 font-bold">Contact</a>
            <a className="text-SecondaryTextColor h7 font-bold">Pages</a>
          </div>
          <div className="flex gap-5 items-center justify-end">
            <a className="flex">
            <p className="w-6 h-6">
              <User className="text-black sm:text-Primary" />
            </p>
            <h6 className="hidden sm:block text-Primary h6 font-bold">Login / Register</h6>
            </a>
            <a className="w-6 h-6">
              <Search className="text-black sm:text-Primary" />
            </a>
            <a className="w-6 h-6">
              <ShoppingCart className="text-black sm:text-Primary" />
            </a>
            <a className="w-6 h-6 sm:hidden">
              <AlignRight className="text-black "/>
            </a>
            <a className="sm:w-6 sm:h-6 hidden sm:block">
              <Heart className="sm:text-Primary "/>
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-7 py-20 sm:flex-row sm:hidden">
          <a className="text-SecondaryTextColor h3">Home</a>
          <a className="text-SecondaryTextColor h3">Product</a>
          <a className="text-SecondaryTextColor h3">Pricing</a>
          <a className="text-SecondaryTextColor h3">Contact</a>
        </div>
      </header>

       
      </>
    )
  }
  
  export default Header