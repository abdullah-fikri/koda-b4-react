import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Package,
} from "lucide-react";

export const DetailOrder = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = storedOrders.find((o) => o.orderNumber === orderNumber);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate("/HistoryOrder");
    }
  }, [orderNumber, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-white pt-[76px] flex items-center justify-center">
        <p className="text-[#4F5665]">Loading...</p>
      </div>
    );
  }

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
      <div className="px-[130px] py-[50px]">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate("/HistoryOrder")}
            className="w-10 h-10 rounded-full bg-[#E8E8E8] hover:bg-[#FF8906] hover:text-white transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[32px] font-medium text-[#0B132A]">
            Order #{order.orderNumber}
          </h1>
        </div>

        <p className="text-[#4F5665] mb-10">{order.date} </p>

        <div className="flex gap-[60px]">
          <div className="flex-1">
            <h2 className="text-2xl font-medium text-[#0B132A] mb-6">
              Order Information
            </h2>

            <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-[#4F5665]">Full Name</p>
                    <p className="font-medium text-[#0B132A] text-right">
                      {order.customerInfo.fullName}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-[#4F5665]">Address</p>
                    <p className="font-medium text-[#0B132A] text-right max-w-[300px]">
                      {order.customerInfo.address}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-[#4F5665]">Phone</p>
                    <p className="font-medium text-[#0B132A] text-right">
                      082116304338
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-[#4F5665]">Payment Method</p>
                    <p className="font-medium text-[#0B132A] text-right">
                      Cash
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <Truck className="w-5 h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-[#4F5665]">Shipping</p>
                    <p className="font-medium text-[#0B132A] text-right">
                      {order.deliveryMethod}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#4F5665]" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-[#4F5665]">Status</p>
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#E8E8E8]"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 flex-shrink-0"></div>
                  <div className="flex-1 flex justify-between items-start">
                    <p className="text-[#4F5665] text-lg">Total Transaksi</p>
                    <p className="font-medium text-[#FF8906] text-xl">
                      Idr {order.total.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[440px] flex-shrink-0">
            <h2 className="text-2xl font-medium text-[#0B132A] mb-6">
              Your Order
            </h2>

            <div className="space-y-5">
              {order.items &&
                order.items.map((item, index) => {
                  const pricePerItem = parseFloat(item.price.replace(/,/g, ""));
                  const originalPricePerItem = item.originalPrice
                    ? parseFloat(item.originalPrice.replace(/,/g, ""))
                    : null;

                  const totalPrice = pricePerItem * item.quantity;
                  const totalOriginalPrice = originalPricePerItem
                    ? originalPricePerItem * item.quantity
                    : null;

                  return (
                    <div
                      key={index}
                      className="bg-[#FAFAFA] rounded-2xl p-5 border border-[#E8E8E8]"
                    >
                      <div className="flex gap-5">
                        <div className="w-[140px] h-[140px] rounded-xl overflow-hidden flex-shrink-0 relative">
                          {item.flashSale && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                              FLASH SALE!
                            </div>
                          )}
                          <img
                            src={item.img || "/img/image 22.png"}
                            alt={item.product}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-medium text-[#0B132A] mb-2">
                            {item.product}
                          </h3>

                          <p className="text-[#4F5665] text-sm mb-4">
                            {item.quantity}pcs | {item.size} | {item.temp} |{" "}
                            {order.deliveryMethod}
                          </p>

                          <div className="flex flex-col gap-1">
                            {totalOriginalPrice && (
                              <span className="text-[#D00000] line-through text-sm">
                                IDR {totalOriginalPrice.toLocaleString("id-ID")}
                              </span>
                            )}
                            <span className="text-[#FF8906] text-xl font-medium">
                              IDR {totalPrice.toLocaleString("id-ID")}
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
