import React, { useState, useContext } from "react";
import { Plus, X, MapPin, Mail, User } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../utils/util";
import { CartContext } from "../context/Context";
import { History } from "../context/Context";

const CheckoutProduct = () => {
  const { cart, setCart } = useContext(CartContext);
  const { history, setHistory } = useContext(History);
  //
  const [deliveryMethod, setDeliveryMethod] = useState("Dine in");
  const navigate = useNavigate();

  const handleRemoveItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/,/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

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
      orderNumber: orderNumber,
      date: formattedDate,
      total: Math.round(total),
      status: "On Progress",
      items: cart,
      customerInfo: {
        fullName: data.fullName,
        email: data.email,
        address: data.address,
      },
      deliveryMethod: deliveryMethod,
      img: cart[0]?.img || "/img/image 22.png",
      product: cart.map((item) => item.product).join(", "),
    };

    setHistory([...history, order]);

    setCart([]);

    navigate("/HistoryOrder");
  };

  return (
    <>
      <div className="pt-[76px] px-[130px] py-[50px] mt-[76px] min-h-screen">
        <h1 className="text-5xl font-medium text-[#0B0909] mb-[50px]">
          Payment Details
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-[60px]">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-[24px]">
                <h2 className="text-2xl font-medium text-[#0B132A]">
                  Your Order
                </h2>
                <Link to="/product">
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-[#FF8906] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add Menu
                  </button>
                </Link>
              </div>

              <div className="space-y-4 mb-[50px]">
                {cart.length === 0 ? (
                  <div className="text-center py-10 text-[#4F5665]">
                    <p className="text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item, index) => {
                    const pricePerItem = parseFloat(
                      item.price.replace(/,/g, "")
                    );
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
                        className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                      >
                        <div className="w-[120px] h-[120px] rounded-xl overflow-hidden flex-shrink-0 relative">
                          {item.flashSale && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
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
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-medium text-[#0B132A]">
                                {item.product}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="text-[#4F5665] text-sm mb-3">
                            {item.quantity}pcs | {item.size} | {item.temp} |{" "}
                            {deliveryMethod}
                          </div>

                          <div className="flex items-center gap-2">
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
                    );
                  })
                )}
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-medium text-[#0B132A] mb-6">
                  Payment Info & Delivery
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[#0B132A] font-medium mb-3">
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#0B132A] font-medium mb-3">
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#0B132A] font-medium mb-3">
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#0B132A] font-medium mb-3">
                      Delivery
                    </label>
                    <div className="flex gap-4">
                      {["Dine in", "Door Delivery", "Pick Up"].map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setDeliveryMethod(method)}
                          className={`flex-1 py-3 rounded-md font-normal text-sm transition-colors ${
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

            <div className="w-[400px] flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-[100px]">
                <h3 className="text-2xl font-medium text-[#0B132A] mb-6">
                  Total
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#0B132A]">
                    <span>Order</span>
                    <span className="font-medium">
                      Idr. {subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#0B132A]">
                    <span>Delivery</span>
                    <span className="font-medium">Idr. {delivery}</span>
                  </div>

                  <div className="flex justify-between text-[#0B132A]">
                    <span>Tax</span>
                    <span className="font-medium">
                      Idr. {Math.round(tax).toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="border-t pt-4 flex justify-between text-[#0B132A] text-lg font-medium">
                    <span>Sub Total</span>
                    <span>
                      Idr. {Math.round(total).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF8906] text-white font-medium py-4 rounded-xl hover:bg-orange-600 transition-colors mb-6"
                >
                  Checkout
                </button>

                <div>
                  <p className="text-[#0B132A] font-medium mb-3">We Accept</p>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="bg-white border border-gray-200 rounded px-3 py-2">
                      <span className="text-xs font-semibold text-blue-600">
                        BRI
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded px-3 py-2">
                      <span className="text-xs font-semibold text-blue-400">
                        DANA
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded px-3 py-2">
                      <span className="text-xs font-semibold text-blue-700">
                        BCA
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded px-3 py-2">
                      <span className="text-xs font-semibold text-green-600">
                        GoPay
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded px-3 py-2">
                      <span className="text-xs font-semibold text-purple-600">
                        OVO
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded px-3 py-2">
                      <span className="text-xs font-semibold text-blue-600">
                        PayPal
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4F5665]">
                    *Get Discount if you pay with Bank Central Asia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutProduct;
