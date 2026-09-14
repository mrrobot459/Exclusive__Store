import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/Api.js";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const getWishlist = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(response.data.wishlist || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleRemove = async (productId) => {
    if (!token) return;

    try {
      await api.delete(`/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to remove item");
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-gray-800">Your wishlist is empty</h2>
          <p className="mt-3 text-gray-600">
            Please log in to save and view your favourite products.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600"
          >
            Login to continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-500">
            Wishlist
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Saved Products</h1>
        </div>

        <Link
          to="/"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-500 hover:text-red-500"
        >
          Continue Shopping
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="animate-pulse rounded-2xl border border-gray-200 bg-gray-100 p-4">
              <div className="h-52 rounded-xl bg-gray-200" />
              <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">No products in wishlist yet</h3>
          <p className="mt-2 text-gray-500">Add your favourite items and they will appear here.</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600"
          >
            Explore products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3 p-4">
                <div>
                  <h3 className="line-clamp-2 text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xl font-bold text-red-500">
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex-1 rounded-lg bg-gray-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
                  >
                    View Product
                  </button>

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;