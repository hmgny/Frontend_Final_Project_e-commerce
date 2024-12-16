import React from "react";
import {
  User,
  Search,
  ShoppingCart,
  AlignRight,
  Circle,
  AlarmClock,
  ChartArea,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageContent from "../layout/PageContent";
import Slider from "../components/Slider";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";

function HomePage() {
  return (
    <>
      <PageContent>
        <Slider></Slider>
        <Category></Category>
        <ProductCard></ProductCard>
        <Carousel></Carousel>

        <div className="text-textColor pt-32 flex flex-col gap-8 justify-center items-center h-[999px] sm:flex-row">
          <div className=" flex flex-col pt-28 gap-8 max-w-64 ">
            <h6 className="h6 text-muted">SUMMER 2020</h6>
            <h2 className="h2 text-4xl font-bold">
              Part Of the Neural Universe
            </h2>
            <h5 className="h5 text-SecondaryTextColor">
              We know how large objects will act, but things on a small scale.
            </h5>
            <button className="bg-Primary text-lightTextColor text-3xl h7 font-bold w-[165px] h-[52px] rounded-md">
              BUY NOW
            </button>
            <button className="bg-lightBackground border-Primary text-Primary text-3xl h7 font-bold w-[165px] h-[52px] rounded-md">
              Learn More
            </button>
          </div>
          <img
            src="/images/cift_png.png"
            alt=""
            className="object-bottom object-cover"
          />
        </div>
        <div className="px-8 sm:px-40 flex flex-col items-center py-24 gap-16">
          <div className="max-w-52 flex flex-col gap-5">
            <p className="h7 text-Primary">Practice Advice</p>
            <h2 className="h2 font-bold flex justify-center text-textColor">
              Featured Products
            </h2>
            <p className="text-SecondaryTextColor h7">
              Problems trying to resolve the conflict between the two major
            </p>
          </div>

          <div className=" flex flex-col gap-16 px-8 sm:px-40 sm:flex-row">
            <div className="relative cursor-pointer flex flex-col gap-4 ">
              <div>
                <img
                  src="/images/blog_img2.jpg"
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
                  We focus on ergonomics and meeting you where you work. It's
                  only a keystroke away.
                </p>

                <div className=" flex flex-col gap-4 p-12">
                  <div className="flex justify-between pr-56 gap-4">
                    <Link className="text-disabledElement ">Google</Link>
                    <Link className="text-SecondaryTextColor">Trending</Link>
                    <Link className="text-SecondaryTextColor">New</Link>
                  </div>
                  <h5 className="h5 text-textColor">
                    Loudest à la Madison #1 (L'integral)
                  </h5>
                  <p className="h7 text-SecondaryTextColor ">
                    We focus on ergonomics and meeting you where you work. It's
                    only a keystroke away.
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

          <div className=" flex flex-col gap-16 px-8 sm:px-40 ">
            <div className="relative cursor-pointer flex flex-col gap-4">
              <div>
                <img
                  src="/images/blog_img2.jpg"
                  alt="best1"
                  className="w-screen h-BlogCard  "
                />
                <button className="absolute transform translate-x-8 -translate-y-64 bg-danger text-lightTextColor h7 font-bold px-4 py-2">
                  NEW
                </button>
              </div>

              <div className=" flex flex-col gap-4 p-12">
                <div className="flex justify-between pr-56 gap-4">
                  <Link className="text-disabledElement ">Google</Link>
                  <Link className="text-SecondaryTextColor">Trending</Link>
                  <Link className="text-SecondaryTextColor">New</Link>
                </div>
                <h5 className="h5 text-textColor">
                  Loudest à la Madison #1 (L'integral)
                </h5>
                <p className="h7 text-SecondaryTextColor ">
                  We focus on ergonomics and meeting you where you work. It's
                  only a keystroke away.
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

          <div className=" flex flex-col gap-16 px-8 sm:px-40">
            <div className="relative cursor-pointer flex flex-col gap-4">
              <div>
                <img
                  src="/images/blog_img3.jpg"
                  alt="best1"
                  className="w-screen h-BlogCard  "
                />
                <button className="absolute transform translate-x-8 -translate-y-64 bg-danger text-lightTextColor h7 font-bold px-4 py-2">
                  NEW
                </button>
              </div>

              <div className=" flex flex-col gap-4 p-12">
                <div className="flex justify-between pr-56 gap-4">
                  <Link className="text-disabledElement ">Google</Link>
                  <Link className="text-SecondaryTextColor">Trending</Link>
                  <Link className="text-SecondaryTextColor">New</Link>
                </div>
                <h5 className="h5 text-textColor">
                  Loudest à la Madison #1 (L'integral)
                </h5>
                <p className="h7 text-SecondaryTextColor ">
                  We focus on ergonomics and meeting you where you work. It's
                  only a keystroke away.
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
        </div>
      </PageContent>
    </>
  );
}

export default HomePage;
