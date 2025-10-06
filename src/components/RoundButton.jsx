import React from "react";

export const RoundButton = ({
  children,
  bgColor = "#E8E8E8",
  size = 47,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-full cursor-pointer"
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
      }}
    >
      {children}
    </button>
  );
};
