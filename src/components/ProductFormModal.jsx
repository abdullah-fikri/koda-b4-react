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
  const sizeOptions = [
    { id: 1, label: "Reguler" },
    { id: 2, label: "Medium" },
    { id: 3, label: "Large" },
  ];

  const categoryOptions = [
    { id: 1, label: "Tea" },
    { id: 2, label: "Mocktail" },
    { id: 3, label: "Smoothies" },
    { id: 4, label: "Milk Based" },
    { id: 5, label: "Snacks" },
  ];

  const handleCategorySelect = (categoryId) => {
    setFormData({ ...formData, category_id: categoryId });
  };

  const handleSizeToggle = (sizeObj) => {
    const exists = formData.sizes.some((s) => s.size_id === sizeObj.id);

    if (exists) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s.size_id !== sizeObj.id),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, { size_id: sizeObj.id, price: 0 }],
      });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageFile: null, currentImage: null });
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
            
            <div className="mb-3">
              {formData.imageFile ? (
                <div className="relative inline-block">
                  <img
                    src={URL.createObjectURL(formData.imageFile)}
                    alt="Preview"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : isEdit && formData.currentImage ? (
                <div className="relative inline-block">
                  <img
                    src={formData.currentImage}
                    alt="Current"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
                  <ImageIcon size={32} className="text-gray-400" />
                </div>
              )}
            </div>

            <label className="bg-[#1D4ED8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#E67A05] cursor-pointer inline-block">
              {formData.imageFile || formData.currentImage ? "Change Image" : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData({ ...formData, imageFile: file });
                  }
                }}
              />
            </label>
            {isEdit && !formData.imageFile && (
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to keep current image
              </p>
            )}
          </div>

          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-[#4F5665] font-medium mb-2">
              Product name <span className="text-red-500">*</span>
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

          {/* Description */}
          <div className="mb-6">
            <label className="block text-[#4F5665] font-medium mb-2">
              Description <span className="text-red-500">*</span>
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
              Product Size <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {sizeOptions.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleSizeToggle(size)}
                  type="button"
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    formData.sizes.some((s) => s.size_id === size.id)
                      ? "bg-[#FF8906] text-white"
                      : "bg-gray-100 text-[#4F5665] hover:bg-gray-200"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* price  */}
          {formData.sizes.length > 0 && (
            <div className="mb-6 mt-4">
              <label className="block text-[#4F5665] font-medium mb-3">
                Price per Size <span className="text-red-500">*</span>
              </label>

              {formData.sizes.map((s, idx) => (
                <div key={s.size_id} className="flex items-center gap-4 mb-3">
                  <span className="w-24 text-[#4F5665] font-medium">
                    {sizeOptions.find((size) => size.id === s.size_id)?.label}
                  </span>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={s.price || ""}
                    onChange={(e) => {
                      const updated = [...formData.sizes];
                      updated[idx].price = Number(e.target.value);
                      setFormData({ ...formData, sizes: updated });
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4F5665] focus:outline-none focus:border-[#FF8906]"
                  />
                </div>
              ))}
            </div>
          )}

          {/* stock */}
          <div className="mb-6">
            <label className="block text-[#4F5665] font-medium mb-2">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Product Stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4F5665] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8906]"
            />
          </div>

          {/* category */}
          <div className="mb-8">
            <label className="block text-[#4F5665] font-medium mb-3">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  type="button"
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    formData.category_id === cat.id
                      ? "bg-[#1D4ED8] text-white"
                      : "bg-gray-100 text-[#4F5665] hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* sv btn */}
          <button
            onClick={onSave}
            className="w-full bg-[#FF8906] text-white py-3 rounded-lg font-medium hover:bg-[#E67A05] transition-colors"
          >
            {isEdit ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
};