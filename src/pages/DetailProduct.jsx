import React, { useState, useContext } from "react";
import { ShoppingCart, ThumbsUp, Minus, Plus, ArrowLeft } from "lucide-react";
import { RoundButton } from "../components/RoundButton";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/Context";

const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Regular");
  const [selectedTemp, setSelectedTemp] = useState("Ice");
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const product = {
    title: "Hazelnut Latte",
    price: "10,000",
    originalPrice: "20,000",
    rating: "5.0",
    reviews: "200+",
    flashSale: true,
    description:
      "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
    images: [
      "/img/image 22.png",
      "/img/image 27.png",
      "/img/image 30.png",
      "/img/image 31.png",
    ],
  };

  const handleQuantityChange = (type) => {
    if (type === "tambah") {
      setQuantity(quantity + 1);
    } else if (type === "kurang" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const order = {
      product: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: quantity,
      size: selectedSize,
      temp: selectedTemp,
      flashSale: product.flashSale,
      img: product.images[0],
    };

    setCart([...cart, order]);
  };

  const handleBuy = () => {
    const order = {
      product: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: quantity,
      size: selectedSize,
      temp: selectedTemp,
      flashSale: product.flashSale,
      img: product.images[0],
    };

    setCart([...cart, order]);
    navigate("/checkoutProduct");
  };

  return (
    <>
      <div className="pt-[76px] px-[130px] py-[50px] mt-[76px]">
        <div className="flex gap-[60px]">
          <div className="flex-shrink-0">
            <div className="relative w-[450px] h-[450px] rounded-[20px] overflow-hidden mb-[20px]">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-[20px]">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-[100px] h-[100px] rounded-[10px] overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index
                      ? "border-[#FF8906]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {product.flashSale && (
              <div className="bg-red-600 text-white text-xs font-bold p-2.5 rounded-3xl w-fit">
                FLASH SALE!
              </div>
            )}
            <h1 className="text-[48px] font-medium text-[#0B132A] mb-[16px]">
              {product.title}
            </h1>

            <div className="flex items-center gap-[16px] mb-[16px]">
              <span className="text-[#D00000] line-through text-[20px]">
                IDR {product.originalPrice}
              </span>
              <span className="text-[#FF8906] text-[32px] font-medium">
                IDR {product.price}
              </span>
            </div>

            <div className="flex items-center gap-[24px] mb-[24px]">
              <div className="flex items-center gap-[8px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-[#FF8906] text-[20px]">
                    ★
                  </span>
                ))}
                <span className="text-[#0B132A] font-medium ml-[4px]">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="text-[#4F5665]">{product.reviews} Review</span>
                <span className="text-[#4F5665]">|</span>
                <span className="text-[#4F5665] flex items-center gap-[4px]">
                  Recommendation <ThumbsUp className="w-4 h-4" />
                </span>
              </div>
            </div>

            <p className="text-[#4F5665] text-[16px] leading-[28px] mb-[32px]">
              {product.description}
            </p>

            <div className="flex items-center gap-[16px] mb-[32px]">
              <button
                onClick={() => handleQuantityChange("kurang")}
                className="w-[40px] h-[40px] border-2 border-[#E8E8E8] rounded-[8px] flex items-center justify-center hover:border-[#FF8906] transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-[60px] h-[40px] text-center border-2 border-[#E8E8E8] rounded-[8px] font-medium text-[18px]"
              />
              <button
                onClick={() => handleQuantityChange("tambah")}
                className="w-[40px] h-[40px] bg-[#FF8906] rounded-[8px] flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="mb-[32px]">
              <h3 className="text-[#0B132A] font-medium text-[18px] mb-[16px]">
                Choose Size
              </h3>
              <div className="flex gap-[16px]">
                {["Regular", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 w-full p-2.5 rounded-[8px] font-medium text-[16px] transition-colors ${
                      selectedSize === size
                        ? "bg-white border border-[#FF8906] text-[#FF8906]"
                        : "bg-white border border-[#E8E8E8] text-[#0B132A] hover:border-[#FF8906]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-[40px]">
              <h3 className="text-[#0B132A] font-medium text-[18px] mb-[16px]">
                Hot/Ice?
              </h3>
              <div className="flex gap-[16px]">
                {["Ice", "Hot"].map((temp) => (
                  <button
                    key={temp}
                    onClick={() => setSelectedTemp(temp)}
                    className={`flex-1 w-full px-[32px] py-[12px] rounded-[8px] font-medium text-[16px] transition-colors ${
                      selectedTemp === temp
                        ? "bg-white border border-[#FF8906] text-[#FF8906]"
                        : "bg-white border border-[#E8E8E8] text-[#0B132A] hover:border-[#FF8906]"
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-[16px]">
              <button
                className="flex-1 bg-[#FF8906] text-white font-medium py-[16px] rounded-[12px] text-[18px] hover:bg-orange-600 transition-colors cursor-pointer"
                onClick={handleBuy}
              >
                Buy
              </button>

              <button
                className="flex items-center justify-center gap-3 bg-[#FF8906] hover:bg-[#e97e05] text-white font-semibold text-[16px] py-[14px] px-[24px] rounded-[8px] transition-colors cursor-pointer"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-[100px]">
          <h2 className="text-[48px] font-medium text-[#0B132A] mb-[40px]">
            Recommendation <span className="text-[#8E6447]">For You</span>
          </h2>

          <div className="grid grid-cols-3 gap-[24px]">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative">
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold p-4 rounded-3xl z-10">
                  FLASH SALE!
                </div>

                <div className="w-full h-72 overflow-hidden rounded-2xl">
                  <img
                    src={`/img/image ${
                      item === 1 ? "27" : item === 2 ? "22" : "30"
                    }.png`}
                    alt="Hazelnut Latte"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative -mt-20 mx-4 bg-white rounded-2xl p-5 shadow-lg">
                  <h3 className="text-xl font-medium text-[#0B132A] mb-2">
                    Hazelnut Latte
                  </h3>

                  <p className="text-[#4F5665] text-sm font-normal leading-relaxed mb-3">
                    You can explore the menu that we provide with fun and have
                    their own taste and make your day better.
                  </p>

                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-orange-500 text-lg">
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">5.0</span>
                  </div>

                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-sm mr-2">
                      IDR 20,000
                    </span>
                    <span className="text-xl font-medium text-[#FF8906]">
                      IDR 10,000
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 bg-[#FF8906] text-white font-medium py-2.5 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                      Buy
                    </button>
                    <button className="border-2 border-orange-500 p-2.5 rounded-lg hover:bg-orange-50 transition-colors duration-200">
                      <ShoppingCart className="w-5 h-5 text-orange-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-[12px] mt-[48px]">
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
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
