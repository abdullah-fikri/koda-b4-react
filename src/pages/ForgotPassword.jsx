import React, { useState } from "react";
import Input from "../components/Input";
import { ButtonRegister } from "../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotSchema } from "../utils/util";
import { Mail } from "lucide-react";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const { account } = useSelector((state) => state.account);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotSchema),
  });

  const onSubmit = (data) => {
    const foundUser = account.find((acc) => acc.email === data.email);

    if (foundUser) {
      setAlertMessage("We’ve sent a new password to your email!");
    } else {
      setAlertMessage("Email not found. Please check again!");
    }

    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-[90%] text-center">
            <h2 className="text-lg font-semibold text-[#8E6447]">
              {alertMessage}
            </h2>
            <button
              onClick={handleCloseAlert}
              className="mt-4 px-6 py-2 bg-[#FF8906] text-white rounded-md hover:bg-[#e07a05] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <img
        src="/Rectangle 289 (2).svg"
        alt="coffee logo"
        className="hidden lg:block lg:max-w-[600px] lg:h-auto object-contain"
      />

      <div className="w-full lg:ml-[70px] lg:max-w-[780px] px-6 lg:px-0 py-8 lg:py-0 lg:h-[821px] lg:mt-[61px] flex flex-col">
        {/* Logo */}
        <img
          src="/Frame 12.png"
          alt="coffee-shop"
          className="w-32 lg:w-[132px] mx-auto lg:mx-0 mb-8 lg:mb-0"
        />

        <div className="lg:mt-[51px] flex flex-col gap-[25px]">
          <h1 className="font-jakarta font-semibold text-2xl text-[#8E6447]">
            Forgot Password
          </h1>
          <span className="text-base text-[#4F5665] font-normal">
            We will send a new password to your email
          </span>

          <form
            className="flex flex-col gap-[25px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                leftIcon={Mail}
                label="Email"
                type="email"
                placeholder="Enter Your Email"
                {...register("email")}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>

            <ButtonRegister
              className="w-full h-[50px] bg-[#FF8906] text-[#0B132A] rounded-[6px] font-jakarta text-base font-medium p-[10px] cursor-pointer"
              type="submit"
            >
              Submit
            </ButtonRegister>
          </form>

          <div className="flex items-center justify-center font-normal font-jakarta text-base mt-2">
            <span className="text-[#4F5665]">Remembered your password?</span>
            <Link to="/login" className="text-[#FF8906] cursor-pointer ml-1">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
