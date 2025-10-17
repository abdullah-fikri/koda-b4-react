import React, { useState, useContext, useEffect } from "react";
import { ShoppingCart, ThumbsUp, Minus, Plus, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/Context";
import { useSelector } from "react-redux";

const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Regular");
  const [selectedTemp, setSelectedTemp] = useState("Ice");
  const [selectedImage, setSelectedImage] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [product, setProduct] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertLog, setAlertLog] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);
  const { currentUser } = useSelector((state) => state.account);

  useEffect(() => {
    Promise.all([
      fetch("/data/product.json").then((res) => res.json()),
      fetch("/data/product-promo.json").then((res) => res.json()),
    ])
      .then(([regularProducts, promoProducts]) => {
        const allProducts = [...regularProducts, ...promoProducts];

        const selected = allProducts.find((item) => item.id === id);

        if (selected) {
          setProduct(selected);
        } else {
          console.error("Product not found with id:", id);
          setProduct(allProducts[0]);
        }

        setRecommendations(promoProducts.slice(0, 3));
      })
      .catch((err) => console.error("Failed to load data:", err));
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "tambah") setQuantity(quantity + 1);
    else if (type === "kurang" && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (currentUser) {
      if (!product) return;
      const order = {
        product: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity,
        size: selectedSize,
        temp: selectedTemp,
        flashSale: product.flashSale,
        img: product.img,
      };
      setCart([...cart, order]);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 500);
    } else {
      setAlertLog(true);
      setTimeout(() => {
        setAlertLog(false);
      }, 3000);
    }
  };

  const handleBuy = () => {
    if (currentUser) {
      if (!product) return;
      const order = {
        product: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity,
        size: selectedSize,
        temp: selectedTemp,
        flashSale: product.flashSale,
        img: product.img,
      };
      setCart([...cart, order]);
      navigate("/checkoutProduct");
    } else {
      setAlertLog(true);
      setTimeout(() => {
        setAlertLog(false);
      }, 3000);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading product details...
      </div>
    );
  }

  return (
    <>
      <div className="pt-[76px] px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[130px] py-8 md:py-[50px] mt-[76px]">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[60px]">
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="relative w-full lg:w-[450px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-[20px] overflow-hidden mb-[20px]">
              <img
                src={product.images?.[selectedImage] || product.img}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 0 && (
              <div className="flex gap-3 md:gap-[20px] overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex-shrink-0 rounded-[10px] overflow-hidden cursor-pointer border-2 ${
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
            )}
          </div>

          <div className="flex-1">
            {product.flashSale && (
              <div className="bg-red-600 text-white text-xs font-bold p-2.5 rounded-3xl w-fit mb-4">
                FLASH SALE!
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium text-[#0B132A] mb-3 md:mb-[16px]">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 md:gap-[16px] mb-3 md:mb-[16px]">
              {product.originalPrice ? (
                <span className="text-[#D00000] line-through text-base md:text-[20px]">
                  IDR {product.originalPrice}
                </span>
              ) : (
                ""
              )}

              <span className="text-[#FF8906] text-xl md:text-2xl lg:text-[32px] font-medium">
                IDR {product.price}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-[24px] mb-4 md:mb-[24px]">
              <div className="flex items-center gap-[8px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="text-[#FF8906] text-base md:text-[20px]"
                  >
                    ★
                  </span>
                ))}
                <span className="text-[#0B132A] font-medium ml-[4px]">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-[8px] text-sm md:text-base">
                <span className="text-[#4F5665]">{product.reviews} Review</span>
                <span className="text-[#4F5665]">|</span>
                <span className="text-[#4F5665] flex items-center gap-[4px]">
                  Recommendation <ThumbsUp className="w-4 h-4" />
                </span>
              </div>
            </div>

            <p className="text-[#4F5665] text-sm md:text-[16px] leading-6 md:leading-[28px] mb-6 md:mb-[32px]">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 md:gap-[16px] mb-6 md:mb-[32px]">
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

            {/* Pilihan size */}
            <div className="mb-6 md:mb-[32px]">
              <h3 className="text-[#0B132A] font-medium text-base md:text-[18px] mb-3 md:mb-[16px]">
                Choose Size
              </h3>
              <div className="flex gap-3 md:gap-[16px]">
                {["Regular", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 w-full p-2 md:p-2.5 rounded-[8px] font-medium text-sm md:text-[16px] transition-colors ${
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

            {/* Pilihan suhu */}
            <div className="mb-6 md:mb-[40px]">
              <h3 className="text-[#0B132A] font-medium text-base md:text-[18px] mb-3 md:mb-[16px]">
                Hot/Ice?
              </h3>
              <div className="flex gap-3 md:gap-[16px]">
                {["Ice", "Hot"].map((temp) => (
                  <button
                    key={temp}
                    onClick={() => setSelectedTemp(temp)}
                    className={`flex-1 w-full px-6 md:px-[32px] py-3 md:py-[12px] rounded-[8px] font-medium text-sm md:text-[16px] transition-colors ${
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

            {/* buy or cart */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-[16px]">
              <button
                className="flex-1 bg-[#FF8906] text-white font-medium py-3 md:py-[16px] rounded-[12px] text-base md:text-[18px] hover:bg-orange-600 transition-colors cursor-pointer"
                onClick={handleBuy}
              >
                Buy
              </button>

              <button
                className="flex items-center justify-center gap-3 bg-white border border-[#FF8906] hover:bg-[#e97e05] text-[#FF8906] font-semibold text-sm md:text-[16px] py-3 md:py-[14px] px-5 md:px-[24px] rounded-[8px] transition-colors cursor-pointer"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
            {alert && (
              <div
                className="w-full bg-green-500 text-white text-sm font-bold px-4 py-3 mt-3 rounded-lg"
                role="alert"
              >
                Added to cart
              </div>
            )}
          </div>
        </div>
        {alertLog && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
            role="alert"
          >
            <strong className="font-bold">Upss!</strong>
            <span className="block sm:inline">
              You must be logged in to continue.
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
          </div>
        )}

        {/* rekomendasi */}
        <div className="mt-12 md:mt-20 lg:mt-[100px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium text-[#0B132A] mb-6 md:mb-[40px]">
            Recommendation <span className="text-[#8E6447]">For You</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-[24px]">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="relative cursor-pointer"
                onClick={() => navigate(`/detailproduct/${item.id}`)}
              >
                {item.flashSale && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs md:text-sm font-bold p-3 md:p-4 rounded-3xl z-10">
                    FLASH SALE!
                  </div>
                )}

                <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden rounded-2xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="relative -mt-16 md:-mt-20 mx-4 bg-white rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-lg md:text-xl font-medium text-[#0B132A] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[#4F5665] text-xs md:text-sm font-normal leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="text-orange-500 text-base md:text-lg"
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs md:text-sm text-gray-600 ml-1">
                      {item.rating}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-xs md:text-sm mr-2">
                      IDR {item.originalPrice}
                    </span>
                    <span className="text-lg md:text-xl font-medium text-[#FF8906]">
                      IDR {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
