import React, { useState } from "react";
import { Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import { SideBar } from "../components/SideBar";
import UserFormModal from "../components/UserFormModal";

const UsersDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const itemsPerPage = 5;

  const [users, setUsers] = useState([
    {
      id: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      name: "Eleanor Pena",
      phone: "(211)9073232",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480",
      name: "Rodald James",
      phone: "(211)9073232",
      address: "       3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064",
      name: "Angela Renata",
      phone: "(211)9073232",
      address: "   3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1061",
      name: "Princess Lylia",
      phone: "(211)9073232",
      address: "       3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=986",
      name: "Angelina Rodyrigo",
      phone: "(211)9073232",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
      name: "Natasha",
      phone: "(211)9073232",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=989",
      name: "Josph Murphy",
      phone: "(299)9890989",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 8,
      image:
        "https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
      name: "Princessa Dwsys",
      phone: "(299)9890989",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      name: "Ixia Murc'",
      phone: "(211)9073232",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    image: "",
    userType: "Normal User",
  });

  // Filter search
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleAddUser = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      image: "",
      userType: "Normal User",
    });
    setShowAddModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      address: user.address,
      image: user.image,
    });
    setShowEditModal(true);
  };

  const handleSaveUser = () => {
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
      image:
        formData.image || "https://i.pravatar.cc/150?img=" + (users.length + 1),
      userType: formData.userType,
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id
        ? {
            ...u,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            address: formData.address,
            image: formData.image,
            userType: formData.userType,
          }
        : u
    );
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setShowDeleteConfirm(false);
    setUserToDelete(null);
    if (currentUsers.length === 1 && currentPage > 1) {
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
                User List
              </h1>
              <button
                onClick={handleAddUser}
                className="bg-[#FF8906] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#E67A05] transition-colors"
              >
                <Plus size={18} />
                Add Users
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

          {/*  table */}
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
                    Full Name
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    phone
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    address
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    email
                  </th>
                  <th className="text-left py-4 px-4 text-[#9CA3AF] font-medium text-xs">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr
                      key={user.id}
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
                          src={user.image}
                          alt={user.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="py-4 px-4 text-[#4F5665] text-sm">
                        {user.name}
                      </td>
                      <td className="py-4 px-4 text-[#4F5665] text-sm">
                        {user.phone}
                      </td>
                      <td className="py-4 px-4 text-[#9CA3AF] text-xs max-w-[150px]">
                        {user.address.substring(0, 40)}...
                      </td>
                      <td className="py-4 px-4 text-[#4F5665] text-sm">
                        {user.email}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-[#FF8906] hover:text-[#E67A05] transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
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
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-[#9CA3AF] text-sm">
              Show {currentUsers.length} users of {filteredUsers.length} users
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

      {/* delete konfirmasi Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-xl font-semibold text-[#4F5665] mb-3">
              Delete Product
            </h3>
            <p className="text-[#9CA3AF] mb-6">
              Are you sure you want to delete "{userToDelete?.name}"? This
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

export default UsersDashboard;
