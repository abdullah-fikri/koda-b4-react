/**
 *
 * @component
 * @returns {JSX.Element} The website footer section with company info, product links, and social media.
 */

import { Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#F8F8F8] px-6 md:px-20 py-10 mt-[70px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-2">
            <img src="/Frame 12.png" alt="Coffee Shop" />
          </div>
          <p className="text-[#4F5665] text-sm md:text-base max-w-[320px] leading-relaxed">
            Coffee Shop is a store that sells some good meals, and especially
            coffee. We provide high quality beans
          </p>
        </div>

        {/* Grid  */}
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {/* Product */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-[#0B132A] mb-1">
              Product
            </h3>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              Our Product
            </a>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              Pricing
            </a>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              Locations
            </a>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              Countries
            </a>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              Blog
            </a>
          </div>

          {/* Engage */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-[#0B132A] mb-1">
              Engage
            </h3>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              Partner
            </a>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              FAQ
            </a>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              About Us
            </a>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-[#4F5665] hover:text-black text-sm">
              Terms of Service
            </a>
          </div>

          {/* Social Media */}
          <div className="sm:col-span-2 md:col-span-1 flex flex-col">
            <h3 className="font-semibold text-lg text-[#0B132A] mb-4">
              Social Media
            </h3>
            <div className="flex gap-4">
              <div className="bg-[#1D4ED8] w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#1D4ED8] w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#1D4ED8] w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer">
                <Instagram className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-5">
          <span className="text-[#AFB5C0] text-sm block">©2020CoffeeStore</span>
        </div>
      </div>
    </footer>
  );
};
