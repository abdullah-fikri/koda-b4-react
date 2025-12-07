import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import { SideBar } from "../components/SideBar";
import UserFormModal from "../components/UserFormModal";
import { useSelector } from "react-redux";
import { api } from "../utils/Fetch";

const UsersDashboard = () => {
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const itemsPerPage = 10;

  const token = useSelector((state) => state.account.token);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    profile_picture: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);
  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });

    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 2500);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const url = `/admin/user?page=${currentPage}&limit=${itemsPerPage}`;

      const res = await api(url, "GET", null, token);
      const result = await res.json();

      if (result.success) {
        setUsers(Array.isArray(result.data) ? result.data : []);
        setPagination(result.pagination);
      } else {
        console.error("Failed to fetch users:", result.message);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers =
    users?.filter((user) =>
      user.username?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

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

  const handleAddUser = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      profile_picture: "",
      role: "user",
    });
    setShowAddModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profile_picture: user.profile_picture,
      role: user.role,
      password: "",
    });
    setShowEditModal(true);
  };

  const handleSaveUser = async () => {
    try {
      const body = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        phone: formData.phone,
        address: formData.address,
        profile_picture: formData.profile_picture,
        role: formData.role,
      };

      const res = await api("/auth/register", "POST", body);
      const result = await res.json();

      if (result.success) {
        setShowAddModal(false);
        await fetchUsers();
        showAlert("success", "User added successfully");
      } else {
        showAlert("error", result.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const body = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        profile_picture: formData.profile_picture,
        role: formData.role,
      };

      if (formData.password) {
        body.password = formData.password;
      }

      const res = await api(
        `/admin/${selectedUser.id}/update`,
        "PUT",
        body,
        token
      );
      const result = await res.json();

      if (result.success) {
        setShowEditModal(false);
        await fetchUsers();
        showAlert("success", "User updated successfully");
      } else {
        showAlert("error", result.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showAlert("Error", "Error updating user");
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  // const handleConfirmDelete = async () => {
  //   try {
  //     const res = await api(`/users/${userToDelete.id}`, "DELETE", null, token);
  //     const result = await res.json();

  //     if (result.success) {
  //       setShowDeleteConfirm(false);
  //       setUserToDelete(null);

  //       await fetchUsers();
  //     } else {
  //       alert(result.message || "Failed to delete user");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     alert("Error deleting user");
  //   }
  // };

  const handlePageChange = (page) => {
    if (page !== "...") {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="flex mt-[76px]">
        <SideBar />
        <div className="flex-1 px-8 py-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-[#4F5665] text-2xl font-semibold">
                User List
              </h1>
              <button
                onClick={handleAddUser}
                className="bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-950 transition-colors"
              >
                <Plus size={18} />
                Add Users
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <label className="text-[#4F5665] text-xs mb-2">
                  Search User
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Username"
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

          {/* Table */}
          <div className="bg-white rounded-xl overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-[#9CA3AF]">Loading users...</div>
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
                      Image
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Username
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Email
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Phone
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Address
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Role
                    </th>
                    <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user.id}
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
                        <td className="py-4 px-4">
                          <img
                            src={
                              user.profile_picture ||
                              `https://ui-avatars.com/api/?name=${user.username}&background=blue&color=fff`
                            }
                            alt={user.username}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=FF8906&color=fff`;
                            }}
                          />
                        </td>
                        <td className="py-4 px-4 text-[#4F5665] text-sm">
                          {user.username}
                        </td>
                        <td className="py-4 px-4 text-[#4F5665] text-sm">
                          {user.email}
                        </td>
                        <td className="py-4 px-4 text-[#4F5665] text-sm">
                          {user.phone}
                        </td>
                        <td className="py-4 px-4 text-[#9CA3AF] text-xs max-w-[150px]">
                          {user.address?.length > 40
                            ? user.address.substring(0, 40) + "..."
                            : user.address}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Edit User"
                            >
                              <Edit2 size={18} />
                            </button>
                            {/* <button
                              onClick={() => handleDeleteClick(user)}
                              className="text-[#FF3B30] hover:text-[#E62E24] transition-colors"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-8 text-center text-[#9CA3AF] text-sm"
                      >
                        No users found
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
                Show {filteredUsers.length} users of {pagination.total_items}{" "}
                users
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
                        ? "bg-[#1D4ED8] text-white"
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
                  className="px-3 py-1.5 text-[#4F5665] text-sm disabled:text-[#9CA3AF] hover:text-blue-500 transition-colors disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <UserFormModal
        isOpen={showAddModal}
        isEdit={false}
        onClose={() => setShowAddModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveUser}
      />
      <UserFormModal
        isOpen={showEditModal}
        isEdit={true}
        onClose={() => setShowEditModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleUpdateUser}
      />

      {/* Delete Modal */}
      {/* {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-xl font-semibold text-[#4F5665] mb-3">
              Delete User
            </h3>
            <p className="text-[#9CA3AF] mb-6">
              Are you sure you want to delete "{userToDelete?.username}"? This
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
        </div> */}
      {/* )} */}
      {alert.show && (
        <div
          className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium z-9999 transition-all ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alert.message}
        </div>
      )}
    </>
  );
};

export default UsersDashboard;
