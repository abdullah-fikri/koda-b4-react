/**
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Controls whether the modal is visible.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Object} props.product - Product data associated with the order.
 * @returns {JSX.Element | null} A modal containing detailed order info, or null if closed.
 */

import React from "react";
import {
  X,
  User,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Package,
} from "lucide-react";

export const DetailOrderModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-end z-50">
      <div className="bg-white w-[480px] h-full overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#E8E8E8]">
          <h1 className="text-lg font-semibold text-[#4F5665]">
            Order <span className="text-black font-bold">#{product.id}</span>
          </h1>
          <button onClick={onClose} className="text-red-500 hover:text-red-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Information */}
          <div>
            <h2 className="text-base font-semibold text-[#4F5665] mb-4">
              Order Information
            </h2>

            <div className="space-y-4 text-sm text-[#4F5665]">
              {/* Full Name */}
              <div className="flex justify-between border-b border-[#E8E8E8] pb-2">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <p>Full Name</p>
                </div>
                <p className="font-semibold text-black">
                  Ghaluh Wizard Anggoro
                </p>
              </div>

              {/* Address */}
              <div className="flex justify-between border-b border-[#E8E8E8] pb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <p>Address</p>
                </div>
                <p className="font-semibold text-black text-right">
                  Griya Bandung Indah
                </p>
              </div>

              {/* Phone */}
              <div className="flex justify-between border-b border-[#E8E8E8] pb-2">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <p>Phone</p>
                </div>
                <p className="font-semibold text-black">082116304338</p>
              </div>

              {/* Payment Method */}
              <div className="flex justify-between border-b border-[#E8E8E8] pb-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <p>Payment Method</p>
                </div>
                <p className="font-semibold text-black">Cash</p>
              </div>

              {/* Shipping */}
              <div className="flex justify-between border-b border-[#E8E8E8] pb-2">
                <div className="flex items-center gap-2">
                  <Truck size={16} />
                  <p>Shipping</p>
                </div>
                <p className="font-semibold text-black">Dine In</p>
              </div>

              {/* Status */}
              <div className="flex justify-between border-b border-[#E8E8E8] pb-2">
                <div className="flex items-center gap-2">
                  <Package size={16} />
                  <p>Status</p>
                </div>
                <select
                  defaultValue="onprogress"
                  className="rounded-md px-3 py-2 text-sm font-medium text-[#4F5665] bg-[#F1F1F1]"
                >
                  <option value="onprogress">On progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Total Transaksi */}
            <div className="flex justify-between mt-4">
              <p className="text-[#4F5665] font-semibold">Total Transaksi</p>
              <p className="text-[#FF8906] font-bold">Idr 40.000</p>
            </div>
          </div>

          {/* Your Order */}
          <div>
            <h2 className="text-base font-semibold text-[#4F5665] mb-3">
              Your Order
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: 1,
                  name: "Hazelnut Latte",
                  qty: 2,
                  variant: "2 pcs | Regular | Ice | Dine In",
                  oldPrice: "IDR 40.000",
                  price: "IDR 20.000",
                  img: "/img/image 27.png",
                },
                {
                  id: 2,
                  name: "Caramel Machiato",
                  qty: 2,
                  variant: "2 pcs | Regular | Ice | Dine In",
                  oldPrice: "IDR 40.000",
                  price: "IDR 20.000",
                  img: "/img/image 27.png",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border border-[#E8E8E8] rounded-lg p-3 items-center"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#4F5665]">{item.name}</p>
                    <p className="text-xs text-[#9CA3AF]">{item.variant}</p>
                    <div className="flex gap-2 text-sm">
                      <p className="line-through text-[#B7B7B7]">
                        {item.oldPrice}
                      </p>
                      <p className="text-[#FF8906] font-semibold">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Update Button */}
          <div className="pt-2">
            <button className="w-full bg-[#FF8906] hover:bg-[#ff9f3d] text-white font-semibold py-2 rounded-lg">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
