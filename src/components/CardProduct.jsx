/**
 *
 * @typedef {Object} ProductItem
 * @property {number|string} id - Unique product ID
 * @property {string} title - Product title
 * @property {string} description - Short description of the product
 * @property {string} img - Image URL of the product
 * @property {string|number} price - Product price
 *
 * @component
 * @returns {JSX.Element} Rendered product cards
 */

import React, { useEffect, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CardProduct = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/product.json")
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Fetch gagal:", err));
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
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative lg:-mt-16 sm:-mt-20 mx-4 bg-white rounded-2xl p-1 lg:p-4 sm:p-5 lg:shadow-lg">
            <h3 className="text-lg sm:text-xl font-medium text-[#0B132A] mb-2">
              {item.title}
            </h3>

            <p className="text-[#4F5665] text-xs sm:text-sm font-normal leading-relaxed mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((stars) => (
                <div key={stars}>
                  <Star size={10} color="#FF8906" fill="#FF8906" />
                </div>
              ))}
            </div>

            <p className="text-lg sm:text-xl font-medium text-[#FF8906] mb-4">
              IDR {item.price}
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-2">
              <button
                className="flex-1 bg-[#FF8906] text-[#0B132A] font-medium text-sm sm:text-base px-20 py-3 sm:p-2.5 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(item.id);
                }}
              >
                Buy
              </button>
              <button
                className="border border-orange-500 px-20 py-3 sm:p-2.5 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
