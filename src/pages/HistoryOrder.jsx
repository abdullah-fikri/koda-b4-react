import React, { useState, useEffect } from "react";
import { Calendar, MessageCircle, ArrowLeft } from "lucide-react";
import { RoundButton } from "../components/RoundButton";
import { useNavigate } from "react-router-dom";

export const HistoryOrder = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("On Progress");
  const [selectedMonth, setSelectedMonth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);

    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    });
    setSelectedMonth(formatter.format(now));
  }, []);

  const tabs = ["On Progress", "Sending Goods", "Finish Order"];
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const handleViewDetail = (orderNumber) => {
    navigate(`/DetailOrder/${orderNumber}`); // sudah tanpa #
  };

  return (
    <div className="min-h-screen bg-white pt-[76px]">
      <div className="px-[130px] py-[50px]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-[40px]">
          <h1 className="text-[32px] font-medium text-[#0B132A]">
            History Order
          </h1>
          <span className="bg-[#E8E8E8] text-[#0B132A] rounded-full w-8 h-8 flex items-center justify-center font-medium text-sm">
            {filteredOrders.length}
          </span>
        </div>

        <div className="flex gap-[60px]">
          {/* Left Section */}
          <div className="flex-1">
            {/* Tabs + Month Filter */}
            <div className=" rounded-t-md px-6">
              <div className="flex items-center justify-between">
                <div className="flex bg-[#E8E8E899] rounded-md p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab
                          ? "bg-white text-[#0B132A] shadow-sm"
                          : "text-[#4F5665]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Month Filter */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#4F5665]" />
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border border-[#E8E8E8] rounded-md px-4 py-2 text-[#0B132A] bg-white cursor-pointer outline-none text-sm"
                  >
                    {Array.from({ length: 12 }).map((_, i) => {
                      const date = new Date();
                      date.setMonth(date.getMonth() - i);
                      const option = date.toLocaleString("id-ID", {
                        month: "long",
                        year: "numeric",
                      });
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Order List */}
            <div className="space-y-5 mt-[24px]">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl border border-[#E8E8E8] p-8 text-center">
                  <p className="text-[#4F5665] text-base">No orders found</p>
                </div>
              ) : (
                filteredOrders.map((order, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-[#E8E8E8] p-5 flex gap-6 items-center"
                  >
                    {/* Thumbnail */}
                    <div className="w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={order.img || "/img/image 22.png"}
                        alt={order.product}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-[#4F5665] mb-1">No. Order</p>
                        <p className="font-medium text-[#0B132A] text-sm">
                          #{order.orderNumber} {/* tampil pakai # */}
                        </p>
                        <button
                          onClick={() => handleViewDetail(order.orderNumber)}
                          className="text-[#FF8906] text-xs mt-1 hover:underline"
                        >
                          View Order Detail
                        </button>
                      </div>

                      <div>
                        <p className="text-sm text-[#4F5665] mb-1">Date</p>
                        <p className="font-medium text-[#0B132A] text-sm">
                          {order.date}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-[#4F5665] mb-1">Total</p>
                        <p className="font-medium text-[#0B132A] text-sm">
                          Idr {order.total.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-[#4F5665] mb-1">Status</p>
                        <span className="inline-block bg-[#FFF4E6] text-[#FF8906] px-3 py-1 rounded-full text-xs font-medium">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredOrders.length > 0 && (
              <div className="flex justify-center gap-2 mt-[40px]">
                {[1, 2, 3, 4].map((i) =>
                  i === 1 ? (
                    <RoundButton key={i} bgColor="#FF8906">
                      {i}
                    </RoundButton>
                  ) : (
                    <RoundButton key={i}>{i}</RoundButton>
                  )
                )}
                <RoundButton bgColor="#FF8906">
                  <ArrowLeft className="text-white rotate-180" />
                </RoundButton>
              </div>
            )}
          </div>

          {/* Right Section - Message Box */}
          <div className="w-[380px] flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0F0F0] sticky top-[100px]">
              <div className="flex justify-start mb-4">
                <div className="w-16 h-16 bg-[#FF8906] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-medium text-[#0B132A] mb-3">
                Send Us Message
              </h3>

              <p className="text-[#4F5665] text-sm mb-6 leading-relaxed">
                If your unable to find answer or find your product quickly,
                please describe your problem and tell us, we will give you
                solution.
              </p>

              <button className="w-full bg-[#FF8906] text-white font-medium py-3 rounded-lg hover:bg-orange-600 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
