import Input from "../components/Input";
import { ButtonRegister } from "../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/util";
import { findUser, setCurrentUser } from "../utils/storage";

import { Mail } from "lucide-react";

const ForgotPassword = () => {
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
      alert("Login Success!");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <div className="flex ">
        <img src=".././public/img/Rectangle 289 (2).svg" alt="coffe logo" />
        <div className="ml-[70px] max-w-[780px] w-full h-[821px] gap-[51px] mt-[61px] content-center">
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

              <ButtonRegister
                className={
                  "max-w-[780px] w-full h-[50px] bg-[#FF8906] text-[#0B132A] rounded-[6px] font-jakarta text-base font-medium p-[10px] cursor-pointer"
                }
                type="submit"
              >
                Submit
              </ButtonRegister>
            </form>
          </div>
          <span>
            <Link to="/Home">tes</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
