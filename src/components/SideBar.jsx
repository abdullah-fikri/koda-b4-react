/**
 * SideBar component provides navigation links for the admin dashboard.
 *
 * @component
 * @returns {JSX.Element} The sidebar navigation component for the admin dashboard.
 */

import {
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <>
      <div className="w-[188px] bg-white border-r border-gray-200 min-h-screen z-9999999999999999999999">
        <div className="flex flex-col gap-3 pt-6 px-6">
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              `cursor-pointer ${
                isActive ? "bg-[#FF8906] text-white rounded-lg font-medium" : ""
              }`
            }
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
              <LayoutDashboard size={18} />
              <span className="text-sm ">Dashboard</span>
            </div>
          </NavLink>
          <NavLink
            to="/ProductDashboard"
            className={({ isActive }) =>
              `cursor-pointer ${
                isActive
                  ? "bg-[#FF8906] text-white rounded-lg font-medium"
                  : "text-[#4F5665]"
              }`
            }
          >
            <div className="flex items-center gap-2  px-3 py-2">
              <Package size={18} />
              <span className="text-sm">Product</span>
            </div>
          </NavLink>
          <NavLink
            to="/OrderDashboard"
            className={({ isActive }) =>
              `cursor-pointer ${
                isActive
                  ? "bg-[#FF8906] text-white rounded-lg font-medium"
                  : "text-[#4F5665]"
              }`
            }
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <ShoppingBag size={18} />
              <span className="text-sm">Order</span>
            </div>
          </NavLink>

          <NavLink
            to="/UsersDashboard"
            className={({ isActive }) =>
              `cursor-pointer ${
                isActive
                  ? "bg-[#FF8906] text-white rounded-lg font-medium"
                  : "text-[#4F5665]"
              }`
            }
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <Users size={18} />
              <span className="text-sm">User</span>
            </div>
          </NavLink>
          <div className="flex items-center gap-2 text-[#4F5665] px-3 py-2">
            <LogOut size={18} />
            <span className="text-sm">Keluar</span>
          </div>
        </div>
      </div>
    </>
  );
};
