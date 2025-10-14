import React, { useState, useContext } from "react";
import { Calendar, MessageCircle, ArrowLeft } from "lucide-react";
import { RoundButton } from "../components/RoundButton";
import { useNavigate } from "react-router-dom";
import { History } from "../context/Context";

export const HistoryOrder = () => {
  const [activeTab, setActiveTab] = useState("On Progress");
  const [selectedMonth, setSelectedMonth] = useState("");
  const navigate = useNavigate();
  const { history } = useContext(History);

  const tabs = ["On Progress", "Sending Goods", "Finish Order"];
  const filteredOrders = history.filter((order) => order.status === activeTab);

  const handleViewDetail = (orderNumber) => {
    navigate(`/detailorder/${orderNumber}`);
  };

  return (
    <div className="min-h-screen bg-white pt-[76px]">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[130px] py-8 md:py-[50px]">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-[40px]">
          <h1 className="text-2xl md:text-[32px] font-medium text-[#0B132A]">
            History Order
          </h1>
          <span className="bg-[#E8E8E8] text-[#0B132A] rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center font-medium text-xs md:text-sm">
            {filteredOrders.length}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[60px]">
          <div className="flex-1">
            <div className="rounded-t-md px-4 md:px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex bg-[#E8E8E899] rounded-md p-1 w-full sm:w-auto overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 md:px-6 py-2 text-xs md:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeTab === tab
                          ? "bg-white text-[#0B132A] shadow-sm"
                          : "text-[#4F5665]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#4F5665] flex-shrink-0" />
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border border-[#E8E8E8] rounded-md px-3 md:px-4 py-2 text-[#0B132A] bg-white cursor-pointer outline-none text-xs md:text-sm flex-1 sm:flex-initial"
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

            <div className="space-y-4 md:space-y-5 mt-4 md:mt-[24px]">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl border border-[#E8E8E8] p-6 md:p-8 text-center">
                  <p className="text-[#4F5665] text-sm md:text-base">
                    No orders found
                  </p>
                </div>
              ) : (
                filteredOrders.map((order, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-[#E8E8E8] p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-6 items-start sm:items-center"
                  >
                    <div className="w-full sm:w-[80px] md:w-[100px] h-[200px] sm:h-[80px] md:h-[100px] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={order.img || "/image 22.png"}
                        alt={order.product}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
                      <div>
                        <p className="text-xs md:text-sm text-[#4F5665] mb-1">
                          No. Order
                        </p>
                        <p className="font-medium text-[#0B132A] text-xs md:text-sm">
                          #{order.orderNumber}
                        </p>
                        <button
                          onClick={() => handleViewDetail(order.orderNumber)}
                          className="text-[#FF8906] text-[10px] md:text-xs mt-1 hover:underline"
                        >
                          View Order Detail
                        </button>
                      </div>

                      <div>
                        <p className="text-xs md:text-sm text-[#4F5665] mb-1">
                          Date
                        </p>
                        <p className="font-medium text-[#0B132A] text-xs md:text-sm">
                          {order.date}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs md:text-sm text-[#4F5665] mb-1">
                          Total
                        </p>
                        <p className="font-medium text-[#0B132A] text-xs md:text-sm">
                          Idr {order.total.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs md:text-sm text-[#4F5665] mb-1">
                          Status
                        </p>
                        <span className="inline-block bg-[#FFF4E6] text-[#FF8906] px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {filteredOrders.length > 0 && (
              <div className="flex justify-center gap-2 mt-6 md:mt-[40px] flex-wrap">
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

          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#F0F0F0] lg:sticky lg:top-[100px]">
              <div className="flex justify-start mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FF8906] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-medium text-[#0B132A] mb-3">
                Send Us Message
              </h3>

              <p className="text-[#4F5665] text-xs md:text-sm mb-5 md:mb-6 leading-relaxed">
                If your unable to find answer or find your product quickly,
                please describe your problem and tell us, we will give you
                solution.
              </p>

              <button className="w-full bg-[#FF8906] text-white font-medium py-2.5 md:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
