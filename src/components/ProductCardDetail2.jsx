import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";


function ProductCardDetail2() {
  return (
    <div className="px-20 py-10 flex flex-col gap-10">
    <div className="flex justify-between">
       <Link to="">Description</Link>
       <Link to="">Additional Information</Link> 
       <Link to="">Reviews</Link>  
    </div>
    <div>
    <img className=" rounded-lg " src="/images/blog_img1.jpg"/>
    </div>
    <div className="flex flex-col gap-6">
        <h4 className="h4 font-bold">the quick fox jumps over </h4>
        <p className="h7 text-SecondaryTextColor">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
        <p className="h7 text-SecondaryTextColor">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
        <p className="h7 text-SecondaryTextColor">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
    </div>
    <div className="flex flex-col gap-6">
        <h4 className="h4 font-bold">the quick fox jumps over </h4>
        <p className="h7 flex text-SecondaryTextColor"><ChevronRight />the quick fox jumps over the lazy dog</p>
        <p className="h7 flex text-SecondaryTextColor"><ChevronRight />the quick fox jumps over the lazy dog</p>
        <p className="h7 flex text-SecondaryTextColor"><ChevronRight />the quick fox jumps over the lazy dog</p>
        <p className="h7 flex text-SecondaryTextColor"><ChevronRight />the quick fox jumps over the lazy dog</p>
    </div>
    <div className="flex flex-col gap-6">
        <h4 className="h4 font-bold">the quick fox jumps over </h4>
        <p className="h7 flex text-SecondaryTextColor"><ChevronRight />the quick fox jumps over the lazy dog</p>
        <p className="h7 flex text-SecondaryTextColor"><ChevronRight />the quick fox jumps over the lazy dog</p>
        <p className="h7 flex text-SecondaryTextColor"><ChevronRight />the quick fox jumps over the lazy dog</p>
    </div>
    </div>
  );
}

export default ProductCardDetail2;