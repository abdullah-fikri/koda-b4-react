import React, { useState } from "react";
import { Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import { SideBar } from "../components/SideBar";
import { ProductFormModal } from "../components/ProductFormModal";

const ProductDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const itemsPerPage = 5;

  const [products, setProducts] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop",
      name: "Caramel Machiato",
      price: "40.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
      size: ["R", "L", "XL", "250gr"],
      method: "Deliver, Dine In",
      stock: 200,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=100&h=100&fit=crop",
      name: "Hazelnut Latte",
      price: "40.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
      size: ["R", "L", "XL", "250gr"],
      method: "Deliver, Dine In",
      stock: 200,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100&h=100&fit=crop",
      name: "Kopi Susu",
      price: "40.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
      size: ["R", "L", "XL", "250gr"],
      method: "Dine In",
      stock: 200,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=100&h=100&fit=crop",
      name: "Espresso Supreme",
      price: "40.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
      size: ["R", "L", "XL", "250gr"],
      method: "Deliver",
      stock: 200,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=100&h=100&fit=crop",
      name: "Caramel Velvet Latte",
      price: "40.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
      size: ["R", "L", "XL", "250gr"],
      method: "Deliver, Dine In",
      stock: 200,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop",
      name: "Vanilla Latte",
      price: "35.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor.",
      size: ["R", "L"],
      method: "Deliver, Dine In",
      stock: 150,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop",
      name: "Americano",
      price: "30.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor.",
      size: ["R", "L", "XL"],
      method: "Dine In",
      stock: 180,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=100&h=100&fit=crop",
      name: "Cappuccino",
      price: "38.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor.",
      size: ["R", "L", "XL"],
      method: "Deliver, Dine In",
      stock: 120,
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=100&h=100&fit=crop",
      name: "Mocha",
      price: "42.000",
      desc: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor.",
      size: ["R", "L", "XL", "250gr"],
      method: "Deliver",
      stock: 90,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    size: [],
    stock: "",
    image: "",
  });

  // Filter search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // nomor page
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handleAddProduct = () => {
    setFormData({
      name: "",
      price: "",
      desc: "",
      size: [],
      stock: "",
      image: "",
    });
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      desc: product.desc,
      size: product.size,
      stock: product.stock.toString(),
      image: product.image,
    });
    setShowEditModal(true);
  };

  const handleSaveProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      price: formData.price,
      desc: formData.desc,
      size: formData.size,
      method: "Deliver, Dine In",
      stock: parseInt(formData.stock),
      image: formData.image || "foto product",
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id
        ? {
            ...p,
            name: formData.name,
            price: formData.price,
            desc: formData.desc,
            size: formData.size,
            stock: parseInt(formData.stock),
            image: formData.image,
          }
        : p
    );
    setProducts(updatedProducts);
    setShowEditModal(false);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete.id));
    setShowDeleteConfirm(false);
    setProductToDelete(null);

    if (currentProducts.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    if (page !== "...") {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex mt-[76px]">
        <SideBar />
        <div className="flex-1  px-8 py-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col items-center gap-6 ">
              <h1 className="text-[#4F5665] text-2xl font-semibold">
                Product List
              </h1>
              <button
                onClick={handleAddProduct}
                className="bg-[#FF8906] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#E67A05] transition-colors"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <label className="text-[#4F5665] text-xs mb-2">
                  Search Product
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-[320px] px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm text-[#4F5665] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8906]"
                  />
                  <Search
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                    size={18}
                  />
                </div>
              </div>

              <button className="mt-6 bg-[#FF8906] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#E67A05] transition-colors">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {/*  Table */}
          <div className="bg-white rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-5 w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Image
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Product Name
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Price
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Desc
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Product Size
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Method
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Stock
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
                    >
                      <td className="py-4 px-5">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="py-4 px-4 text-[#4F5665] text-sm">
                        {product.name}
                      </td>
                      <td className="py-4 px-4 text-[#4F5665] text-sm">
                        IDR {product.price}
                      </td>
                      <td className="py-4 px-4 text-[#9CA3AF] text-xs max-w-[150px]">
                        {product.desc.substring(0, 40)}...
                      </td>
                      <td className="py-4 px-4 text-[#4F5665] text-sm">
                        {product.size.join(", ")}
                      </td>
                      <td className="py-4 px-4 text-[#4F5665] text-sm">
                        {product.method}
                      </td>
                      <td className="py-4 px-4 text-[#4F5665] text-sm">
                        {product.stock}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-[#FF8906] hover:text-[#E67A05] transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="text-[#FF3B30] hover:text-[#E62E24] transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="py-8 text-center text-[#9CA3AF] text-sm"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-[#9CA3AF] text-sm">
              Show {currentProducts.length} product of {filteredProducts.length}{" "}
              product
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-[#4F5665] text-sm disabled:text-[#9CA3AF] hover:text-[#FF8906] transition-colors disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  disabled={page === "..."}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#FF8906] text-white"
                      : page === "..."
                      ? "text-[#9CA3AF] cursor-default"
                      : "text-[#4F5665] hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-[#4F5665] text-sm disabled:text-[#9CA3AF] hover:text-[#FF8906] transition-colors disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={showAddModal}
        isEdit={false}
        onClose={() => setShowAddModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveProduct}
      />
      <ProductFormModal
        isOpen={showEditModal}
        isEdit={true}
        onClose={() => setShowEditModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleUpdateProduct}
      />

      {/* Delete konfirmasi Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-xl font-semibold text-[#4F5665] mb-3">
              Delete Product
            </h3>
            <p className="text-[#9CA3AF] mb-6">
              Are you sure you want to delete "{productToDelete?.name}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-[#4F5665] text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 bg-[#FF3B30] text-white rounded-lg text-sm font-medium hover:bg-[#E62E24] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDashboard;
