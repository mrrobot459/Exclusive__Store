import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Choose an action below</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Link
          to="/admin/users"
          className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:border-red-500 hover:shadow-md"
        >
          <div className="mb-4 text-5xl">👥</div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
        </Link>

        <Link
          to="/admin/products"
          className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:border-red-500 hover:shadow-md"
        >
          <div className="mb-4 text-5xl">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
