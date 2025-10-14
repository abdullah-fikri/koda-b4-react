import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/reducers/account";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.account);
  const [dropdown, setDropdown] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/Register");
  };

  return (
    <>
      {currentUser ? (
        <nav className="flex justify-between fixed top-0 bg-[#0B0909] lg:bg-white w-full h-[76px] px-4 sm:px-8 md:px-16 lg:px-[130px] z-40 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-[68px] text-white">
            <button onClick={() => navigate("/Home")}>
              <img
                className="hidden lg:block w-auto h-8"
                src="/img/Frame 12.png"
                alt="coffeShop"
              />
              <img
                className="block lg:hidden w-auto h-8"
                src="/img/Frame 13.svg"
                alt="coffeShop"
              />
            </button>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-[22px] relative">
            <Search className="hidden lg:block" strokeWidth={1} />
            <Link to="/CheckoutProduct">
              <ShoppingCart
                strokeWidth={1}
                className="text-white lg:text-black w-5 h-5 sm:w-6 sm:h-6"
              />
            </Link>
            <Link to="/Profile">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 hidden lg:block">
                {/* logo user/profile */}
              </div>
            </Link>

            <button
              className="cursor-pointer hidden lg:block"
              onClick={() => setDropdown(!dropdown)}
            >
              <ChevronDown strokeWidth={2} />
            </button>
            <button className="block lg:hidden" onClick={() => setMenu(!menu)}>
              <Menu strokeWidth={2} color="white" className="w-6 h-6" />
            </button>

            {menu && (
              <div
                className="fixed inset-0 bg-black/40 z-[999]"
                onClick={() => setMenu(false)}
              >
                <div
                  className="absolute left-0 top-0 w-[80%] sm:w-[350px] h-full bg-white shadow-xl p-6 flex flex-col justify-between "
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <img
                          src="/img/Frame 12.png"
                          alt="coffe shop"
                          className="w-auto h-8"
                        />
                      </div>
                      <button onClick={() => setMenu(false)}>
                        <X color="red" size={24} />
                      </button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                      <p className="text-black font-semibold mb-2">
                        Search Product
                      </p>
                      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                        <Search className="text-gray-500" size={18} />
                        <input
                          type="text"
                          placeholder="Find Product"
                          className="flex-1 ml-2 outline-none border-none text-sm text-gray-600 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Navigation links */}
                    <div className="flex flex-col gap-3">
                      <NavLink
                        to="/Home"
                        onClick={() => setMenu(false)}
                        className={({ isActive }) =>
                          `pb-2 border-b ${
                            isActive
                              ? "border-[#C47F3E] text-[#C47F3E]"
                              : "border-gray-200 text-black"
                          }`
                        }
                      >
                        Home
                      </NavLink>

                      <NavLink
                        to="/Product"
                        onClick={() => setMenu(false)}
                        className={({ isActive }) =>
                          `pb-2 border-b ${
                            isActive
                              ? "border-[#C47F3E] text-[#C47F3E]"
                              : "border-gray-200 text-black"
                          }`
                        }
                      >
                        Product
                      </NavLink>
                    </div>
                  </div>

                  {/* Footer buttons */}
                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={() => setMenu(false)}>
                      <button className="w-full border border-black text-black py-3 rounded-md">
                        SignIn
                      </button>
                    </Link>
                    <Link to="/register" onClick={() => setMenu(false)}>
                      <button className="w-full bg-[#FF8906] text-white py-3 rounded-md">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {dropdown && (
              <div className="absolute right-0 lg:right-[-50px] top-16 lg:top-20 bg-white px-6 lg:px-8 py-5 rounded-2xl z-60 shadow-lg">
                <button
                  className="flex gap-2 mb-3"
                  onClick={() => navigate("/Profile")}
                >
                  <User strokeWidth={1} />
                  <p className="text-black font-medium cursor-pointer">
                    Profile
                  </p>
                </button>
                <button className="flex gap-2" onClick={handleLogout}>
                  <LogOut strokeWidth={1} />
                  <p className="text-black font-medium cursor-pointer">
                    log out
                  </p>
                </button>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav className="flex justify-between fixed top-0 bg-[#0B0909]/80 w-full h-[76px] px-4 sm:px-8 md:px-16 lg:px-[130px] z-40">
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-[68px] text-white">
            <img
              src="/img/Frame 13.svg"
              alt="coffeShop"
              className="w-auto h-8"
            />
            <NavLink
              to="/Home"
              className={({ isActive }) =>
                `cursor-pointer relative px-1 pb-2 hidden md:block ${
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
                `cursor-pointer relative px-1 pb-2 hidden md:block ${
                  isActive
                    ? "after:content-[''] after:block after:h-[3px] after:bg-[#FF8906] after:absolute after:bottom-0 after:left-0 after:right-0"
                    : ""
                }`
              }
            >
              Product
            </NavLink>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-[22px]">
            <Search
              className="hidden md:block text-white w-5 h-5"
              strokeWidth={1}
            />
            <Link to="/CheckoutProduct">
              <ShoppingCart
                className="text-white w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={1}
              />
            </Link>
            <Link to="/login" className="hidden md:block">
              <button className="px-3 sm:px-[18px] py-2 sm:py-[12px] border border-[#FFFFFF] text-white text-xs sm:text-sm font-normal cursor-pointer hover:bg-white/10 transition-colors">
                Sign In
              </button>
            </Link>
            <Link to="/register" className="hidden md:block">
              <button className="px-3 sm:px-[18px] py-2 sm:py-[12px] bg-[#FF8906] text-xs sm:text-sm font-normal text-[#0B132A] cursor-pointer hover:bg-[#FF8906]/90 transition-colors">
                Sign Up
              </button>
            </Link>
            <button className="block md:hidden" onClick={() => setMenu(!menu)}>
              <Menu strokeWidth={2} color="white" className="w-6 h-6" />
            </button>
          </div>
        </nav>
      )}
    </>
  );
};
