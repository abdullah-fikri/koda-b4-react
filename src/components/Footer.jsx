import { Coffee, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#F8F8F8] px-10 md:px-20 py-10 mt-[70px]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src=".././public/img/Frame 12.png" alt="coffe-shop" />
          </div>
          <p className="text-[#4F5665] text-base font-normal max-w-[250px]">
            Coffee Shop is a store that sells some good meals, and especially
            coffee. We provide high quality beans
          </p>
          <span className="text-[#AFB5C0] text-sm">©2020CoffeeStore</span>
        </div>

        {/* Product */}
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-lg text-[#0B132A]">Product</h3>
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
          <h3 className="font-medium text-lg text-[#0B132A]">Engage</h3>
          <a href="#" className="text-gray-600 hover:text-black text-sm">
            Partner
          </a>
          <a href="#" className="text-gray-600 hover:text-black text-sm">
            FAQ
          </a>
          <a href="#" className="text-gray-600 hover:text-black text-sm">
            About Us
          </a>
          <a href="#" className="text-gray-600 hover:text-black text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-black text-sm">
            Terms of Service
          </a>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-medium text-lg text-[#0B132A] mb-4">
            Social Media
          </h3>
          <div className="flex gap-4">
            <div className="bg-[#FF8906] w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer">
              <Facebook className="w-5 h-5 text-black fill-black" />
            </div>
            <div className="bg-[#FF8906] w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer">
              <Twitter className="w-5 h-5 text-black fill-black" />
            </div>
            <div className="bg-[#FF8906] w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer">
              <Instagram className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
