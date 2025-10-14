/**
 *
 * @typedef {Object} PromoProductItem
 * @property {number|string} id - Unique product ID
 * @property {string} title - Product title
 * @property {string} description - Short product description
 * @property {string} img - Image URL of the product
 * @property {string|number} price - Discounted or current product price
 * @property {string|number} [originalPrice] - Original price before discount
 * @property {number} [rating] - Product rating (1–5)
 * @property {boolean} [flashSale] - Whether the product is part of a flash sale
 *
 * @typedef {Object} CardProductPromoProps
 * @property {"default" | "compact"} [layout="default"] - Defines layout size and spacing
 *
 * @component
 * @param {CardProductPromoProps} props - Component props
 * @returns {JSX.Element} Rendered promotional product grid
 */

import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CardProductPromo = ({ layout = "default" }) => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/product-promo.json")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.error("Fetch gagal:", err));
  }, []);

  const handleClick = (id) => {
    navigate(`/detailproduct/${id}`);
  };

  const gridClass =
    layout === "compact"
      ? "grid grid-cols-3 gap-6"
      : "grid grid-cols-2 gap-6 p-6";

  const imageHeight = layout === "compact" ? "h-56" : "h-72";
  const cardPadding = layout === "compact" ? "p-4" : "p-5";
  const titleSize = layout === "compact" ? "text-lg" : "text-xl";
  const descSize = layout === "compact" ? "text-xs" : "text-sm";
  const priceSize = layout === "compact" ? "text-base" : "text-xl";
  const flashBadgeSize =
    layout === "compact"
      ? "text-[10px] p-2 rounded-2xl"
      : "text-xs p-2.5 rounded-3xl";

  return (
    <div className={gridClass}>
      {product.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item.id)}
          className="relative cursor-pointer"
        >
          {item.flashSale && (
            <div
              className={`absolute top-4 left-4 bg-red-600 text-white font-bold ${flashBadgeSize} w-fit z-10`}
            >
              FLASH SALE!
            </div>
          )}

          {/* Gambar */}
          <div className={`w-full ${imageHeight} overflow-hidden rounded-2xl`}>
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Konten */}
          <div
            className={`relative -mt-16 mx-4 bg-white rounded-2xl ${cardPadding} shadow-lg`}
          >
            <h3 className={`${titleSize} font-medium text-[#0B132A] mb-2`}>
              {item.title}
            </h3>

            <p
              className={`text-[#4F5665] ${descSize} font-normal leading-relaxed mb-3`}
            >
              {item.description}
            </p>

            {item.rating && (
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="text-orange-500 text-sm">
                    ★
                  </span>
                ))}
                <span className="text-xs text-gray-600 ml-1">
                  {item.rating}
                </span>
              </div>
            )}

            {/* Harga */}
            <div className="mb-4">
              {item.originalPrice && (
                <span className="text-[#D00000] line-through text-sm mr-2">
                  IDR {item.originalPrice}
                </span>
              )}
              <span className={`${priceSize} font-medium text-[#FF8906]`}>
                IDR {item.price}
              </span>
            </div>

            {/* Tombol */}
            <div className="flex items-center gap-2">
              <button className="flex-1 bg-[#FF8906] text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                Buy
              </button>
              <button className="border border-orange-500 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
