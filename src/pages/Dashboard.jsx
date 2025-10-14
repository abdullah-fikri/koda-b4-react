import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Search,
  ShoppingCart,
  PackageSearch,
  Truck,
  CheckCircle,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SideBar } from "../components/SideBar";

const Dashboard = () => {
  const salesData = [
    { date: "16 Jan", value: 100 },
    { date: "17 Jan", value: 110 },
    { date: "18 Jan", value: 130 },
    { date: "19 Jan", value: 150 },
    { date: "20 Jan", value: 160 },
    { date: "21 Jan", value: 170 },
    { date: "22 Jan", value: 200 },
    { date: "23 Jan", value: 230 },
  ];

  const products = [
    {
      no: 1,
      name: "Caramel Machiato",
      sold: "300 Cup",
      revenue: "IDR 9.000.000",
    },
    {
      no: 2,
      name: "Hazelnut Latte",
      sold: "200 Cup",
      revenue: "IDR 8.000.000",
    },
    { no: 3, name: "Kopi Susu", sold: "100 Cup", revenue: "IDR 7.000.000" },
    {
      no: 4,
      name: "Espresso Supreme",
      sold: "90 Cup",
      revenue: "IDR 6.000.000",
    },
    {
      no: 5,
      name: "Caramel Velvet Latte",
      sold: "80 Cup",
      revenue: "IDR 5.000.000",
    },
    {
      no: 6,
      name: "Hazelnut Dream Brew",
      sold: "70 Cup",
      revenue: "IDR 4.000.000",
    },
    {
      no: 7,
      name: "Vanilla Silk Mocha",
      sold: "60 Cup",
      revenue: "IDR 3.000.000",
    },
    {
      no: 8,
      name: "Dark Roast Delight",
      sold: "50 Cup",
      revenue: "IDR 2.000.000",
    },
    {
      no: 9,
      name: "Ethiopian Yirgacheffe Euphoria",
      sold: "40 Cup",
      revenue: "IDR 1.000.000",
    },
    {
      no: 10,
      name: "Indonesian Sumatra Reserve",
      sold: "30 Cup",
      revenue: "IDR 500.000",
    },
  ];

  return (
    <div className="flex min-h-screen  mt-[77px]">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {/* Order On Progress */}
          <div className="bg-[#6FC276] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white rounded-full w-11 h-11 flex items-center justify-center">
                <PackageSearch size={20} color="#FF8906" />
              </div>
              <span className="text-white text-sm font-medium">
                Order On Progress
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-3xl font-semibold">200</span>
              <span className="text-white text-xs">+11.01%</span>
            </div>
          </div>

          {/* Order Shipping */}
          <div className="bg-[#6C69D4] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white rounded-full w-11 h-11 flex items-center justify-center">
                <Truck size={20} color="#FF8906" />
              </div>
              <span className="text-white text-sm font-medium">
                Order Shipping
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-3xl font-semibold">100</span>
              <span className="text-white text-xs">+4.01%</span>
            </div>
          </div>

          {/* Order Done */}
          <div className="bg-[#C76FC2] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white rounded-full w-11 h-11 flex items-center justify-center">
                <CheckCircle size={20} color="#FF8906" />
              </div>
              <span className="text-white text-sm font-medium">Order Done</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-3xl font-semibold">50</span>
              <span className="text-white text-xs">+2.01%</span>
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-[#4F5665] font-semibold text-base mb-1">
                Total Penjualan
              </h2>
              <p className="text-[#9CA3AF] text-xs">
                1000 cup (16 - 23 January 2023)
              </p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#4F5665]">
              <Calendar size={16} />
              <span>16 - 23 January 2023</span>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6FC276" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6FC276" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={(value) => `${value}c`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6FC276"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#4F5665] font-semibold text-base">
              Produk Terlaris
            </h2>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#4F5665]">
              <Calendar size={16} />
              <span>16 - 23 January 2023</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-medium text-xs">
                    No
                  </th>
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-medium text-xs">
                    Nama Produk
                  </th>
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-medium text-xs">
                    Terjual
                  </th>
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-medium text-xs">
                    Keuntungan
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.no}
                    className={index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}
                  >
                    <td className="py-4 px-4 text-[#4F5665] text-sm">
                      {product.no}
                    </td>
                    <td className="py-4 px-4 text-[#4F5665] text-sm">
                      {product.name}
                    </td>
                    <td className="py-4 px-4 text-[#4F5665] text-sm">
                      {product.sold}
                    </td>
                    <td className="py-4 px-4 text-[#6FC276] text-sm font-medium">
                      {product.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
