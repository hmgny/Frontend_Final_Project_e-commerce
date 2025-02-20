import React from "react";
import { AlarmClock, ChartArea, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function CardBlog() {
  const Blogimg = [
    {
      img: "/images/blog_img1.jpg",
      alt: "best1",
    },
    {
      img: "/images/blog_img2.jpg",
      alt: "best1",
    },
    {
      img: "/images/blog_img3.jpg",
      alt: "best1",
    },
  ];
  return (
    <div className="px-8 flex flex-col items-center py-24 gap-16  ">
      <div className="max-w-52 sm:max-w-none flex flex-col gap-5 text-center">
        <h2 className="h2 font-bold flex justify-center text-textColor">
          A Little Art
        </h2>
        <p className="text-SecondaryTextColor h5">Treat yourself to art</p>
      </div>

      <div className="flex flex-wrap gap-10 justify-center sm:gap-4">
        {Blogimg.map((img, index) => (
          <div key={index} className="w-Card flex flex-col sm:w-BlogCardWeb">
            <div className="relative cursor-pointer flex flex-col gap-4">
              <div>
                <img
                  src={img.img}
                  alt={img.alt}
                  className="w-Card h-BlogCard object-cover sm:w-BlogCardWeb"
                />
                <button className="absolute transform translate-x-8 -translate-y-80 bg-danger text-lightTextColor h7 font-bold px-4 py-2">
                  NEW
                </button>
              </div>

              <div className="flex flex-col gap-6 p-4">
                <div className="flex gap-4">
                  <Link to="" className="text-disabledElement">
                    Google
                  </Link>
                  <Link to="" className="text-SecondaryTextColor">
                    Trending
                  </Link>
                  <Link to="" className="text-SecondaryTextColor">
                    New
                  </Link>
                </div>

                <h5 className="h5 text-textColor">
                  Loudest à la Madison #1 (L'integral)
                </h5>
                <p className="h6 text-SecondaryTextColor">
                  We aim to bring ergonomics and aesthetics together in the same
                  place. Just a keystroke away.
                </p>

                <div className="flex justify-between">
                  <p className="flex items-center gap-2 text-SecondaryTextColor h8">
                    <AlarmClock color="#23A6F0" size={18} />
                    22 April 2024
                  </p>
                  <p className="flex items-center gap-2 text-SecondaryTextColor h8">
                    <ChartArea color="#23856D" size={20} />
                    10 Comments
                  </p>
                </div>

                <Link to="/product/:id">
                  <button className="mt-4 bg-white text-Primary font-bold border border-Primary px-6 py-2 rounded-full transition-colors w-40 flex items-center gap-2">
                    Learn More <span className="text-lg">&gt;</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardBlog;
