import React from "react";
import { PromoCard } from "../components/PromoCard";
import { RoundButton } from "../components/RoundButton";
import { ArrowLeft } from "lucide-react";
import { FilterSidebar } from "../components/Filter";
import { CardProductPromo } from "../components/CardProductPromo";
import { Link } from "react-router-dom";

const Product = () => {
  const arr = [1, 2, 3, 4];

  return (
    <>
      <div
        className="w-full h-[376px] flex items-center py-[96px] pl-[130px] mt-[76px]"
        style={{
          backgroundImage: "url('/img/Rectangle 299.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="text-5xl font-medium text-white font-jakarta leading-snug">
          We Provide Good Coffee and Healthy <br /> Meals
        </span>
      </div>

      <div className="flex justify-between items-center px-[130px] my-[48px]">
        <span className="text-5xl font-medium text-[#0B0909] font-jakarta">
          Today
          <span className="text-[#8E6447]"> Promo</span>
        </span>

        <div className="flex gap-[9px]">
          <RoundButton bgColor="#E8E8E8">
            <ArrowLeft className="w-4 h-4" />
          </RoundButton>
          <RoundButton bgColor="#FF8906">
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </RoundButton>
        </div>
      </div>

      <div className="flex justify-center gap-4">
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

      <div className="px-[130px] mt-[59px]">
        <span className="text-5xl font-medium text-[#0B0909] font-jakarta block mb-10">
          Our
          <span className="text-[#8E6447]"> Product</span>
        </span>

        <div className="flex gap-8">
          <div className="flex-shrink-0 ">
            <FilterSidebar />
          </div>

          <Link to="/DetailProduct">
            <div>
              {arr.map((i) => (i <= 2 ? <CardProductPromo key={i} /> : ""))}
            </div>
          </Link>
        </div>
        <div className="flex mt-[35px] gap-5 ml-[590px]">
          {arr.map((i) =>
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
    </>
  );
};

export default Product;
