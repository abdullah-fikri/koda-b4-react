/**
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.label - Label text displayed above the input.
 * @param {string} [props.span] - Optional text displayed to the right of the label (e.g., “Forgot password?”).
 * @param {React.ElementType} [props.leftIcon] - Optional icon component displayed on the left side of the input.
 * @param {React.ReactNode} [props.children] - Optional child elements (e.g., icon buttons) displayed on the right side of the input.
 * @param {Object} rest - Additional props passed to the `<input>` element (e.g., `type`, `placeholder`, `value`, `onChange`).
 * @returns {JSX.Element} The styled input component.
 */

import React from "react";

const Input = ({ label, span, leftIcon: LeftIcon, children, ...rest }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <label className="flex flex-col gap-[13px]">{label}</label>
        <span className="text-base font-normal text-[#FF8906]">{span}</span>
      </div>
      <div className="flex items-center border rounded-[8px] h-[52px] px-[13px] py-[14px] gap-[10px] bg-[#FCFDFE] border-[#DEDEDE] w-full">
        {LeftIcon && <LeftIcon className="w-5 h-5 text-gray-500" />}
        <input
          className="flex-1 w-full border-none outline-none placeholder:text-[12px] placeholder:tracking-[0.75px] placeholder:text-[#4F5665]"
          {...rest}
        />
        {children}
      </div>
    </div>
  );
};

export default Input;
