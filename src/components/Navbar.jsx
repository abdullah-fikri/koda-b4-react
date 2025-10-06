import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between fixed top-0 bg-[#0B0909]/80 w-full h-[76px] px-[130px] z-40">
        <div className="flex items-center gap-[68px] text-white">
          <img src=".././public/img/Frame 13.svg" alt="coffeShop" />
          <NavLink
            to="/Home"
            className={({ isActive }) =>
              `cursor-pointer relative px-1 pb-2 ${
                isActive
                  ? "after:content-[''] after:block after:h-[3px] after:bg-[#FF8906] after:absolute after:bottom-0 after:left-0 after:right-0"
                  : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/product"
            className={({ isActive }) =>
              `cursor-pointer relative px-1 pb-2 ${
                isActive
                  ? "after:content-[''] after:block after:h-[3px] after:bg-[#FF8906] after:absolute after:bottom-0 after:left-0 after:right-0"
                  : ""
              }`
            }
          >
            Product
          </NavLink>
        </div>
        <div className="flex items-center gap-[22px]">
          <img src=".././public/img/Search.svg" alt="Search" />
          <Link to="/CheckoutProduct">
            <img src=".././public/img/ShoppingCart.svg" alt="cart" />
          </Link>
          <Link to="/login">
            <button className="px-[18px] py-[12px] border border-[#FFFFFF] text-white text-sm font-normal cursor-pointer hover">
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button className="px-[18px] py-[12px] bg-[#FF8906] text-sm font-normal text-[#0B132A] cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};
