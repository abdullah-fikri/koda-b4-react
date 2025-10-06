import React from "react";
import { ButtonRegister } from "../components/Button";
import { CardProduct } from "../components/CardProduct";
import { Star, ArrowLeft } from "lucide-react";
import Chat from "../components/Chat";
import { RoundButton } from "../components/RoundButton";

const Home = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="flex">
        <div className="bg-gradient-to-r from-[#777C82] to-[#0B0909] max-w-[730px] w-full h-[1024px] py-[283px] pl-32">
          <div className="flex flex-col max-w-[518px] w-full h-[457px] gap-[25px] ">
            <h1 className="text-white font-medium text-5xl">
              Start Your Day with Coffee and Good <br />
              Meals
            </h1>
            <span className="font-normal text-base text-white">
              We provide high quality beans, good taste, and healthy meals{" "}
              <br /> made by love just for you. Start your day with us for a
              bigger
              <br /> smile!
            </span>
            <ButtonRegister
              className={
                "bg-[#FF8906] p-2.5 rounded-md font-normal text-sm cursor-pointer"
              }
            >
              Get Started
            </ButtonRegister>
            <div className="flex flex-row gap-[40px]">
              <div className="flex flex-col max-w-[146px] w-full border-r border-r-[white] gap-[12px]">
                <h1 className="text-[#FF8906] font-medium text-5xl">90+</h1>
                <span className="text-white">Staff</span>
              </div>

              <div className="flex flex-col max-w-[146px] w-full border-r border-r-[white] gap-[12px]">
                <h1 className="text-[#FF8906] font-medium text-5xl">30+</h1>
                <span className="text-white">Stores</span>
              </div>

              <div className="flex flex-col max-w-[146px] w-full gap-[12px]">
                <h1 className="text-[#FF8906] font-medium text-5xl">800+</h1>
                <span className="text-white">Customers</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img
              className="max-w-[712px] w-full h-[1024] object-contain"
              src=".././public/img/Rectangle 287.svg"
              alt="Coffe"
            />
            <Chat />
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="flex justify-between">
        <div className="flex flex-col max-w-[529px] w-full h-[465px] gap-[25px] py-[54px] ml-[130px]">
          <div className="flex items-center">
            <div className="max-w-[7px] w-full h-[68px] bg-[#FF8906] mr-6"></div>
            <h1 className="text-5xl font-medium font-jakarta">
              We Provide
              <span className="text-[#8E6447]"> Good</span> <br />
              <span className="text-[#8E6447]">Coffee</span> and{" "}
              <span className="text-[#8E6447]">Healthy Meals</span>
            </h1>
          </div>
          <span className="text-base font-normal text-[#4F5665] font-jakarta">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </span>
          <ul className="flex flex-col gap-[25px]">
            <li className="flex gap-[10px]">
              <img src=".././public/img/Vector.svg" alt="Checklist" />
              High quality beans
            </li>
            <li className="flex gap-[10px]">
              <img src=".././public/img/Vector.svg" alt="Checklist" />
              Healthy meals, you can request the ingredients
            </li>
            <li className="flex gap-[10px]">
              <img src=".././public/img/Vector.svg" alt="Checklist" />
              Chat with our staff to get better experience for ordering
            </li>
            <li className="flex gap-[10px]">
              <img src=".././public/img/Vector.svg" alt="Checklist" />
              Free member card with a minimum purchase of IDR 200.000.
            </li>
          </ul>
        </div>
        <div>
          <img src=".././public/img/Rectangle 291.png" alt="barista" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-[81px] px-[130px]">
        <h1 className="text-5xl font-medium font-jakarta">
          Here is People's
          <span className="text-[#8E6447]"> Favorite</span>
        </h1>
        <div className="w-[7px] h-[68px] bg-[#FF8906] rotate-90"></div>
        <span className="font-jakarta text-base font-normal text-[#4F5665]">
          Let's choose and have a bit taste of poeple's favorite. It might be
          yours too!
        </span>
        <CardProduct />
      </div>
      {/* 3 */}
      <div className="flex flex-col justify-center items-center mt-[81px] px-[130px]">
        <h1 className="text-5xl font-medium font-jakarta text-[#8E6447]">
          Visit Our Store
          <span className="text-[#0B132A]"> in the Spot on the Map Below</span>
        </h1>
        <div className="w-[7px] h-[68px] bg-[#FF8906] rotate-90"></div>
        <span className="font-jakarta text-base font-normal text-[#4F5665]">
          You can explore the menu that we provide with fun and have their own
          taste and make your day better.
        </span>
        <img
          className="mt-[60px]"
          src=".././public/img/Frame 399.png"
          alt="map-store"
        />
      </div>
      <div className="flex bg-gradient-to-r from-[#777C82] to-[#0B0909] max-w-[1441px] w-full py-[76px] px-[132px] gap-5">
        <img src=".././public/img/Rectangle 295.png" alt="testimoni" />
        <div className="flex flex-col gap-[25px]">
          <p className="text-white text-base font-normal">TESTIMONIAL</p>
          <div className="flex items-center">
            <div className="w-[7px] h-[68px] bg-[#FF8906]"></div>
            <h2 className="text-5xl font-medium text-white ml-4">
              Viezh Robert
            </h2>
          </div>
          <span className="text-[#FF8906] font-normal text-base">
            Manager Coffe Shop
          </span>
          <span className="text-white font-normal text-base">
            "Wow... I am very happy to spend my whole day here. the Wi-fi <br />{" "}
            is good, and the coffee and meals tho. I like it here!! Very <br />
            recommended!
          </span>
          <div className="flex gap-[25px] items-center">
            {arr.map((item) => {
              return (
                <Star
                  key={item}
                  className="content-center w-[13px] h-[13px] text-[#FF8906] fill-[#FF8906]"
                />
              );
            })}
            <span className="text-white text-base font-normal font-jakarta">
              5.0
            </span>
          </div>
          <div className="flex gap-[9px]">
            <RoundButton bgColor="#E8E8E8">
              <ArrowLeft className="w-4 h-4" />
            </RoundButton>
            <RoundButton bgColor="#FF8906">
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </RoundButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
