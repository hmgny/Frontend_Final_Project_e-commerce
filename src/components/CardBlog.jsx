import React from "react";
import {
 
  AlarmClock,
  ChartArea,
  ChevronRight,
} from "lucide-react";

function CardBlog() {
  return (
    <div className=" flex flex-col gap-16 container">
      <div className="relative cursor-pointer flex flex-col gap-4">
        <div>
          <img
            src="/images/blog_img1.jpg"
            alt="best1"
            className="w-screen h-BlogCard  "
          />
          <button className="absolute transform translate-x-8 -translate-y-64 bg-danger text-lightTextColor h7 font-bold px-4 py-2">
            NEW
          </button>
        </div>

        <div className=" flex flex-col gap-4 p-12">
              <div className="flex justify-between pr-56 gap-4">
                <a className="text-disabledElement ">Google</a>
                <a className="text-SecondaryTextColor">Trending</a>
                <a className="text-SecondaryTextColor">New</a>
              </div>
          <h5 className="h5 text-textColor">
            Loudest à la Madison #1 (L'integral)
          </h5>
          <p className="h7 text-SecondaryTextColor ">
            We focus on ergonomics and meeting you where you work. It's only a
            keystroke away.
          </p>

          <div className="flex justify-between">
            <p className="flex text-SecondaryTextColor h8">
              <AlarmClock color="#23A6F0" size={18} />
              22 April 2021
            </p>
            <p className="flex text-SecondaryTextColor h8">
              <ChartArea color="#23856D" size={20} />
              10 Comments
            </p>
          </div>

          <p className="flex h7 font-bold">
            Learn More <ChevronRight color="#23A6F0" size={20} />
          </p>
        </div>
      </div>
    </div>
    
  );
}

export default CardBlog;
