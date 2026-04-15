import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", role: "viewer" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  // ✅ Update role/email locally
  const handleChange = (id, field, value) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, [field]: value } : u)),
    );
  };

  // ✅ Save updated user
  const saveUser = async (user) => {
    await API.put(`/users/${user._id}`, user);
    fetchUsers();
  };

  // ✅ Delete user
  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  // ✅ Add new user
  const addUser = async () => {
    if (!newUser.email) return alert("Email required");

    await API.post("/users", newUser);
    setNewUser({ email: "", role: "viewer" });
    fetchUsers();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6">Admin Panel</h2>

      {/* ➕ Add User */}
      <div className="bg-white p-5 rounded-2xl shadow-lg mb-6 flex gap-3">
        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 rounded w-full"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="viewer">viewer</option>
          <option value="operator">operator</option>
          <option value="admin">admin</option>
        </select>

        <button
          onClick={addUser}
          className="bg-green-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* 👥 Users List */}
      <div className="bg-white p-5 rounded-2xl shadow-lg space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3"
          >
            {/* Editable Email */}
            <input
              type="text"
              value={u.email}
              className="border p-2 rounded w-full md:w-1/3"
              onChange={(e) => handleChange(u._id, "email", e.target.value)}
            />

            {/* Role Dropdown */}
            <select
              className="border p-2 rounded"
              value={u.role}
              onChange={(e) => handleChange(u._id, "role", e.target.value)}
            >
              <option value="viewer">viewer</option>
              <option value="operator">operator</option>
              <option value="admin">admin</option>
            </select>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => saveUser(u)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() => deleteUser(u._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
