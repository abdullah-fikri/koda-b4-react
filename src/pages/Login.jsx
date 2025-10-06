import React, { useState } from "react";
import Input from "../components/Input";
import { ButtonRegister } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/util";
import { findUser, saveUser, setCurrentUser } from "../utils/storage";
import { Mail, Lock, Eye, EyeOff, Facebook } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  saveUser({
    fullName: "admin",
    email: "admin123@gmail.com",
    password: "admin123",
    role: "admin",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    const user = findUser(data.email, data.password);

    if (user) {
      setCurrentUser(user);

      if (user.role === "admin") {
        setAlertMessage("Login Admin Success!");
      } else {
        setAlertMessage("Login Success!");
      }

      setShowAlert(true);
    } else {
      setAlertMessage("Invalid email or password");
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);

    if (alertMessage === "Login Success!") {
      navigate("/Home"); // user biasa
    } else if (alertMessage === "Login Admin Success!") {
      navigate("/Dashboard"); // admin
    }
  };

  return (
    <div className="flex">
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
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

      <img src=".././public/img/Rectangle 289 (1).svg" alt="coffe logo" />
      <div className="ml-[70px] max-w-[780px] w-full h-[821px] gap-[51px] mt-[61px]">
        <img src=".././public/img/Frame 12.png" alt="coffe-shop" />

        <div className="mt-[51px] flex flex-col gap-[25px]">
          <h1 className="font-jakarta font-semibold text-2xl text-[#8E6447]">
            Login
          </h1>
          <span className="text-base text-[#4F5665] font-normal">
            Fill out the form correctly
          </span>

          <form
            className="flex flex-col gap-[25px]"
            onSubmit={handleSubmit(onSubmit)}
          >
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

            <div>
              <span className="flex justify-end text-[#FF8906] font-normal text-base">
                <Link to="/ForgotPassword">Lupa Password?</Link>
              </span>
            </div>

            <ButtonRegister
              className="max-w-[780px] w-full h-[50px] bg-[#FF8906] text-[#0B132A] rounded-[6px] font-jakarta text-base font-medium p-[10px] cursor-pointer"
              type="submit"
            >
              Login
            </ButtonRegister>
          </form>

          <div className="flex items-center justify-center font-normal font-jakarta text-base">
            <span className="text-[#4F5665]">Not Have An Account?</span>
            <Link to="/register" className="text-[#FF8906] cursor-pointer ml-1">
              Register
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
                <Facebook className="fill-black text-black" /> Facebook
              </div>
            </ButtonRegister>
            <ButtonRegister>
              <div className="flex items-center justify-center gap-[22px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-[383px] h-[64px] text-[#4F5665] font-medium text-lg  rounded-2xl">
                <img
                  src=".././public/img/flat-color-icons_google.svg"
                  alt="google"
                />{" "}
                Google
              </div>
            </ButtonRegister>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
