import React, { useState } from "react";
import Input from "../components/Input";
import { ButtonRegister } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/util";
import { User, Mail, Lock, Eye, EyeOff, Facebook } from "lucide-react";
import { api } from "../utils/Fetch";

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
        address: "",
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Register gagal");
        return;
      }

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
    <div className="flex min-h-screen bg-[#F5F7FB]">
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 max-w-[90%] text-center border border-blue-200">
            <h2 className="text-lg font-semibold text-[#1D4ED8]">Register Success!</h2>
            <p className="text-gray-600 mt-2">Your account has been created. Please login to continue.</p>
            <button
              onClick={handleCloseAlert}
              className="mt-4 px-6 py-2 bg-[#1D4ED8] text-white rounded-md hover:bg-[#173ea8] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:flex lg:w-[45%] bg-gray-100 items-center justify-center p-10">
        <img
          src="https://images.unsplash.com/photo-1608438153526-db8ea9c6f4dc?q=80&w=940&auto=format&fit=crop"
          alt="coffe"
          className="max-w-[420px] rounded-xl shadow-xl"
        />
      </div>

      <div className="w-full lg:w-[55%] flex flex-col px-8 py-16 lg:px-20">
        <h1 className="font-jakarta font-semibold text-3xl text-[#1D4ED8]">Create an Account</h1>
        <p className="text-base text-gray-600 mt-1">Fill out the form correctly</p>

        <form className="flex flex-col gap-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              leftIcon={User}
              label="Full Name"
              type="text"
              placeholder="Enter Your Full Name"
              {...register("fullName")}
            />
            <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
          </div>

          <div>
            <Input
              leftIcon={Mail}
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              {...register("email")}
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
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
                <EyeOff className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
              ) : (
                <Eye className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
              )}
            </Input>
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
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
                <EyeOff className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setShowConfirm(false)} />
              ) : (
                <Eye className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setShowConfirm(true)} />
              )}
            </Input>
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <ButtonRegister
            className="w-full h-[50px] bg-[#1D4ED8] text-white rounded-lg font-jakarta text-base font-medium shadow-md hover:bg-[#173ea8] transition"
            type="submit"
          >
            Register
          </ButtonRegister>
        </form>

        <div className="flex items-center justify-center mt-6 font-normal text-base">
          <span className="text-gray-600">Have an account?</span>
          <Link to="/login" className="text-[#1D4ED8] cursor-pointer ml-1 font-medium">
            Login
          </Link>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="w-[35%] h-px bg-gray-300"></div>
          <div className="text-gray-500">Or</div>
          <div className="w-[35%] h-px bg-gray-300"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-6">
          <ButtonRegister>
            <div className="flex items-center justify-center gap-4 border border-gray-400 w-64 h-14 rounded-xl shadow-sm bg-white">
              <img src="/flat-color-icons_google.svg" alt="google" className="w-6 h-6" />
              <span className="text-gray-700 font-medium">Google</span>
            </div>
          </ButtonRegister>

          <ButtonRegister>
            <div className="flex items-center justify-center gap-4 border border-gray-400 w-64 h-14 rounded-xl shadow-sm bg-white">
              <Facebook className="text-blue-600 w-6 h-6" />
              <span className="text-gray-700 font-medium">Facebook</span>
            </div>
          </ButtonRegister>
        </div>
      </div>
    </div>
  );
};

export default Register;
