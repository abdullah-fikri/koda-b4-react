import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2, Group } from "lucide-react";
import { SideBar } from "../components/SideBar";
import { ProductFormModal } from "../components/ProductFormModal";
import { DetailOrderModal } from "../components/DetailOrderModal";
import { useSelector } from "react-redux";
import { api } from "../utils/Fetch";

const OrderDashboard = () => {
  const [alertMessage, setAlertMessage] = useState("");
const [alertType, setAlertType] = useState("success"); 
const [showAlertBox, setShowAlertBox] = useState(false);

const showAlert = (type, message) => {
  setAlertType(type);
  setAlertMessage(message);
  setShowAlertBox(true);
  setTimeout(() => {
    setShowAlertBox(false);
  }, 3000);
};

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const itemsPerPage = 10;

  const token = useSelector((state) => state.account.token);

  const statusMapping = {
    Done: 1,
    Pending: 2,
    "On Progress": 3,
    Waiting: 4,
  };

  const statusNameMapping = {
    1: "Done",
    2: "Pending",
    3: "On Progress",
    4: "Waiting",
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let url = `/admin/orders?page=${currentPage}&limit=${itemsPerPage}`;

      if (statusFilter) {
        url += `&status=${statusFilter}`;
      }

      const res = await api(url, "GET", null, token);
      const result = await res.json();

      if (result.success) {
        setOrders(Array.isArray(result.data) ? result.data : []);
        setPagination(result.pagination);
      } else {
        console.error("Failed to fetch orders:", result.message);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders =
    orders?.filter((order) => order.id.toString().includes(searchQuery)) || [];

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const totalPages = pagination?.total_page || 1;

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

  const handlePageChange = (page) => {
    if (page !== "...") {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); 
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Progress":
        return "bg-[#FFF4E6] text-[#FF8906]";
      case "Sending Goods":
        return "bg-blue-50 text-blue-600";
      case "Done":
        return "bg-green-50 text-green-600";
      case "Pending":
        return "bg-red-200 text-red-500";
      case "Waiting":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleDetailProduct = (order) => {
    setSelectedDetail({ id: order.id, name: "Order Detail" });
    setShowDetailModal(true);
  };

  const handleDeleteClick = (order) => {
    setProductToDelete(order);
    setShowDeleteConfirm(true);
  };

  const handleEditStatus = (order) => {
    setOrderToUpdate(order);
    setNewStatus(order.status);
    setShowStatusModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!orderToUpdate || !newStatus) return;

    try {
      const statusId = statusMapping[newStatus];

      const res = await api(
        `/admin/orders/${orderToUpdate.id}/status`,
        "PUT",
        { status: statusId },
        token
      );
      const result = await res.json();

      if (result.success) {
        setShowStatusModal(false);
        setOrderToUpdate(null);
        setNewStatus("");
        showAlert("success", "update status order success")

        await fetchOrders();
      } else {
        showAlert("failed" , "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showAlert("error","Error updating status");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await api(
        `/admin/orders/${productToDelete.id}`,
        "DELETE",
        null,
        token
      );
      const result = await res.json();

      if (result.success) {
        setShowDeleteConfirm(false);
        setProductToDelete(null);

        await fetchOrders();
      } else {
        showAlert("failed","Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      showAlert("error","Error deleting order");
    }
  };

  return (
    <>
      <div className="flex mt-[76px]">
        <SideBar />
        <div className="flex-1 px-8 py-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-[#4F5665] text-2xl font-semibold">
                Order List
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <label
                  className="flex flex-col text-[#4F5665] text-xs gap-2"
                  htmlFor="status"
                >
                  Status
                  <select
                    name="status"
                    id="status"
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="border border-[#E8E8E8] rounded-md p-3 px-5 text-sm font-medium text-[#4F5665]"
                  >
                    <option value="">All</option>
                    <option value="On Progress">On Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Done">Done</option>
                    <option value="Sending Goods">Sending Goods</option>
                  </select>
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-[#4F5665] text-xs mb-2">
                  Search Order
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Order Number"
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
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-[#9CA3AF]">Loading orders...</div>
              </div>
            ) : (
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
                      No Order
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Date
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Total
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr
                        key={order.id}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                        }
                      >
                        <td className="py-4 px-5">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </td>
                        <td className="py-4 px-4 text-[#4F5665] text-sm">
                          #{order.invoice}
                        </td>
                        <td className="py-4 px-4 text-[#4F5665] text-sm">
                          {formatDate(order.date)}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-[#4F5665] text-sm">
                          IDR {formatRupiah(order.total)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {/* <button
                              className="text-[#FF8906] hover:text-[#E67A05]"
                              onClick={() => handleDetailProduct(order)}
                              title="View Details"
                            >
                              <Group size={18} />
                            </button> */}
                            <button
                              onClick={() => handleEditStatus(order)}
                              className="text-gray-400 hover:text-gray-600"
                              title="Edit Status"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(order)}
                              className="text-[#FF3B30] hover:text-[#E62E24]"
                              title="Delete Order"
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
                        colSpan="6"
                        className="py-8 text-center text-[#9CA3AF] text-sm"
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-[#9CA3AF] text-sm">
                Show {filteredOrders.length} order of {pagination.total_items}{" "}
                orders
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-[#4F5665] text-sm disabled:text-[#9CA3AF] hover:text-gray-400 transition-colors disabled:cursor-not-allowed"
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
                        ? "bg-blue-600 text-white"
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
                    setCurrentPage(
                      Math.min(pagination.total_page, currentPage + 1)
                    )
                  }
                  disabled={currentPage === pagination.total_page}
                  className="px-3 py-1.5 text-[#4F5665] text-sm disabled:text-[#9CA3AF] hover:text-gray-400 transition-colors disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <DetailOrderModal
        isOpen={showDetailModal}
        product={selectedDetail}
        onClose={() => setShowDetailModal(false)}
      />

      {/* Update Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-xl font-semibold text-[#4F5665] mb-4">
              Update Order Status
            </h3>
            <p className="text-[#9CA3AF] mb-2 text-sm">
              Order #{orderToUpdate?.invoice}
            </p>

            <div className="mb-6">
              <label className="block text-[#4F5665] text-sm font-medium mb-2">
                Select New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4F5665] focus:outline-none focus:border-[#FF8906]"
              >
                <option value="">Select Status</option>
                <option value="Done">Done</option>
                <option value="Pending">Pending</option>
                <option value="On Progress">On Progress</option>
                <option value="Waiting">Waiting</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setOrderToUpdate(null);
                  setNewStatus("");
                }}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-[#4F5665] text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={!newStatus}
                className="px-5 py-2.5 bg-[#FF8906] text-white rounded-lg text-sm font-medium hover:bg-[#E67A05] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-xl font-semibold text-[#4F5665] mb-3">
              Delete Order
            </h3>
            <p className="text-[#9CA3AF] mb-6">
              Are you sure you want to delete order #{productToDelete?.id}? This
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
      {showAlertBox && (
        <div
          className={`
      fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-sm font-medium z-50
      ${
        alertType === "success"
          ? "bg-green-100 text-green-700 border border-green-300"
          : ""
      }
      ${
        alertType === "error"
          ? "bg-red-100 text-red-700 border border-red-300"
          : ""
      }
    `}
        >
          {alertMessage}
        </div>
      )}
    </>
  );
};

export default OrderDashboard;
