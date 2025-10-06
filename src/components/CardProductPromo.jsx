import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export const CardProductPromo = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("/data/product-promo.json")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.error("Fetch gagal:", err));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 p-6 ">
      {product.map((item) => (
        <div key={item.id} className="relative">
          {item.flashSale && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold p-2.5 rounded-3xl w-fit z-10">
              FLASH SALE!
            </div>
          )}

          <div className="w-full h-72 overflow-hidden rounded-2xl">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative -mt-20 mx-4 bg-white rounded-2xl p-5 shadow-lg">
            <h3 className="text-xl font-medium text-[#0B132A] mb-2">
              {item.title}
            </h3>

            <p className="text-[#4F5665] text-sm font-normal leading-relaxed mb-3">
              {item.description}
            </p>

            {item.rating && (
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="text-orange-500 text-lg">
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  {item.rating}
                </span>
              </div>
            )}

            <div className="mb-4">
              {item.originalPrice && (
                <span className="text-[#D00000] line-through text-sm mr-2">
                  IDR {item.originalPrice}
                </span>
              )}

              <span className="text-xl font-medium text-[#FF8906]">
                IDR {item.price}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 bg-[#FF8906] text-white font-medium p-2.5 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                Buy
              </button>
              <button className="border border-orange-500 p-2.5 rounded-lg hover:bg-orange-50 transition-colors duration-200">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
