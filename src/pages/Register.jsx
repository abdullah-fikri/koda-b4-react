import React, { useState } from "react";
import Input from "../components/Input";
import { ButtonRegister } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/util";
import { User, Mail, Lock, Eye, EyeOff, Facebook } from "lucide-react";
import { useDispatch } from "react-redux";
import {api} from "../utils/Fetch"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

const onSubmit = async (data) => {
  try {
    const res = await api("/auth/register", "POST", {
      email: data.email,
      password: data.password,
      username: data.fullName,
      phone: "",
      address: ""
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Register gagal");
      return;
    }

    console.log(result);
    setShowAlert(true);
  } catch (error) {
    console.log("Register error:", error);
  }
};

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-[90%] text-center">
            <h2 className="text-lg font-semibold text-[#8E6447]">
              Register Success!
            </h2>
            <p className="text-gray-600 mt-2">
              Your account has been created. Please login to continue.
            </p>
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
        src="/Rectangle 289.svg"
        alt="coffe logo"
        className="hidden lg:block"
      />

      <div className="w-full lg:ml-[70px] lg:max-w-[780px] px-6 lg:px-0 py-8 lg:py-0 lg:h-[821px] lg:mt-[61px] flex flex-col">
        <img
          src="/Frame 12.png"
          alt="coffe-shop"
          className="w-32 lg:w-[132px] mx-auto lg:mx-0 mb-8 lg:mb-0 "
        />

        <div className="lg:mt-[51px] flex flex-col gap-[25px]">
          <h1 className="font-jakarta font-semibold text-2xl text-[#8E6447]">
            Register
          </h1>
          <span className="text-base text-[#4F5665] font-normal">
            Fill out the form correctly
          </span>

          <form
            className="flex flex-col gap-[25px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                leftIcon={User}
                label="Full Name"
                type="text"
                placeholder="Enter Your Full Name"
                {...register("fullName")}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName?.message}
              </p>
            </div>

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

            <div>
              <Input
                leftIcon={Lock}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                {...register("password")}
              >
                {showPassword ? (
                  <EyeOff
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </Input>
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>

            <div>
              <Input
                leftIcon={Lock}
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                placeholder="Enter Your Password Again"
                {...register("confirmPassword")}
              >
                {showConfirm ? (
                  <EyeOff
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirm(false)}
                  />
                ) : (
                  <Eye
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirm(true)}
                  />
                )}
              </Input>
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <ButtonRegister
              className="w-full h-[50px] bg-[#FF8906] text-[#0B132A] rounded-[6px] font-jakarta text-base font-medium p-[10px] cursor-pointer"
              type="submit"
            >
              Register
            </ButtonRegister>
          </form>

          <div className="flex items-center justify-center font-normal font-jakarta text-base">
            <span className="text-[#4F5665]">Have An Account?</span>
            <Link to="/login" className="text-[#FF8906] cursor-pointer ml-1">
              Login
            </Link>
          </div>

          <div className="flex justify-between items-center">
            <div className="w-[35%] h-[1px] bg-[#DEDEDE]"></div>
            <div className="text-[#AAAAAA]">Or</div>
            <div className="w-[35%] h-[1px] bg-[#DEDEDE]"></div>
          </div>

          <div className="flex justify-center lg:flex-row items-center gap-[14px]">
            <ButtonRegister>
              <div className="flex items-center justify-center gap-[22px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-16 lg:w-[383px] h-[64px] text-[#4F5665] font-medium text-lg rounded-2xl">
                <img
                  src="/flat-color-icons_google.svg"
                  alt="google"
                  className="w-6 h-6"
                />
                <span className="lg:inline hidden">Google</span>
              </div>
            </ButtonRegister>
            <ButtonRegister>
              <div className="flex items-center justify-center gap-[22px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-16 lg:w-[383px] h-[64px] text-[#4F5665] font-medium text-lg rounded-2xl">
                <Facebook className="fill-blue-600 text-blue-600 w-6 h-6" />
                <span className="lg:inline hidden">Facebook</span>
              </div>
            </ButtonRegister>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
