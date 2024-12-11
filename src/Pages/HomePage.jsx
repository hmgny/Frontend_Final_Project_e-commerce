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
} from "lucide-react";

function HomePage() {
  return (
    <>
      <header className="flex flex-col container py-4">
        <div className=" flex justify-between">
          <a className="h4 font-bold text-textColor">Bandage</a>
          <div className="flex gap-5 items-center">
            <a className="w-6 h-6">
              <User color="black" />
            </a>
            <a className="w-6 h-6">
              <Search color="black" />
            </a>
            <a className="w-6 h-6">
              <ShoppingCart color="black" />
            </a>
            <a className="w-6 h-6">
              <AlignRight color="black" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-7 py-20">
          <a className="text-SecondaryTextColor h3">Home</a>
          <a className="text-SecondaryTextColor h3">Product</a>
          <a className="text-SecondaryTextColor h3">Pricing</a>
          <a className="text-SecondaryTextColor h3">Contact</a>
        </div>
      </header>

      <div className="bg-[url('/images/homeHero.jpg')] bg-no-repeat bg-cover bg-top text-lightTextColor flex justify-center items-center  ">
        <div className="flex flex-col items-center gap-12 py-44 max-w-64 ">
          <h6 className="h6 text-base font-bold">SUMMER 2020</h6>
          <h2 className="h2 text-4xl font-bold">NEW COLLECTION</h2>
          <h4 className="text-xl text-lightGray">
            We know how large objects will act, but things on a small scale.
          </h4>
          <button className="bg-succes text-lightTextColor text-3xl font-bold w-56 h-16 rounded-md">
            SHOP NOW
          </button>
        </div>
      </div>

      <div className="container flex flex-col items-center py-24 gap-16">
        <div className="max-w-52 flex flex-col gap-5">
          <h4 className="h4 font-bold flex justify-center text-textColor">
            EDITOR'S PICK
          </h4>
          <p className="text-SecondaryTextColor h7">
            Problems trying to resolve the confict between
          </p>
        </div>
        <div className=" flex flex-col gap-8">
          <div className="relative cursor-pointer ">
            <img
              className="w-Card h-Category object-cover"
              src="/images/men.jpg"
              alt="Men"
            />
            <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2">
              MEN
            </button>
          </div>

          <div className="relative cursor-pointer ">
            <img
              className="w-Card h-Category object-cover"
              src="/images/women.jpg"
              alt="Men"
            />
            <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2">
              WOMEN
            </button>
          </div>

          <div className="relative cursor-pointer ">
            <img
              className="w-Card h-CategorySmall object-cover"
              src="/images/accersories.jpg"
              alt="Men"
            />
            <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2">
              ACCESSORIES
            </button>
          </div>

          <div className="relative cursor-pointer ">
            <img
              className="w-Card cover h-CategorySmall object-cover"
              src="/images/kids.jpg"
              alt="Men"
            />
            <button className="absolute bottom transform translate-x-8 -translate-y-16 bg-white h6 font-bold px-12 py-2">
              KIDS
            </button>
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center py-24 gap-16">
        <div className="max-w-52 flex flex-col gap-5">
          <h5>Featured Products</h5>
          <h4 className="h4 font-bold flex justify-center text-textColor">
            BESTSELLER PRODUCTS
          </h4>
          <p className="text-SecondaryTextColor h7">
            Problems trying to resolve the conflict between
          </p>
        </div>
        <div className=" flex flex-col gap-16">
          <div className="relative cursor-pointer flex flex-col gap-4">
            <img
              src="/images/best1.jpg"
              alt="best1"
              className="h-cardBestceller"
            />
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
              <a className="bg-Primary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-Secondary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-alert rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-darkBackground rounded-full">
                <Circle size={16} />
              </a>
            </div>
          </div>

          <div className="relative cursor-pointer flex flex-col gap-4">
            <img
              src="/images/best2.jpg"
              alt="best1"
              className="h-cardBestceller"
            />
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
              <a className="bg-Primary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-Secondary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-alert rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-darkBackground rounded-full">
                <Circle size={16} />
              </a>
            </div>
          </div>

          <div className="relative cursor-pointer flex flex-col gap-4">
            <img
              src="/images/best3.jpg"
              alt="best1"
              className="h-cardBestceller"
            />
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
              <a className="bg-Primary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-Secondary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-alert rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-darkBackground rounded-full">
                <Circle size={16} />
              </a>
            </div>
          </div>

          <div className="relative cursor-pointer flex flex-col gap-4">
            <img
              src="/images/best4.jpg"
              alt="best1"
              className="h-cardBestceller"
            />
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
              <a className="bg-Primary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-Secondary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-alert rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-darkBackground rounded-full">
                <Circle size={16} />
              </a>
            </div>
          </div>

          <div className="relative cursor-pointer flex flex-col gap-4">
            <img
              src="/images/best5.jpg"
              alt="best1"
              className="h-cardBestceller"
            />
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
              <a className="bg-Primary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-Secondary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-alert rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-darkBackground rounded-full">
                <Circle size={16} />
              </a>
            </div>
          </div>

          <div className="relative cursor-pointer flex flex-col gap-4">
            <img
              src="/images/best6.jpg"
              alt="best1"
              className="h-cardBestceller"
            />
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
              <a className="bg-Primary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-Secondary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-alert rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-darkBackground rounded-full">
                <Circle size={16} />
              </a>
            </div>
          </div>

          <div className="relative cursor-pointer flex flex-col gap-4">
            <img
              src="/images/best7.jpg"
              alt="best1"
              className="h-ProductCard"
            />
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
              <a className="bg-Primary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-Secondary rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-alert rounded-full">
                <Circle size={16} />
              </a>
              <a className="bg-darkBackground rounded-full">
                <Circle size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-Secondary text-lightTextColor flex flex-col gap-8 justify-center items-center h-[1250px] ">
        <div className=" flex flex-col gap-8 pt-56 max-w-64 ">
          <h5 className="h5 text-base">SUMMER 2020</h5>
          <h2 className="h2 text-4xl font-bold">NEW COLLECTION</h2>
          <h4 className="text-xl text-lightGray">
            We know how large objects will act, but things on a small scale.
          </h4>
          <h4 className="h4 text-base font-bold">$16.48</h4>
          <button className="bg-succes text-lightTextColor text-3xl h7 font-bold w-56 h-16 rounded-md">
            ADD TO CART
          </button>
        </div>
        <img
          src="/images/men_png_yesil.png"
          alt=""
          className="object-top object-cover w-full overflow-hidden"
        />
      </div>

      <div className="text-textColor flex flex-col gap-8 justify-center items-center h-[999px] ">
        <div className=" flex flex-col pt-28 gap-8 max-w-64 ">
          <h6 className="h6 text-muted">SUMMER 2020</h6>
          <h2 className="h2 text-4xl font-bold">Part Of the Neural Universe</h2>
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

      <div className="container flex flex-col items-center py-24 gap-16">
        <div className="max-w-52 flex flex-col gap-5">
          <p className="h7 text-Primary">Practice Advice</p>
          <h2 className="h2 font-bold flex justify-center text-textColor">
            Featured Products
          </h2>
          <p className="text-SecondaryTextColor h7">
            Problems trying to resolve the conflict between the two major
          </p>
        </div>
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
                We focus on ergonomics and meeting you where you work. It's only
                a keystroke away.
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

      <div className=" flex flex-col gap-16 container">
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

      <div className=" flex flex-col gap-16 container">
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
      <footer className="container ">
        <div className="py-12 bg-lightGray">
          <h3 className="h3 text-textColor font-bold">Bandage</h3>
          <div className="flex justify-start gap-4">
            <a>
              <Facebook color="#23A6F0"></Facebook>
            </a>
            <a>
              <Instagram color="#23A6F0"></Instagram>
            </a>
            <a>
              <Twitter color="#23A6F0"></Twitter>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-16">
          <div className="flex flex-col gap-3">
            <h6 className="text-textColor h6 font-bold">Company Info</h6>
            <p className="text-SecondaryTextColor h7 font-bold">About Us</p>
            <p className="text-SecondaryTextColor h7 font-bold">Carrier</p>
            <p className="text-SecondaryTextColor h7 font-bold">
              We are hiring
            </p>
            <p className="text-SecondaryTextColor h7 font-bold">Blog</p>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-textColor h6 font-bold">Legal</h6>
            <p className="text-SecondaryTextColor h7 font-bold">About Us</p>
            <p className="text-SecondaryTextColor h7 font-bold">Carrier</p>
            <p className="text-SecondaryTextColor h7 font-bold">
              We are hiring
            </p>
            <p className="text-SecondaryTextColor h7 font-bold">Blog</p>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-textColor h6 font-bold">Features </h6>
            <p className="text-SecondaryTextColor h7 font-bold">
              Business Marketing
            </p>
            <p className="text-SecondaryTextColor h7 font-bold">
              User Analytic
            </p>
            <p className="text-SecondaryTextColor h7 font-bold">Live Chat</p>
            <p className="text-SecondaryTextColor h7 font-bold">
              Unlimited Support
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-textColor h6 font-bold">Resources</h6>
            <p className="text-SecondaryTextColor h7 font-bold">
              IOS & Android
            </p>
            <p className="text-SecondaryTextColor h7 font-bold">Watch a Demo</p>
            <p className="text-SecondaryTextColor h7 font-bold">Customers</p>
            <p className="text-SecondaryTextColor h7 font-bold">API</p>
          </div>

          <div>
            <h6 className="text-textColor h6 font-bold pb-5">Get It Touch</h6>
            <div className="flex min-h-14">
              <input
                className="min-w-[150px] px-4 bg-lightGray"
                id="Your_email"
                name="Your_ema"
                placeholder="Your Email"
                type="email"
              ></input>
              <button className="bg-Primary text-lightTextColor min-w-[115px] h7">
                Subscribe
              </button>
            </div>
            <p className="h8 text-SecondaryTextColor leading-7">
              Lore imp sum dolor Amit
            </p>
          </div>
          <div className="bg-lightGray text-SecondaryTextColor p-10">
            <p className="flex max-w-48 justify-center">
              Made With Love By Finland All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
