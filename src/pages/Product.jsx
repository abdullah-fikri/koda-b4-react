import React, { useState, useEffect } from "react";
import { PromoCard } from "../components/PromoCard";
import { RoundButton } from "../components/RoundButton";
import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "../components/Filter";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const arr = [1, 2, 3, 4];
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const productsPerPage = 6;

  useEffect(() => {
    fetch("/data/product-promo.json")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Fetch gagal:", err));
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...allProducts];

    if (filters.search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter((product) => {
        const productCategories = product.category || [];
        return filters.category.some((selectedCat) => {
          const normalizedSelectedCat = selectedCat
            .replace(/\s+/g, "")
            .toLowerCase();
          return productCategories.some(
            (cat) =>
              cat.replace(/\s+/g, "").toLowerCase() === normalizedSelectedCat
          );
        });
      });
    }

    if (filters.sort && filters.sort.length > 0) {
      filtered = filtered.filter((product) => {
        const productSortBy = product.sortBy || [];
        return filters.sort.some((selectedSort) => {
          if (
            selectedSort.toLowerCase() === "flash sale" &&
            product.isFlashSale
          ) {
            return true;
          }
          const normalizedSelectedSort = selectedSort
            .replace(/\s+/g, "")
            .toLowerCase();
          return productSortBy.some(
            (sort) =>
              sort.replace(/\s+/g, "").toLowerCase() === normalizedSelectedSort
          );
        });
      });
    }

    if (filters.priceRange) {
      filtered = filtered.filter((product) => {
        const price = parseInt(product.price.replace(/[^0-9]/g, "")) / 1000;
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (id) => {
    navigate(`/detailproduct/${id}`);
  };

  return (
    <>
      <div
        className="w-full h-[300px] sm:h-[376px] flex items-center py-[60px] sm:py-[96px] px-6 sm:px-[130px] mt-[76px]"
        style={{
          backgroundImage: "url('/img/Rectangle 299.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="text-3xl sm:text-5xl font-medium text-white font-jakarta leading-snug">
          We Provide Good Coffee and Healthy <br className="hidden sm:block" />{" "}
          Meals
        </span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-[130px] my-[48px] text-left">
        <span className="text-4xl sm:text-5xl font-medium text-[#0B0909] font-jakarta">
          Today<span className="text-[#8E6447]"> Promo</span>
        </span>

        <div className="hidden lg:block">
          <div className="flex gap-[9px] ">
            <RoundButton bgColor="#E8E8E8">
              <ArrowLeft className="w-4 h-4" />
            </RoundButton>
            <RoundButton bgColor="#FF8906">
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </RoundButton>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto  justify-center gap-4 px-4">
        {arr.map((item) =>
          item <= 3 ? (
            <PromoCard
              key={item}
              bgColor="#88B788"
              image="/img/image 46.png"
              title="HAPPY MOTHER'S DAY!"
              description="Get one of our favorite menu for free!"
              cta="Klaim Kupon"
            />
          ) : (
            <PromoCard
              key={item}
              bgColor="#FFBA33"
              image="/img/image 43.png"
              title="Get a cup of coffee for free"
              description="Only at 7 to 9 AM"
            />
          )
        )}
      </div>

      {/* filter toggl */}
      <div className="lg:hidden flex justify-center items-center mt-10">
        <div className="flex gap-2.5">
          <div className="border border-[#DEDEDE] p-3 gap-2.5 flex items-center w-[260px] sm:w-[300px]">
            <Search />
            <input
              type="text"
              placeholder="Find Product"
              className="border-none outline-none w-full text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-[#FF8906] rounded-sm p-3"
          >
            <SlidersHorizontal size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* popup */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end lg:hidden">
          <div className="w-full sm:w-1/2 h-full shadow-lg  overflow-y-auto">
            <button onClick={() => setShowFilter(false)}>
              <X color="red" />
            </button>
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}

      <div className="px-6 sm:px-[130px] mt-[59px] mb-16">
        <span className="text-4xl sm:text-5xl font-medium text-[#0B0909] font-jakarta block mb-10">
          Our<span className="text-[#8E6447]"> Product</span>
        </span>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block flex-shrink-0 w-[280px]">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* product  */}
          <div className="flex-1">
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-6 md:gap-8">
                {currentProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleProductClick(item.id)}
                    className="relative cursor-pointer"
                  >
                    {item.isFlashSale && (
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-600 text-white font-bold text-[10px] sm:text-xs px-2 py-1.5 sm:p-2.5 rounded-3xl w-fit z-10">
                        FLASH SALE!
                      </div>
                    )}

                    <div className="w-full h-44 sm:h-60 md:h-72 overflow-hidden rounded-2xl mb-2 sm:mb-0">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="relative mt-3 sm:-mt-16 mx-2 sm:mx-4 bg-white rounded-2xl  lg:p-3 sm:p-5 lg:shadow-md lg:hover:shadow-lg transition-shadow duration-200">
                      <h3 className="text-lg sm:text-base md:text-lg font-medium text-[#0B132A] mb-1 sm:mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[#4F5665] text-[11px] sm:text-sm leading-snug mb-2 sm:mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {item.rating && (
                        <div className="flex items-center lg:gap-1 mb-2 sm:mb-3">
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className="text-orange-500 text-xs sm:text-sm"
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-[10px] sm:text-xs text-gray-600 ml-1 hidden lg:block">
                            {item.rating}
                          </span>
                        </div>
                      )}

                      <div className="mb-3 sm:mb-4">
                        {item.originalPrice && (
                          <span className="text-[#D00000] line-through text-xs sm:text-sm mr-1 sm:mr-2 hidden lg:block">
                            IDR {item.originalPrice}
                          </span>
                        )}
                        <span className="text-sm sm:text-xl font-medium text-[#FF8906]">
                          IDR {item.price}
                        </span>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center gap-1.5 sm:gap-2">
                        <button className="flex-1 bg-[#FF8906] text-white text-xs sm:text-sm font-medium px-10 py-1.5 sm:py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                          Buy
                        </button>
                        <button className="border border-orange-500 px-10 py-1.5 sm:p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200">
                          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl">
                  No products found matching your filters
                </p>
                <p className="text-sm mt-2">
                  Try adjusting your filter settings
                </p>
              </div>
            )}
          </div>
        </div>

        {/* pagination */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="flex mt-[35px] gap-5 justify-center">
            {currentPage > 1 && (
              <RoundButton
                bgColor="#E8E8E8"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ArrowLeft className="w-4 h-4" />
              </RoundButton>
            )}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <RoundButton
                  key={pageNumber}
                  bgColor={currentPage === pageNumber ? "#FF8906" : "#E8E8E8"}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  <span
                    className={
                      currentPage === pageNumber ? "text-white" : "text-black"
                    }
                  >
                    {pageNumber}
                  </span>
                </RoundButton>
              );
            })}
            {currentPage < totalPages && (
              <RoundButton
                bgColor="#FF8906"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ArrowLeft className="text-white rotate-180" />
              </RoundButton>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
