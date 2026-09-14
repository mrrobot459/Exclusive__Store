import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api.js";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", form);
      const token = response.data?.token;

      if (!token) {
        throw new Error("Token missing");
      }

      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role !== "admin") {
        setError("This account is not an admin account.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("authStateChanged"));
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
        <p className="mt-2 text-gray-600">Sign in to manage users and products</p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Admin email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white disabled:bg-red-300"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
