/**
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.formData - Current form data containing product fields.
 * @returns {JSX.Element | null} The product form modal component.
 *
 *
 */

import React from "react";
import { X, Image as ImageIcon, Trash2 } from "lucide-react";

export const ProductFormModal = ({
  isOpen,
  isEdit,
  onClose,
  formData,
  setFormData,
  onSave,
}) => {
  const sizeOptions = ["R", "L", "XL", "250gr", "500gr"];

  const handleSizeToggle = (size) => {
    if (formData.size.includes(size)) {
      setFormData({
        ...formData,
        size: formData.size.filter((s) => s !== size),
      });
    } else {
      setFormData({ ...formData, size: [...formData.size, size] });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-[480px] h-full overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#4F5665]">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Photo Product */}
          <div className="mb-6">
            <label className="block text-[#4F5665] font-medium mb-3">
              Photo Product
            </label>
            {isEdit && formData.image ? (
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={formData.image}
                  alt="Product"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <ImageIcon size={24} className="text-gray-400" />
              </div>
            )}
            <button className="bg-[#FF8906] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#E67A05]">
              Upload
            </button>
          </div>

          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-[#4F5665] font-medium mb-2">
              Product name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4F5665] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8906]"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-[#4F5665] font-medium mb-2">
              Price
            </label>
            <input
              type="text"
              placeholder="Enter Product Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4F5665] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8906]"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-[#4F5665] font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter Product Description"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4F5665] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8906] resize-none"
            />
          </div>

          {/* Product Size */}
          <div className="mb-6">
            <label className="block text-[#4F5665] font-medium mb-3">
              Product Size
            </label>
            <div className="flex gap-3">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    formData.size.includes(size)
                      ? "bg-[#FF8906] text-white"
                      : "bg-gray-100 text-[#4F5665] hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="mb-8">
            <label className="block text-[#4F5665] font-medium mb-2">
              Stock
            </label>
            <input
              type="text"
              placeholder="Enter Product Stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4F5665] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8906]"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={onSave}
            className="w-full bg-[#FF8906] text-white py-3 rounded-lg font-medium hover:bg-[#E67A05] transition-colors"
          >
            {isEdit ? "Edit Save" : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
};
