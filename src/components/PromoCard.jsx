/**
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.bgColor - Background color of the card.
 * @param {string} props.image - Image source URL for the promo card.
 * @param {string} props.title - Title text of the promotion.
 * @param {string} props.description - Description text of the promotion.
 * @param {string} [props.cta] - Optional call-to-action text (e.g., "Shop Now").
 * @returns {JSX.Element} A styled promo card component displaying promotional content.
 */

import React from "react";

export const PromoCard = ({ bgColor, image, title, description, cta }) => {
  return (
    <div
      className={`flex items-center flex-shrink-0 gap-3 sm:gap-4 w-[260px] sm:w-[335px] rounded-[16px] sm:rounded-[20px] p-3 sm:p-4`}
      style={{ backgroundColor: bgColor }}
    >
      <img
        src={image}
        alt="promo"
        className="w-[70px] h-[80px] sm:w-[96px] sm:h-[106px] object-contain -mb-4 sm:mb-[-28px]"
      />

      <div className="flex flex-col overflow-hidden">
        <h1 className="font-bold text-xs sm:text-sm md:text-base ">{title}</h1>
        <p className="text-[11px] sm:text-xs md:text-sm ">{description}</p>
        {cta && (
          <span className="mt-2 text-[11px] sm:text-sm font-medium text-white bg-black/20 px-2 py-1 rounded-md w-fit">
            {cta}
          </span>
        )}
      </div>
    </div>
  );
};
