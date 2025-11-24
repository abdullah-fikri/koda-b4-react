import React, { useEffect, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/Fetch";

export const CardProduct = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api("/favorite-product")
      .then((res) => res.json())
      .then((data) => setProduct(data.data.products))
      .catch((err) => console.error("error fetch:", err));
  }, []);

  const handleClick = (id) => {
    navigate(`/detailproduct/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full">
      {product.map((item) => (
        <div
          key={item.id}
          className="relative cursor-pointer w-full"
          onClick={() => handleClick(item.id)}
        >
          <div className="w-full h-48 sm:h-60 md:h-72 overflow-hidden rounded-2xl">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative lg:-mt-16 sm:-mt-20 mx-4 bg-white rounded-2xl p-1 lg:p-4 sm:p-5 lg:shadow-lg">
            <h3 className="text-lg sm:text-xl font-medium text-[#0B132A] mb-2">
              {item.name}
            </h3>

            <p className="text-[#4F5665] text-xs sm:text-sm font-normal leading-relaxed mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((stars) => (
                <div key={stars}>
                  <Star size={10} color="#1D4ED8" fill="#1D4ED8" />
                </div>
              ))}
            </div>

            <p className="text-lg sm:text-xl font-medium text-[#1D4ED8] mb-4">
              IDR {item.min_price}
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-2">
              <button
                className="flex-1 bg-[#1D4ED8] text-white font-medium text-sm sm:text-base px-20 py-3 sm:p-2.5 rounded-lg hover:bg-[#2563EB] transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(item.id);
                }}
              >
                Buy
              </button>
              <button
                className="border border-[#1D4ED8] px-20 py-3 sm:p-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(item.id);
                }}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D4ED8]" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
