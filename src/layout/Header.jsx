import React from "react" 
import {User , Search , ShoppingCart, AlignRight} from "lucide-react"


function Header() {
  

    return (
      <>
      <header className="flex flex-col container py-4">
        <div className=" flex justify-between">
            <a className="h4 font-bold text-textColor">Bandage</a>
            <div className="flex gap-5 items-center">
                <a className="w-6 h-6"><User color="black"/></a>
                <a className="w-6 h-6"><Search color="black"/></a>
                <a className="w-6 h-6"><ShoppingCart color="black"/></a>
                <a className="w-6 h-6"><AlignRight color="black"/></a>
            </div>
        </div>
        <div className="flex flex-col items-center gap-7 py-20">
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