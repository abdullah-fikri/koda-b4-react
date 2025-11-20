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
import { persistor } from "../redux/store";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.account);
  const [dropdown, setDropdown] = useState(false);
  const [menu, setMenu] = useState(false);
  const [alertLog, setAlertLog] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
    navigate("/Register");
    setDropdown(false);
  };

  if (alertLog === true) {
    setTimeout(() => {
      setAlertLog(false);
    }, 2000);
  }

  return (
    <>
      {currentUser ? (
        <nav
          className={`flex justify-between fixed top-0 bg-[#0B0909]/80 w-full h-[76px] px-4 sm:px-8 md:px-16 lg:px-[130px] z-40 border-b border-[#E8E8E8] 
        ${
          currentUser.fullName === "admin"
            ? "bg-white"
            : "bg-[#0B0909] text-white"
        }`}
        >
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-[68px] text-white">
            <button onClick={() => navigate("/Home")}>
              <img
                className=" w-auto h-8"
                src="/Frame 13.svg"
                alt="coffeShop"
              />
            </button>
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
            <NavLink
              to="/HistoryOrder"
              className={({ isActive }) =>
                `cursor-pointer relative px-1 pb-2 hidden md:block ${
                  isActive
                    ? "after:content-[''] after:block after:h-[3px] after:bg-[#FF8906] after:absolute after:bottom-0 after:left-0 after:right-0"
                    : ""
                }`
              }
            >
              History
            </NavLink>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-[22px] relative">
            <Search className="hidden lg:block" strokeWidth={1} />
            <Link to="/CheckoutProduct">
              <ShoppingCart
                strokeWidth={1}
                className="text-white  w-5 h-5 sm:w-6 sm:h-6"
              />
            </Link>
            <Link to="/Profile">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 hidden lg:block">
                {/* logo user/profile */}
              </div>
            </Link>

            <button
              className="cursor-pointer hidden lg:block"
              onClick={(e) => {
                e.stopPropagation();
                setDropdown(!dropdown);
              }}
            >
              <ChevronDown strokeWidth={2} />
            </button>
            <button className="block lg:hidden" onClick={() => setMenu(!menu)}>
              <Menu strokeWidth={2} color="white" className="w-6 h-6" />
            </button>

            {dropdown && (
              <div
                className="fixed inset-0 z-[998]"
                onClick={() => setDropdown(false)}
              >
                <div
                  className="absolute right-[50px] top-16 lg:top-20 bg-white px-6 lg:px-8 py-5 rounded-2xl z-[999] shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="flex gap-2 mb-3"
                    onClick={() => {
                      navigate("/Profile");
                      setDropdown(false);
                    }}
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
              </div>
            )}

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
                          src="/Frame 12.png"
                          alt="coffe shop"
                          className="w-auto h-8"
                        />
                      </div>
                      <button onClick={() => setMenu(false)}>
                        <X color="#C47F3E" size={24} />
                      </button>
                    </div>

                    {/* user */}
                    <div className="flex items-center gap-3 mb-9 border-b border-[#C47F3E] py-3 text-black/60">
                      <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                      <p className="text-xl font-bold">
                        {currentUser.fullName}
                      </p>
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

                      <NavLink
                        to="/HistoryOrder"
                        onClick={() => setMenu(false)}
                        className={({ isActive }) =>
                          `pb-2 border-b ${
                            isActive
                              ? "border-[#C47F3E] text-[#C47F3E]"
                              : "border-gray-200 text-black"
                          }`
                        }
                      >
                        History
                      </NavLink>
                    </div>
                  </div>

                  {/* Footer buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      className="w-full border border-black py-3 rounded-md text-black"
                      onClick={() => {
                        setMenu(false);
                        navigate("/Profile");
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="w-full border border-[#C47F3E] py-3 rounded-md text-[#C47F3E]"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav className="flex justify-between fixed top-0 bg-[#0B0909]/80 w-full h-[76px] px-4 sm:px-8 md:px-16 lg:px-[130px] z-40">
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-[68px] text-white">
            <img src="/Frame 13.svg" alt="coffeShop" className="w-auto h-8" />
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
            <button onClick={() => setAlertLog(!alertLog)}>
              <ShoppingCart
                className="text-white w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={1}
              />
            </button>
            {alertLog && (
              <div
                className="fixed top-[80px] left-1/2 -translate-x-1/2 z-[1000] 
               bg-red-100 border border-red-400 text-red-700 
               px-4 py-3 rounded-lg shadow-md w-[90%] sm:w-auto 
               text-center transition-all duration-300"
                role="alert"
              >
                <strong className="font-semibold">Upss!</strong>{" "}
                <span>You must be logged in to continue.</span>
              </div>
            )}

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
              <Menu strokeWidth={1} color="white" className="w-6 h-6" />
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
                          src="/Frame 12.png"
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
          </div>
        </nav>
      )}
    </>
  );
};
