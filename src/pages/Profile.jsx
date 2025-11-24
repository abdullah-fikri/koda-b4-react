import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ButtonRegister } from "../components/Button";
import Input from "../components/Input";
import { Mail, User, Eye, EyeOff, Lock, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";
import {api} from "../utils/Fetch"
import { upload } from "../utils/UploadImg";
import {FormatDate} from "../utils/FormatDate"

export const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [image, setImage] = useState(null);

  // redux
  const { currentUser } = useSelector((state) => state.account);

  // state location
  const location = useLocation();
  const orderFromNav = location.state?.order;
  // alamat dari DetailOrder
  const orderAddress = orderFromNav?.customerInfo?.address;

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    since: "",
  });
  

  const token = useSelector((state)=> state.account.token)
  useEffect(()=>{
    if (!token) return
    api(`/user/profile`, "GET", null, token)
    .then(res => res.json())
    .then(result => {
      setData(result.data); 
      setImage(result.data.profile_picture);
    })    
    .catch(err => console.error("error fetch profile:", err))
  },[token])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const body = {
      username: data.username,
      phone: data.phone,
      address: data.address,
    };
  
    if (data.password && data.password.length >= 6) {
      body.password = data.password;
    }
  
    api("/user/profile/update", "PUT", body, token)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setAlertMessage("Profile updated successfully!");
          setShowAlert(true);
        } else {
          setAlertMessage(result.message);
          setShowAlert(true);
        }
      })
      .catch(err => console.error("Error:", err));
  };

  const handleUpload = async (file) => {
    try {
      const res = await upload("/user/profile/upload", file, token);
      const result = await res.json();
      if (result.success) {
        setImage(result.data.profile_picture);
        setAlertMessage("Profile picture updated!");
        setShowAlert(true);
      } else {
        setAlertMessage(result.message || "Upload failed");
        setShowAlert(true);
      }
  
    } catch (err) {
      console.error(err)
      setAlertMessage("Upload error");
      setShowAlert(true);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">No user is currently logged in.</p>
      </div>
    );
  }

  const handleAlert = () => {
    setShowAlert(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    handleUpload(file);
  };

  return (
    <div className="pt-[100px] px-4 sm:px-8 md:px-16 lg:px-[130px]">
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-[90%] text-center">
            <h2 className="text-lg font-semibold text-[#8E6447]">
              {alertMessage}
            </h2>
            <button
              onClick={handleAlert}
              className="mt-4 px-6 py-2 bg-[#FF8906] text-white rounded-md hover:bg-[#e07a05] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <h1 className="text-[#0B0909] text-3xl sm:text-4xl lg:text-5xl font-normal">
        Profile
      </h1>
      <div className="flex flex-col lg:flex-row mt-6 sm:mt-8 lg:mt-[44px] gap-5 items-start">
        <div className="border border-[#E8E8E8] w-full lg:max-w-[280px] flex items-center flex-col gap-[15px] p-5">
          <h2 className="text-xl text-[#0B132A] font-medium text-center">
            {data?.username}
          </h2>
          <span className="text-base font-normal text-[#4F5665] text-center break-words">
            {data?.email}
          </span>
          <div className="w-[113px] h-[113px] rounded-full overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="png"
                className="w-full h-full object-cover"
              />
            ) : (
              ""
            )}
          </div>
          <label className="bg-[#FF8906] py-3 px-6 cursor-pointer rounded text-white text-center">
            Upload New Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>

          <span className="text-[#4F5665] text-base font-normal flex gap-1.5">
            since
            <p className="text-base font-semibold text-[#4F5665]">
              {FormatDate(data.since)}
            </p>
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full lg:max-w-[880px] border border-[#E8E8E8] px-5 sm:px-8 md:px-[50px] py-5"
        >
          <div className="flex flex-col gap-[25px]">
            <Input
              label={"Full Name"}
              leftIcon={User}
              type="text"
              name="fullName"
              value={data?.username || ""}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />

            <Input
              label={"Email"}
              leftIcon={Mail}
              type="email"
              name="email"
              value={data?.email || ""}
              disabled
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <Input
              label={"Phone"}
              leftIcon={User}
              type="text"
              name="phone"
              value={data?.phone || ""}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />

            <Input
              leftIcon={Lock}
              span={"Set New Password"}
              label={"Password"}
              type={showPassword ? "text" : "password"}
              name="password"
              value={data?.password || ""}
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
              name="address"
              value={data?.address || ""}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />

            <ButtonRegister
              type={"submit"}
              className={
                "bg-[#FF8906] py-3 px-6 w-full rounded cursor-pointer text-white"
              }
            >
              Submit
            </ButtonRegister>
          </div>
        </form>
      </div>
    </div>
  );
};
