import React, { useEffect, useState } from "react";
import { ButtonRegister } from "../components/Button";
import Input from "../components/Input";
import { Mail, User, Eye, EyeOff, Lock, MapPin } from "lucide-react";

export const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    since: "",
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("currentUser"));
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (users) {
      setData({
        fullName: users.fullName,
        email: users.email,
        phone: "+6289501931221",
        password: users.password,
        address: orders?.[0]?.customerInfo?.address || "",
        since: users.since,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("currentUser")) || [];

    const updateUsers = { ...users, ...data };

    localStorage.setItem("currentUser", JSON.stringify(updateUsers));
    alert("sukses");
    setData(updateUsers);
  };

  return (
    <>
      <div className="pt-[100px] px-[130px]">
        <h1 className="text-[#0B0909] text-5xl font-normal ">Profile</h1>
        <div className="flex mt-[44px] gap-5 items-start">
          <div className="border border-[#E8E8E8] max-w-[280px] w-full flex items-center flex-col gap-[15px] p-5">
            <h2 className="text-xl text-[#0B132A] font-medium">
              {data.fullName}
            </h2>
            <span className="text-base font-normal text-[#4F5665]">
              {data.email}
            </span>
            <div className="w-[113px] h-[113px] rounded-full border"></div>
            <label className="bg-[#FF8906] py-3 px-6 cursor-pointer rounded ">
              Upload New Photo
              <input type="file" accept="image/*" className="hidden" />
            </label>

            <span className="text-[#4F5665] text-base font-normal flex gap-1.5">
              since
              <p className="text-base font-semibold text-[#4F5665]">
                {data.since}
              </p>
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="max-w-[880px] w-full border border-[#E8E8E8] px-[50px] py-5"
          >
            <div className="flex flex-col gap-[25px]">
              <Input
                label={"Full Name"}
                leftIcon={User}
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
              ></Input>
              <Input
                label={"email"}
                leftIcon={Mail}
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              ></Input>
              <Input
                label={"Phone"}
                leftIcon={User}
                type="text"
                name="Phone"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              ></Input>
              <Input
                leftIcon={Lock}
                span={"Set New Password"}
                label={"Password"}
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
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
              <Input
                label={"Address"}
                leftIcon={MapPin}
                type="text"
                name="Address"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              ></Input>
              <ButtonRegister
                type={"submit"}
                className={
                  "bg-[#FF8906] py-3 px-6 w-full rounded cursor-pointer"
                }
              >
                Submit
              </ButtonRegister>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
