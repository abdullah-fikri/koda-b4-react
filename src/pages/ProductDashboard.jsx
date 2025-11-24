import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import { SideBar } from "../components/SideBar";
import { ProductFormModal } from "../components/ProductFormModal";
import { api } from "../utils/Fetch";
import { useSelector } from "react-redux";

const ProductDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 5;
  const token = useSelector((state) => state.account.token);

  const fetchProducts = async () => {
    try {
      const res = await api(`/admin/product?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,"GET",null,token);
      const result = await res.json();

      const mapped = result.data.map((p) => ({
        id: p.id,
        image: p.image ?? "", 
        name: p.name,
        price: (p.min_price ?? p.price)?.toLocaleString("id-ID"),
        size: p.sizes,
        desc: p.description,
        method: p.method,
        stock: p.stock,
      }));
      
      setProducts(mapped);
      setTotalPages(result.pagination.total_page);
      setTotalItems(result.pagination.total_item);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery]);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    stock: "",
    category_id: 0,
    images: [],
    variants: [],
    sizes: [],
    imageFile: null,  
  });

  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
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
      sizes: [],
      stock: "",
      category_id: 0,
      imageFile: null, 
    });
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    
    const sizeArray = product.size ? product.size.split(", ").map(sizeName => {
      const sizeMap = { "Reguler": 1, "Regular": 1, "Medium": 2, "Large": 3 };
      return { size_id: sizeMap[sizeName] || 1, price: 0 };
    }) : [];
    
    setFormData({
      name: product.name,
      price: product.price,
      desc: product.desc,
      sizes: sizeArray,
      stock: product.stock.toString(),
      category_id: 0,
      imageFile: null,
      image: product.image,
    });
    setShowEditModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      if (!formData.name || !formData.desc || !formData.stock || !formData.category_id) {
        return;
      }

      if (formData.sizes.length === 0 && !formData.price) {
        return;
      }

      const minPrice =
        formData.sizes.length > 0
          ? Math.min(...formData.sizes.map((s) => Number(s.price)))
          : Number(formData.price);
  
      const body = {
        name: formData.name,
        description: formData.desc,
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
        min_price: minPrice,
        sizes: formData.sizes.map((s) => ({
          size_id: Number(s.size_id),
          price: Number(s.price),
        })),
      };
  
      const res = await api("/admin/product-create", "POST", body, token);
      const result = await res.json();
  
      if (!result.success) {
        return;
      }
  
      const productId = result.data?.id;
      
      if (productId && formData.imageFile instanceof File) {
        const uploadResult = await uploadProductImage(productId, formData.imageFile);
        if (!uploadResult.success) {
          return
        }
      }      
      setShowAddModal(false);
      fetchProducts(); 
    } catch (error) {
      console.error("Error save product:", error);
    }
  };
  
  const uploadProductImage = async (productId, file) => {
    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);
  
      const baseURL = import.meta.env.VITE_BASE_URL
      const res = await fetch(`${baseURL}/admin/product/${productId}/pictures`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formDataImg,
      });

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (!formData.name || !formData.desc || !formData.stock || !formData.category_id) {
        return;
      }

      if (formData.sizes.length === 0 && !formData.price) {
        return;
      }

      const body = {
        name: formData.name,
        description: formData.desc,
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
        images: [],
        variants: [],
        sizes: formData.sizes.map((s) => ({
          size_id: Number(s.size_id),
          price: Number(s.price),
        })),
      };

      const res = await api(`/admin/product/${selectedProduct.id}`, "PUT", body, token);
      const result = await res.json();

      if (formData.imageFile instanceof File) {
        const uploadResult = await uploadProductImage(selectedProduct.id, formData.imageFile);
        if (!uploadResult.success) {
          console.log("Product updated but image upload failed: " + uploadResult.message);
        } else {
          console.log("Product and image updated successfully!");
        }
      } else {
        console.log("Product updated successfully!");
      }

      setShowEditModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await api(`/admin/product/${productToDelete.id}`, "DELETE", null, token);
      const result = await res.json();

      if (!result.success) {
        return;
      }
      setShowDeleteConfirm(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
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
        <div className="flex-1 px-8 py-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-[#4F5665] text-2xl font-semibold">
                Product List
              </h1>
              <button
                onClick={handleAddProduct}
                className="bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#E67A05] transition-colors"
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

              <button className="mt-6 bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#E67A05] transition-colors">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

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
                {products.length > 0 ? (
                  products.map((product, index) => (
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
                        {product.size}
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

          {/* paginasi */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-[#9CA3AF] text-sm">
              Show {products.length} product of {totalItems} product
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

      {/* modals */}
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