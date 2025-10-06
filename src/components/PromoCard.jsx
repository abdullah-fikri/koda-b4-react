import React from "react";

export const PromoCard = ({ bgColor, image, title, description, cta }) => {
  return (
    <div
      className={`flex items-center gap-4 max-w-[335px] w-full rounded-[20px] p-4`}
      style={{ backgroundColor: bgColor }}
    >
      <img src={image} alt="promo" className="w-[96px] h-[106px] mb-[-28px]" />
      <div className="flex flex-col">
        <h1 className="font-bold text-sm md:text-base">{title}</h1>
        <p className="text-xs md:text-sm">{description}</p>
        {cta && (
          <span className="mt-2 text-sm font-medium text-white">{cta}</span>
        )}
      </div>
    </div>
  );
};
