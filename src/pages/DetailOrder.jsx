import React, { useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Package,
} from "lucide-react";
import { History } from "../context/Context";

const parsePrice = (value) => {
  if (!value) return 0;
  if (typeof value === "number") return value;
  const num = parseFloat(
    value
      .toString()
      .replace(/[^\d.-]/g, "")
      .replace(",", "")
  );
  return isNaN(num) ? 0 : num;
};

const formatCurrency = (value) =>
  `IDR ${value.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
  })}`;

export const DetailOrder = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const { history } = useContext(History);

  const order = history.find((o) => o.orderNumber === orderNumber);

  useEffect(() => {
    if (history.length === 0) return;

    if (!order) {
      navigate("/HistoryOrder");
    }
  }, [order, navigate, history]);

  const getStatusColor = (status) => {
    switch (status) {
      case "On Progress":
        return "bg-[#FFF4E6] text-[#FF8906]";
      case "Sending Goods":
        return "bg-blue-50 text-blue-600";
      case "Finish Order":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-white pt-[76px]">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[130px] py-8 md:py-[50px]">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <button
            onClick={() => navigate("/HistoryOrder")}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#E8E8E8] hover:bg-[#FF8906] hover:text-white transition-colors flex items-center justify-center flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-[32px] font-medium text-[#0B132A]">
            Order #{order.orderNumber}
          </h1>
        </div>

        <p className="text-[#4F5665] mb-6 md:mb-10 text-sm md:text-base">
          {order.date}
        </p>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[60px]">
          <div className="flex-1 w-full">
            <h2 className="text-xl md:text-2xl font-medium text-[#0B132A] mb-4 md:mb-6">
              Order Information
            </h2>

            <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 md:p-8">
              <div className="space-y-5 md:space-y-6">
                {/* Full Name */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 md:w-12 flex-shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <Package className="w-4 h-4 md:w-5 md:h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                    <Link to="/Profile" state={{ order }}>
                      <p className="text-[#4F5665] text-sm md:text-base">
                        Full Name
                      </p>
                    </Link>
                    <p className="font-medium text-[#0B132A] text-right text-sm md:text-base">
                      {order.customerInfo.fullName}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]" />

                {/* Address */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 md:w-12 flex-shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                    <Link to={"/Profile"}>
                      <p className="text-[#4F5665] text-sm md:text-base">
                        Address
                      </p>
                    </Link>
                    <p className="font-medium text-[#0B132A] text-right max-w-full sm:max-w-[300px] text-sm md:text-base">
                      {order.customerInfo.address}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]" />

                {/* Phone */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 md:w-12 flex-shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                    <Link to={"/Profile"}>
                      <p className="text-[#4F5665] text-sm md:text-base">
                        Phone
                      </p>
                    </Link>
                    <p className="font-medium text-[#0B132A] text-right text-sm md:text-base">
                      {order.customerInfo.phone || "+62"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]" />

                {/* Payment */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 md:w-12 flex-shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                    <p className="text-[#4F5665] text-sm md:text-base">
                      Payment Method
                    </p>
                    <p className="font-medium text-[#0B132A] text-right text-sm md:text-base">
                      {order.paymentMethod || "Cash"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]" />

                {/* Shipping */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 md:w-12 flex-shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <Truck className="w-4 h-4 md:w-5 md:h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                    <p className="text-[#4F5665] text-sm md:text-base">
                      Shipping
                    </p>
                    <p className="font-medium text-[#0B132A] text-right text-sm md:text-base">
                      {order.deliveryMethod}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]" />

                {/* Status */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 md:w-12 flex-shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <Package className="w-4 h-4 md:w-5 md:h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                    <p className="text-[#4F5665] text-sm md:text-base">
                      Status
                    </p>
                    <span
                      className={`inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]" />

                {/* Total */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 md:w-12 flex-shrink-0"></div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                    <p className="text-[#4F5665] text-base md:text-lg">
                      Total Transaksi
                    </p>
                    <p className="font-medium text-[#FF8906] text-lg md:text-xl">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[440px] flex-shrink-0">
            <h2 className="text-xl md:text-2xl font-medium text-[#0B132A] mb-4 md:mb-6">
              Your Order
            </h2>

            <div className="space-y-4 md:space-y-5">
              {order.items?.map((item, index) => {
                const pricePerItem = parsePrice(item.price);
                const originalPricePerItem = item.originalPrice
                  ? parsePrice(item.originalPrice)
                  : null;

                const totalPrice = pricePerItem * item.quantity;
                const totalOriginalPrice = originalPricePerItem
                  ? originalPricePerItem * item.quantity
                  : null;

                return (
                  <div
                    key={index}
                    className="bg-[#FAFAFA] rounded-2xl p-4 md:p-5 border border-[#E8E8E8]"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                      <div className="w-full sm:w-[120px] md:w-[140px] h-[200px] sm:h-[120px] md:h-[140px] rounded-xl overflow-hidden flex-shrink-0 relative">
                        {item.flashSale && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 md:px-2.5 py-1 rounded-full z-10">
                            FLASH SALE!
                          </div>
                        )}
                        <img
                          src={item.img || "/image 22.png"}
                          alt={item.product}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-medium text-[#0B132A] mb-2">
                          {item.product}
                        </h3>

                        <p className="text-[#4F5665] text-xs md:text-sm mb-3 md:mb-4">
                          {item.quantity}pcs | {item.size} | {item.temp} |{" "}
                          {order.deliveryMethod}
                        </p>

                        <div className="flex flex-col gap-1">
                          {totalOriginalPrice && (
                            <span className="text-[#D00000] line-through text-xs md:text-sm">
                              {formatCurrency(totalOriginalPrice)}
                            </span>
                          )}
                          <span className="text-[#FF8906] text-lg md:text-xl font-medium">
                            {formatCurrency(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
