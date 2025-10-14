import React, { useState, useContext } from "react";
import { Plus, X, MapPin, Mail, User } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../utils/util";
import { CartContext } from "../context/Context";
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

const CheckoutProduct = () => {
  const { cart, setCart } = useContext(CartContext);
  const { history, setHistory } = useContext(History);
  const [deliveryMethod, setDeliveryMethod] = useState("Dine in");
  const navigate = useNavigate();

  const handleRemoveItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () =>
    cart.reduce((total, item) => {
      const price = parsePrice(item.price);
      return total + price * (item.quantity || 1);
    }, 0);

  const subtotal = calculateSubtotal();
  const delivery = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + delivery + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(checkoutSchema) });

  const onSubmit = (data) => {
    const orderNumber = `12354-${Math.floor(10000 + Math.random() * 90000)}`;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const order = {
      orderNumber,
      date: formattedDate,
      total: Math.round(total),
      status: "On Progress",
      items: cart,
      customerInfo: {
        fullName: data.fullName,
        email: data.email,
        address: data.address,
      },
      deliveryMethod,
      img: cart[0]?.img || "/image 22.png",
      product: cart.map((item) => item.product).join(", "),
    };

    setHistory([...history, order]);
    setCart([]);
    navigate("/HistoryOrder");
  };

  return (
    <div className="pt-[76px] px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[130px] py-8 md:py-[50px] mt-[76px] min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0B0909] mb-8 md:mb-[50px]">
        Payment Details
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[60px]">
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-[24px]">
              <h2 className="text-xl md:text-2xl font-medium text-[#0B132A]">
                Your Order
              </h2>
              <Link to="/product">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-[#FF8906] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors w-full sm:w-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add Menu
                </button>
              </Link>
            </div>

            {/* Cart List */}
            <div className="space-y-4 mb-8 md:mb-[50px]">
              {cart.length === 0 ? (
                <div className="text-center py-10 text-[#4F5665]">
                  <p className="text-base md:text-lg">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item, index) => {
                  const pricePerItem = parsePrice(item.price);
                  const originalPricePerItem = parsePrice(item.originalPrice);
                  const totalPrice = pricePerItem * (item.quantity || 1);
                  const totalOriginalPrice = originalPricePerItem
                    ? originalPricePerItem * (item.quantity || 1)
                    : null;

                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                    >
                      <div className="w-full sm:w-[120px] h-[200px] sm:h-[120px] rounded-xl overflow-hidden flex-shrink-0 relative">
                        {item.flashSale && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
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
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg md:text-xl font-medium text-[#0B132A]">
                            {item.product}
                          </h3>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="text-[#4F5665] text-xs md:text-sm mb-3">
                          {item.quantity} pcs | {item.size} | {item.temp} |{" "}
                          {deliveryMethod}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
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
                  );
                })
              )}
            </div>

            {/* Payment  */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100">
              <h3 className="text-lg md:text-xl font-medium text-[#0B132A] mb-4 md:mb-6">
                Payment Info & Delivery
              </h3>

              <div className="space-y-4 md:space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-[#0B132A] font-medium mb-2 md:mb-3 text-sm md:text-base">
                    Email
                  </label>
                  <Input
                    leftIcon={Mail}
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-[#0B132A] font-medium mb-2 md:mb-3 text-sm md:text-base">
                    Full Name
                  </label>
                  <Input
                    leftIcon={User}
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Full Name"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[#0B132A] font-medium mb-2 md:mb-3 text-sm md:text-base">
                    Address
                  </label>
                  <Input
                    leftIcon={MapPin}
                    type="text"
                    name="address"
                    placeholder="Enter Your Address"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Delivery Method */}
                <div>
                  <label className="block text-[#0B132A] font-medium mb-2 md:mb-3 text-sm md:text-base">
                    Delivery
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {["Dine in", "Door Delivery", "Pick Up"].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setDeliveryMethod(method)}
                        className={`flex-1 py-2.5 md:py-3 rounded-md font-normal text-xs md:text-sm transition-colors ${
                          deliveryMethod === method
                            ? "bg-white border border-[#FF8906] text-[#FF8906]"
                            : "bg-white border border-[#E8E8E8] text-[#0B132A] hover:border-[#FF8906]"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 lg:sticky lg:top-[100px]">
              <h3 className="text-xl md:text-2xl font-medium text-[#0B132A] mb-4 md:mb-6">
                Total
              </h3>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-[#0B132A] text-sm md:text-base">
                  <span>Order</span>
                  <span className="font-medium">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-[#0B132A] text-sm md:text-base">
                  <span>Delivery</span>
                  <span className="font-medium">
                    {formatCurrency(delivery)}
                  </span>
                </div>

                <div className="flex justify-between text-[#0B132A] text-sm md:text-base">
                  <span>Tax</span>
                  <span className="font-medium">
                    {formatCurrency(Math.round(tax))}
                  </span>
                </div>

                <div className="border-t pt-3 md:pt-4 flex justify-between text-[#0B132A] text-base md:text-lg font-medium">
                  <span>Sub Total</span>
                  <span>{formatCurrency(Math.round(total))}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF8906] text-white font-medium py-3 md:py-4 rounded-xl hover:bg-orange-600 transition-colors mb-4 md:mb-6 text-sm md:text-base"
              >
                Checkout
              </button>

              <div>
                <p className="text-[#0B132A] font-medium mb-2 md:mb-3 text-sm md:text-base">
                  We Accept
                </p>
                <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-1 md:gap-2 mb-2 md:mb-3">
                  {["BRI", "DANA", "BCA", "GoPay", "OVO", "PayPal"].map(
                    (bank) => (
                      <div
                        key={bank}
                        className="bg-white border border-gray-200 rounded px-2 md:px-3 py-1.5 md:py-2 text-center"
                      >
                        <span className="text-[10px] md:text-xs font-semibold text-[#0B132A]">
                          {bank}
                        </span>
                      </div>
                    )
                  )}
                </div>
                <p className="text-[10px] md:text-xs text-[#4F5665]">
                  *Get Discount if you pay with Bank Central Asia
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutProduct;
