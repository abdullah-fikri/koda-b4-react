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
      <section className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-[760px] bg-gradient-to-r from-[#0A2342] to-[#1D4ED8] px-6 lg:px-[120px] py-[80px] gap-12 text-white">
        <div className="max-w-[550px] flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-3xl lg:text-6xl font-semibold leading-tight">
            Start Your Day with <span className="text-[#60A5FA]">Coffee</span> and Good Meals
          </h1>
          <p className="opacity-90 text-sm lg:text-lg">
            High-quality coffee beans with fresh and healthy meals just for you.
          </p>
          <Link to="/Product" className="mx-auto lg:mx-0">
            <ButtonRegister className="bg-[#60A5FA] hover:bg-[#3B82F6] text-[#0A2342] px-6 py-3 rounded-xl text-sm font-semibold transition-all">
              Get Started
            </ButtonRegister>
          </Link>
        </div>

        <div className="relative w-full max-w-[550px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="/Rectangle 287.svg" alt="coffee" className="w-full h-[420px] object-cover" />
          <Chat />
        </div>
      </section>

      <section className="px-6 lg:px-[130px] py-[90px] bg-gray-300">
        <h2 className="text-3xl lg:text-5xl font-semibold text-center mb-4">
          We Provide <span className="text-[#1D4ED8]">Good Coffee</span> & <span className="text-[#1D4ED8]">Healthy Meals</span>
        </h2>
        <p className="text-[#4F5565] text-center max-w-[650px] mx-auto mb-12">
          Explore our menu and find the taste that suits your day.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "High quality beans",
            "Healthy custom meals",
            "Chat with our staff",
            "Free member card",
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white border border-[#E0E7FF] rounded-xl px-5 py-6"
            >
              <span className="text-[15px] font-medium text-[#0A2342]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* favorite */}
      <section className="px-6 lg:px-[130px] mb-[90px] bg-gray-400">
        <h2 className="text-3xl lg:text-5xl font-semibold text-center text-[#1D4ED8]">
          People's Favorite
        </h2>
        <p className="text-center text-[#4F5565] mt-2 mb-10">
          Choose and try — maybe it's yours too!
        </p>
        <CardProduct />
      </section>

      {/* map */}
      <section className="px-6 lg:px-[130px] mb-[90px]">
        <h2 className="text-3xl lg:text-5xl font-semibold text-center text-[#1D4ED8]">
          Visit Our Store
        </h2>
        <p className="text-center text-[#4F5565] mt-2">
          Locate the nearest branch around you.
        </p>
        <img src="/Frame 399.png" className="mt-[50px] rounded-2xl shadow-xl w-full" />
      </section>

      {/* testi */}
      {testimonial && (
        <section className="flex flex-col lg:flex-row items-center gap-10 bg-gradient-to-r from-[#1D4ED8] to-[#0A2342] py-[80px] px-6 lg:px-[130px] text-white transition-all">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full lg:w-[380px] h-[350px] object-cover rounded-2xl shadow-xl"
          />
          <div className="flex flex-col gap-4 w-full max-w-[700px]">
            <p className="opacity-80">TESTIMONIAL</p>
            <h3 className="text-3xl lg:text-4xl font-semibold">{testimonial.name}</h3>
            <span className="text-[#93C5FD]">{testimonial.position}</span>
            <p className="text-lg leading-relaxed mt-2">"{testimonial.testimonial}"</p>
            <div className="flex gap-3 items-center mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(testimonial.rating)
                      ? "text-[#60A5FA] fill-[#60A5FA]"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-white font-medium text-lg">{testimonial.rating.toFixed(1)}</span>
            </div>

            <div className="flex gap-3 mt-4">
              <RoundButton bgColor="#E8E8E8" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4 text-[#0A2342]" />
              </RoundButton>
              <RoundButton bgColor="#60A5FA" onClick={handleNext}>
                <ArrowLeft className="w-4 h-4 rotate-180 text-[#0A2342]" />
              </RoundButton>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
