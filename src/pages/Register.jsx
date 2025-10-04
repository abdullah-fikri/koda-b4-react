import React, { useState } from "react";
import Input from "../components/Input";
import { ButtonRegister } from "../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/util";
import { saveUser } from "../utils/storage";

// icons
import { User, Mail, Lock, Eye, EyeOff, Facebook } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    saveUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
    alert("Register Success! Please login.");
  };

  return (
    <div className="flex">
      <img src=".././public/img/Rectangle 289.svg" alt="coffe logo" />
      <div className="ml-[70px] max-w-[780px] w-full h-[821px] gap-[51px] mt-[61px]">
        <img src=".././public/img/Frame 12.png" alt="coffe-shop" />

        <div className="mt-[51px] flex flex-col gap-[25px]">
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
            <Input
              leftIcon={User}
              label="Full Name"
              type="text"
              placeholder="Enter Your Full Name"
              {...register("fullName")}
            />
            <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

            <Input
              leftIcon={Mail}
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              {...register("email")}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>

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
            <p className="text-red-500 text-sm">{errors.password?.message}</p>

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
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>

            <ButtonRegister
              className={
                "max-w-[780px] w-full h-[50px] bg-[#FF8906] text-[#0B132A] rounded-[6px] font-jakarta text-base font-medium p-[10px] cursor-pointer"
              }
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
            <div className="text-[#AAAAAA]">or</div>
            <div className="w-[35%] h-[1px] bg-[#DEDEDE]"></div>
          </div>
          <div className="flex items-center gap-[14px]">
            <ButtonRegister>
              <div className="flex items-center justify-center gap-[22px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-[383px] h-[64px] text-[#4F5665] font-medium text-lg  rounded-2xl">
                <Facebook />
                Facebook
              </div>
            </ButtonRegister>
            <ButtonRegister>
              <div className="flex items-center justify-center gap-[22px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-[383px] h-[64px] text-[#4F5665] font-medium text-lg  rounded-2xl">
                <img
                  src=".././public/img/flat-color-icons_google.svg"
                  alt="google"
                />
                Google
              </div>
            </ButtonRegister>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
