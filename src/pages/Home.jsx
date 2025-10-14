import React, { useState, useEffect } from "react";
import { ButtonRegister } from "../components/Button";
import { CardProduct } from "../components/CardProduct";
import { Star, ArrowLeft } from "lucide-react";
import Chat from "../components/Chat";
import { RoundButton } from "../components/RoundButton";
import { Link } from "react-router-dom";

const Home = () => {
  const [testimoniData, setTestimoniData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/data/testimoni.json")
      .then((res) => res.json())
      .then((data) => setTestimoniData(data))
      .catch((err) => console.error("Gagal mengambil data testimoni:", err));
  }, []);

  useEffect(() => {
    if (testimoniData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimoniData.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimoniData]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimoniData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimoniData.length - 1 ? 0 : prev + 1
    );
  };

  const testimonial = testimoniData[currentIndex];

  return (
    <>
      <div className="flex flex-col lg:flex-row mt-[76px]">
        <div className="bg-gradient-to-r from-[#0B0909] to-[#777C82] w-full lg:max-w-[715px] h-auto lg:h-[1024px] py-12 sm:py-16 lg:py-[283px] px-6 sm:px-10 lg:pl-32">
          <div className="flex flex-col w-full lg:max-w-[518px] h-auto lg:h-[457px] gap-[25px]">
            <h1 className="text-white font-medium text-2xl sm:text-3xl lg:text-5xl">
              Start Your Day with Coffee and Good Meals
            </h1>
            <span className="font-normal text-sm lg:text-base text-white">
              We provide high quality beans, good taste, and healthy meals made
              by love just for you. Start your day with us for a bigger smile!
            </span>
            <Link to="/Product">
              <ButtonRegister className="bg-[#FF8906] p-2.5 rounded-md font-normal text-sm cursor-pointer w-fit">
                Get Started
              </ButtonRegister>
            </Link>
            <div className="flex flex-row gap-[20px] lg:gap-[40px]">
              <div className="flex flex-col w-full lg:max-w-[146px] border-r border-r-[white] gap-[12px]">
                <h1 className="text-[#FF8906] font-medium text-2xl sm:text-3xl lg:text-5xl">
                  90+
                </h1>
                <span className="text-white text-xs sm:text-sm lg:text-base">
                  Staff
                </span>
              </div>
              <div className="flex flex-col w-full lg:max-w-[146px] border-r border-r-[white] gap-[12px]">
                <h1 className="text-[#FF8906] font-medium text-2xl sm:text-3xl lg:text-5xl">
                  30+
                </h1>
                <span className="text-white text-xs sm:text-sm lg:text-base">
                  Stores
                </span>
              </div>
              <div className="flex flex-col w-full lg:max-w-[146px] gap-[12px]">
                <h1 className="text-[#FF8906] font-medium text-2xl sm:text-3xl lg:text-5xl">
                  800+
                </h1>
                <span className="text-white text-xs sm:text-sm lg:text-base">
                  Customers
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:max-w-[712px]">
          <img
            className="w-full h-[300px] sm:h-[400px] lg:h-[1024px] object-cover"
            src="/Rectangle 287.svg"
            alt="Coffe"
          />
          <Chat />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <div className="flex flex-col w-full lg:max-w-[529px] h-auto lg:h-[465px] gap-[25px] py-[54px] px-6 lg:ml-[130px]">
          <div className="flex items-center">
            <div className="w-[7px] h-[68px] bg-[#FF8906] mr-6"></div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-medium font-jakarta">
              We Provide
              <span className="text-[#8E6447]"> Good Coffee</span>
              <br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              <span className="text-[#8E6447]">and Healthy Meals</span>
            </h1>
          </div>
          <span className="text-sm lg:text-base font-normal text-[#4F5665] font-jakarta">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </span>
          <ul className="flex flex-col gap-[25px]">
            <li className="flex gap-[10px] items-start">
              <img src="/Vector.svg" alt="Checklist" className="mt-1" />
              <span className="text-sm lg:text-base">High quality beans</span>
            </li>
            <li className="flex gap-[10px] items-start">
              <img src="/Vector.svg" alt="Checklist" className="mt-1" />
              <span className="text-sm lg:text-base">
                Healthy meals, you can request the ingredients
              </span>
            </li>
            <li className="flex gap-[10px] items-start">
              <img src="/Vector.svg" alt="Checklist" className="mt-1" />
              <span className="text-sm lg:text-base">
                Chat with our staff to get better experience for ordering
              </span>
            </li>
            <li className="flex gap-[10px] items-start">
              <img src="/Vector.svg" alt="Checklist" className="mt-1" />
              <span className="text-sm lg:text-base">
                Free member card with a minimum purchase of IDR 200.000.
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-auto px-6 lg:px-0 mt-6 lg:mt-0">
          <img
            src="/Rectangle 291.png"
            alt="barista"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* favorite */}
      <div className="flex flex-col justify-center items-center mt-[81px] px-6 lg:px-[130px]">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-medium font-jakarta text-center">
          Here is People's
          <span className="text-[#8E6447]"> Favorite</span>
        </h1>
        <div className="w-[7px] h-[68px] bg-[#FF8906] rotate-90"></div>
        <span className="font-jakarta text-sm lg:text-base font-normal text-[#4F5665] text-center">
          Let's choose and have a bit taste of poeple's favorite. It might be
          yours too!
        </span>
        <CardProduct />
      </div>

      <div className="flex flex-col justify-center items-center mt-[81px] px-6 lg:px-[130px]">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-medium font-jakarta text-[#8E6447] text-center">
          Visit Our Store
          <span className="text-[#0B132A]"> in the Spot on the Map Below</span>
        </h1>
        <div className="w-[7px] h-[68px] bg-[#FF8906] rotate-90"></div>
        <span className="font-jakarta text-sm lg:text-base font-normal text-[#4F5665] text-center">
          You can explore the menu that we provide with fun and have their own
          taste and make your day better.
        </span>
        <img
          className="mt-[60px] w-full h-auto"
          src="/Frame 399.png"
          alt="map-store"
        />
      </div>

      {/* testimoni */}
      {testimonial && (
        <div className="flex flex-col lg:flex-row bg-gradient-to-r from-[#777C82] to-[#0B0909] w-full lg:max-w-[1441px] py-[76px] px-6 lg:px-[132px] gap-5 items-center transition-all duration-500 ease-in-out">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full lg:w-[400px] h-[300px] lg:h-[400px] rounded-2xl object-cover shadow-lg"
          />
          <div className="flex flex-col gap-[25px] w-full">
            <p className="text-white text-sm lg:text-base font-normal">
              TESTIMONIAL
            </p>
            <div className="flex items-center">
              <div className="w-[7px] h-[68px] bg-[#FF8906]"></div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-white ml-4">
                {testimonial.name}
              </h2>
            </div>
            <span className="text-[#FF8906] font-normal text-sm lg:text-base">
              {testimonial.position}
            </span>
            <span className="text-white font-normal text-sm lg:text-base">
              "{testimonial.testimonial}"
            </span>
            <div className="flex gap-[25px] items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-[13px] h-[13px] ${
                    i < Math.round(testimonial.rating)
                      ? "text-[#FF8906] fill-[#FF8906]"
                      : "text-gray-400"
                  }`}
                />
              ))}
              <span className="text-white text-sm lg:text-base font-normal font-jakarta">
                {testimonial.rating.toFixed(1)}
              </span>
            </div>
            <div className="flex gap-[9px]">
              <RoundButton bgColor="#E8E8E8" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4" />
              </RoundButton>
              <RoundButton bgColor="#FF8906" onClick={handleNext}>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </RoundButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
