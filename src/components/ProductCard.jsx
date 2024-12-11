import React from "react";
import {Circle} from "lucide-react"

function ProductCard() {
  return (
    <div className="relative cursor-pointer flex flex-col gap-4">
          <img src="/images/best2.jpg" alt="best1" className="h-cardBestceller" />
          <h6 className="font-bold h6 flex justify-center text-textColor">
            Graphic Design
          </h6>
          <p className="font-bold h7 flex justify-center text-SecondaryTextColor">
            English Department
          </p>
          <div className="flex justify-center gap-2">
            <h6 className="font-bold h6 flex justify-center text-muted">
              $16.48
            </h6>
            <h6 className="font-bold h6 flex justify-center text-Secondary">
              $6.48
            </h6>
          </div>
          <div className="flex justify-center">
            <a className="bg-Primary rounded-full"><Circle size={16} /></a>
            <a className="bg-Secondary rounded-full"><Circle size={16} /></a>
            <a className="bg-alert rounded-full"><Circle size={16} /></a>
            <a className="bg-darkBackground rounded-full"><Circle size={16} /></a>
          </div>
        </div>
  );
}

export default ProductCard;
