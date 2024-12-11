import React from "react";
import {
  User,
  Search,
  ShoppingCart,
  AlignRight,
  Facebook,
  Instagram,
  Twitch,
  Twitter,
} from "lucide-react";

function Footer() {
  return (
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
          <p className="text-SecondaryTextColor h7 font-bold">We are hiring</p>
          <p className="text-SecondaryTextColor h7 font-bold">Blog</p>
        </div>

        <div className="flex flex-col gap-3">
          <h6 className="text-textColor h6 font-bold">Legal</h6>
          <p className="text-SecondaryTextColor h7 font-bold">About Us</p>
          <p className="text-SecondaryTextColor h7 font-bold">Carrier</p>
          <p className="text-SecondaryTextColor h7 font-bold">We are hiring</p>
          <p className="text-SecondaryTextColor h7 font-bold">Blog</p>
        </div>

        <div className="flex flex-col gap-3">
          <h6 className="text-textColor h6 font-bold">Features </h6>
          <p className="text-SecondaryTextColor h7 font-bold">
            Business Marketing
          </p>
          <p className="text-SecondaryTextColor h7 font-bold">User Analytic</p>
          <p className="text-SecondaryTextColor h7 font-bold">Live Chat</p>
          <p className="text-SecondaryTextColor h7 font-bold">
            Unlimited Support
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h6 className="text-textColor h6 font-bold">Resources</h6>
          <p className="text-SecondaryTextColor h7 font-bold">IOS & Android</p>
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
  );
}

export default Footer;
