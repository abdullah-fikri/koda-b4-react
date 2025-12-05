import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { ButtonRegister } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/util";
import { Mail, Lock, Eye, EyeOff, Facebook } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/reducers/account";
import { api } from "../utils/Fetch";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await api("/auth/login", "POST", data);
      const result = await res.json();

      if (!res.ok) {
        setAlertMessage(result.message || "Wrong Email Or Password");
        return setShowAlert(true);
      }

      dispatch(
        setAuth({
          user: result.data.user,
          token: result.data.token,
        })
      );

      if (result.data.user.role === "admin") {
        setAlertMessage("Login Admin Success!");
      } else {
        setAlertMessage("Login Success!");
      }

      setShowAlert(true);
    } catch (error) {
      setAlertMessage("Terjadi kesalahan, coba lagi");
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);

    if (alertMessage === "Login Success!") navigate("/Home");
    else if (alertMessage === "Login Admin Success!") navigate("/Dashboard");
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-[90%] text-center border border-[#1D4ED8]">
            <h2 className="text-lg font-semibold text-[#1D4ED8]">
              {alertMessage}
            </h2>
            <button
              onClick={handleCloseAlert}
              className="mt-4 px-6 py-2 bg-[#1D4ED8] text-white rounded-md hover:bg-[#153ea8] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:flex w-[45%] items-center justify-center bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1665082452071-f175942c5dbc?q=80&w=987&auto=format&fit=crop"
          alt="login visual"
          className="w-[500px] h-auto rounded-xl shadow-2xl"
        />
      </div>

      <div className="w-full lg:w-[55%] px-6 lg:px-16 py-10 flex flex-col justify-center">
        <h1 className="font-jakarta font-bold text-3xl text-[#1D4ED8] mb-2">
          Welcome Back
        </h1>

        <span className="text-base text-[#4F5665] mb-8">
          Please login to continue
        </span>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <span className="flex justify-end text-[#1D4ED8] font-normal text-base cursor-pointer">
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </span>

          <ButtonRegister
            className="w-full h-[50px] bg-[#1D4ED8] text-white rounded-lg font-medium text-base shadow-md hover:bg-[#153ea8] transition"
            type="submit"
          >
            Login
          </ButtonRegister>
        </form>

        <div className="flex justify-center mt-4 text-base font-normal">
          <span className="text-[#4F5665]">Don't have an account?</span>
          <Link to="/register" className="text-[#1D4ED8] ml-1 font-semibold">
            Register
          </Link>
        </div>

        <div className="flex items-center justify-center mt-6 mb-4">
          <div className="w-1/3 h-px bg-[#DEDEDE]"></div>
          <span className="mx-4 text-[#AAAAAA]">Or</span>
          <div className="w-1/3 h-px bg-[#DEDEDE]"></div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <ButtonRegister>
            <div className="flex items-center justify-center gap-3 shadow-md bg-white w-64 h-14 text-[#4F5665] font-medium text-lg rounded-xl border border-gray-400">
              <img src="/flat-color-icons_google.svg" alt="google" className="w-6 h-6" />
              <span>Google</span>
            </div>
          </ButtonRegister>

          <ButtonRegister>
            <div className="flex items-center justify-center gap-3 shadow-md bg-white w-64 h-14 text-[#4F5665] font-medium text-lg rounded-xl border border-gray-400">
              <Facebook className="text-blue-600 w-6 h-6" />
              <span>Facebook</span>
            </div>
          </ButtonRegister>
        </div>
      </div>
    </div>
  );
};

export default Login;
