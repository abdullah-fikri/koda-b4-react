/**
 * UserFormModal component renders a modal form for creating or editing a user.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Object} props.formData - Current form data for the user
 * @returns {JSX.Element|null} The rendered user form modal or null if closed
 */

import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";

const UserFormModal = ({
  isOpen,
  isEdit,
  onClose,
  formData,
  setFormData,
  onSave,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="flex-1" onClick={onClose}></div>

      <div className="w-[480px] bg-white h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? formData.name : "Insert User"}
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Image User
            </label>
            <div className="flex flex-col items-start gap-3">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                  <Upload className="text-gray-400" size={24} />
                </div>
              )}
              <label className="bg-[#FF8906] hover:bg-[#E67A05] text-white px-6 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium">
                Upload
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Full Name"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#FF8906] focus:border-[#FF8906] outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#FF8906] focus:border-[#FF8906] outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Phone
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Your Number"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#FF8906] focus:border-[#FF8906] outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              {isEdit && (
                <button className="text-[#FF8906] text-sm hover:underline font-medium">
                  Set New Password
                </button>
              )}
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Your Password"
                className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#FF8906] focus:border-[#FF8906] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Address
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Your Address"
                rows="3"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#FF8906] focus:border-[#FF8906] outline-none resize-none"
              />
            </div>
          </div>

          {!isEdit && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Type of User
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      userType: "Normal User",
                    }))
                  }
                  className={`flex-1 py-2.5 px-4 rounded-md border transition-colors text-sm font-medium ${
                    formData.userType === "Normal User"
                      ? "border-[#FF8906] bg-orange-50 text-[#FF8906]"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  Normal User
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, userType: "Admin" }))
                  }
                  className={`flex-1 py-2.5 px-4 rounded-md border transition-colors text-sm font-medium ${
                    formData.userType === "Admin"
                      ? "border-[#FF8906] bg-orange-50 text-[#FF8906]"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          )}

          <button
            onClick={onSave}
            className="w-full bg-[#FF8906] hover:bg-[#E67A05] text-white py-3 rounded-md font-medium transition-colors mt-6"
          >
            {isEdit ? "Update" : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
