import React, { useState, useEffect } from "react";
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
import { api } from "../utils/Fetch";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.account);
  const [dropdown, setDropdown] = useState(false);
  const [menu, setMenu] = useState(false);
  const [alertLog, setAlertLog] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.account.token);

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
  useEffect(() => {
    if (!token) return;
    api(`/user/profile`, "GET", null, token)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
        setImage(result.data.profile_picture);
      })
      .catch((err) => console.error("error fetch profile:", err));
  }, [token]);

  return (
    <>
      {currentUser ? (
        <nav
          className={`flex justify-between fixed top-0 w-full h-[76px] px-4 sm:px-8 md:px-16 lg:px-[130px] z-40 border-b 
          ${
            currentUser.fullName === "admin"
              ? "bg-white text-black"
              : "bg-[#0A2540]/80 backdrop-blur-md text-white"
          }`}
        >
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-[60px]">
            <button onClick={() => navigate("/Home")}>
              <img className="h-8 w-auto" src="https://dcoffeecup.id/layout/wider/img/logomobile.jpg" alt="logo" />
            </button>

            {["/Home", "/product", "/HistoryOrder"].map((link, i) => {
              const names = ["Home", "Product", "History"];
              return (
                <NavLink
                  key={i}
                  to={link}
                  className={({ isActive }) =>
                    `hidden md:block relative pb-2 cursor-pointer ${
                      isActive
                        ? "after:content-[''] after:w-full after:h-[3px] after:bg-[#3B82F6] after:absolute after:bottom-0 after:left-0 text-[#3B82F6]"
                        : ""
                    }`
                  }
                >
                  {names[i]}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-4 relative">
            <Search className="hidden lg:block text-white/90" strokeWidth={1} />

            <Link to="/CheckoutProduct">
              <ShoppingCart strokeWidth={1} className="text-white w-6 h-6" />
            </Link>

            <Link to="/Profile">
              <div className="hidden lg:block w-10 h-10 rounded-full overflow-hidden">
                {image && (
                  <img
                    src={image}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Link>

            {/* dropdown */}
            <button
              className="hidden lg:block"
              onClick={(e) => {
                e.stopPropagation();
                setDropdown(!dropdown);
              }}
            >
              <ChevronDown strokeWidth={2} />
            </button>

            <button className="block lg:hidden" onClick={() => setMenu(!menu)}>
              <Menu strokeWidth={2} className="text-white w-6 h-6" />
            </button>

            {dropdown && (
              <div className="fixed inset-0 z-[998]" onClick={() => setDropdown(false)}>
                <div
                  className="absolute right-[50px] top-[75px] bg-white px-8 py-5 rounded-xl shadow-xl z-[999]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="flex gap-2 mb-4"
                    onClick={() => {
                      navigate("/Profile");
                      setDropdown(false);
                    }}
                  >
                    <User strokeWidth={1} />
                    <span className="text-black font-medium">Profile</span>
                  </button>
                  <button className="flex gap-2" onClick={handleLogout}>
                    <LogOut strokeWidth={1} />
                    <span className="text-black font-medium">Log out</span>
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
                  className="absolute left-0 top-0 w-[80%] sm:w-[350px] h-full bg-white shadow-xl p-6 flex flex-col justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <div className="flex justify-between items-center mb-7">
                      <img src="/Frame 12.png" className="h-8" />
                      <button onClick={() => setMenu(false)}>
                        <X color="#1D4ED8" size={26} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-8 border-b border-blue-300 pb-4 text-black">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        {image && (
                          <img src={image} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <p className="text-xl font-semibold">{data?.username}</p>
                    </div>

                    {["/Home", "/Product", "/HistoryOrder"].map((link, i) => {
                      const names = ["Home", "Product", "History"];
                      return (
                        <NavLink
                          key={i}
                          to={link}
                          onClick={() => setMenu(false)}
                          className={({ isActive }) =>
                            `pb-3 mb-3 border-b block ${
                              isActive
                                ? "border-blue-600 text-blue-600"
                                : "border-gray-200 text-black"
                            }`
                          }
                        >
                          {names[i]}
                        </NavLink>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      className="w-full border border-black py-3 rounded-md"
                      onClick={() => {
                        setMenu(false);
                        navigate("/Profile");
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="w-full bg-blue-600 text-white py-3 rounded-md"
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
        <nav className="flex justify-between fixed top-0 w-full h-[76px] px-4 sm:px-8 md:px-16 lg:px-[130px] z-40 bg-[#0A2540]/80 backdrop-blur-md">
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-[60px] text-white">
            <img src="/Frame 13.svg" alt="logo" className="h-8 w-auto" />
            {["/Home", "/product"].map((link, i) => {
              const names = ["Home", "Product"];
              return (
                <NavLink
                  key={i}
                  to={link}
                  className={({ isActive }) =>
                    `hidden md:block relative pb-2 cursor-pointer ${
                      isActive
                        ? "after:content-[''] after:w-full after:h-[3px] after:bg-[#3B82F6] after:absolute after:bottom-0 after:left-0 text-[#3B82F6]"
                        : ""
                    }`
                  }
                >
                  {names[i]}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-white">
            <Search className="hidden md:block" strokeWidth={1} />
            <button onClick={() => setAlertLog(!alertLog)}>
              <ShoppingCart strokeWidth={1} className="w-6 h-6" />
            </button>

            {alertLog && (
              <div className="fixed top-[80px] left-1/2 -translate-x-1/2 z-[1000] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md text-center">
                <strong className="font-semibold">Upss!</strong>{" "}
                <span>You must be logged in to continue.</span>
              </div>
            )}

            <Link to="/login" className="hidden md:block">
              <button className="px-4 py-2 border border-white rounded text-sm hover:bg-white/10 transition">
                Sign In
              </button>
            </Link>
            <Link to="/register" className="hidden md:block">
              <button className="px-4 py-2 bg-blue-600 text-sm rounded hover:bg-blue-600/90 transition">
                Sign Up
              </button>
            </Link>

            <button className="md:hidden" onClick={() => setMenu(!menu)}>
              <Menu strokeWidth={1} className="w-6 h-6 text-white" />
            </button>

            {menu && (
              <div
                className="fixed inset-0 bg-black/40 z-[999]"
                onClick={() => setMenu(false)}
              >
                <div
                  className="absolute left-0 top-0 w-[80%] sm:w-[350px] h-full bg-white shadow-xl p-6 flex flex-col justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <div className="flex justify-between items-center mb-7">
                      <img src="/Frame 12.png" className="h-8" />
                      <button onClick={() => setMenu(false)}>
                        <X color="#1D4ED8" size={26} />
                      </button>
                    </div>

                    {["/Home", "/Product"].map((link, i) => {
                      const names = ["Home", "Product"];
                      return (
                        <NavLink
                          key={i}
                          to={link}
                          onClick={() => setMenu(false)}
                          className={({ isActive }) =>
                            `pb-3 mb-3 border-b block ${
                              isActive
                                ? "border-blue-600 text-blue-600"
                                : "border-gray-200 text-black"
                            }`
                          }
                        >
                          {names[i]}
                        </NavLink>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={() => setMenu(false)}>
                      <button className="w-full border border-black py-3 rounded-md">
                        Sign In
                      </button>
                    </Link>
                    <Link to="/register" onClick={() => setMenu(false)}>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-md">
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
