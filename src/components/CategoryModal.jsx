import React, { useState, useEffect } from "react";
import { Trash2, X } from "lucide-react";

export const CategoryModal = ({
  isOpen,
  mode,
  category,
  categories,
  onClose,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (mode === "edit" && category) {
      setName(category.name);
    } else if (mode === "add") {
      setName("");
    }
  }, [mode, category]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (mode === "add") onAdd(name);
    if (mode === "edit") onEdit(category.Id, name);
  };

  const handleConfirmDelete = () => {
    const categoryId = category.Id || category.id;
    onDelete(categoryId);
  };

  const handleDeleteClick = (categoryToDelete) => {
    onDelete(categoryToDelete.Id || categoryToDelete.id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* list */}
        {mode === "list" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#4F5665]">
              Category List
            </h2>

            <div className="max-h-[300px] overflow-y-auto">
              {categories.map((c) => (
                <div
                  key={c.Id || c.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <p className="text-sm text-[#4F5665]">{c.name}</p>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() => onEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition-colors"
                      onClick={() => handleDeleteClick(c)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                onClick={() => onAdd()}
              >
                Add Category
              </button>
            </div>
          </div>
        )}

        {/* add/edit */}
        {(mode === "add" || mode === "edit") && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#4F5665]">
              {mode === "add" ? "Add Category" : "Edit Category"}
            </h2>

            <label className="text-sm text-gray-600">Category Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                {mode === "add" ? "Add" : "Save"}
              </button>
            </div>
          </div>
        )}

        {/* delete */}
        {/* {mode === "delete" && (
          <div>
            <h2 className="text-xl font-semibold text-[#4F5665] mb-4">
              Delete Category
            </h2>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete the category "
              <span className="font-medium">{category?.name}</span>"?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};