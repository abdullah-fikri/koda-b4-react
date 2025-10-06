import React from "react";

export const ButtonRegister = ({ className, children }) => {
  return (
    <div>
      <button className={className}>{children}</button>
    </div>
  );
};
