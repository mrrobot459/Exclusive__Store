import React, { useEffect, useState } from "react";
import api from "../api/Api.js";

const emptyForm = {
  email: "",
  password: "",
  role: "user",
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      let response;

      try {
        response = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        response = await api.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const allUsers = response.data.users || [];
      const loggedUser = JSON.parse(localStorage.getItem("user") || "null");

      const filteredUsers = allUsers.filter((user) => {
        if (!loggedUser?.email) return true;
        return user.email?.toLowerCase() !== loggedUser.email.toLowerCase();
      });

      setUsers(filteredUsers);
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingUser(null);
    setIsCreating(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const payload = {
        email: form.email,
        role: form.role,
      };

      if (form.password.trim()) {
        payload.password = form.password;
      }

      if (editingUser) {
        await api.put(`/user/update/${editingUser._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/user/create", {
          ...payload,
          password: form.password,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      resetForm();
      await fetchUsers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUsers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to delete user");
    }
  };

  const openCreateForm = () => {
    resetForm();
    setIsCreating(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setIsCreating(false);
    setForm({
      email: user.email || "",
      password: "",
      role: user.role || "user",
    });
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading users...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <button
          onClick={openCreateForm}
          className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
        >
          + Add User
        </button>
      </div>

      {(isCreating || editingUser) && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {editingUser ? "Edit User" : "Create User"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="rounded-lg border border-gray-300 px-3 py-2"
              required
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={editingUser ? "New password (optional)" : "Password"}
              className="rounded-lg border border-gray-300 px-3 py-2"
              required={!editingUser}
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="md:col-span-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white disabled:bg-red-300"
              >
                {saving ? "Saving..." : editingUser ? "Update User" : "Create User"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t border-gray-200">
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role || "user"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditForm(user)}
                        className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;