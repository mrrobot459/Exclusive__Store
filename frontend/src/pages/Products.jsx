import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import api from "../api/Api.js";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const [productsResponse, latestResponse] = await Promise.all([
        api.get("/product"),
        api.get("/product/latest")
      ]);

      setProducts(productsResponse.data.products || []);
      setLatestProducts(latestResponse.data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    if (!token) {
      setWishlistIds([]);
      return;
    }

    try {
      const response = await api.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const ids = (response.data.wishlist || []).map((item) => item._id || item);
      setWishlistIds(ids);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [token]);

  const toggleWishlist = async (productId, event) => {
    if (event) {
      event.stopPropagation();
    }

    if (!token) {
      window.alert("Please login to add products to wishlist");
      navigate("/login");
      return;
    }

    const isSaved = wishlistIds.includes(productId);

    try {
      if (isSaved) {
        await api.delete(`/wishlist/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post(`/wishlist/add/${productId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setWishlistIds((prev) =>
        isSaved
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    } catch (error) {
      console.error(error);
      window.alert(error.response?.data?.message || "Unable to update wishlist");
    }
  };

  const addToCart = async (productId) => {
    if (!token) {
      window.alert("Please login to add products to cart");
      return;
    }

    try {
      await api.post(
        "/cart/addToCart",
        { productId, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.dispatchEvent(new Event("cartUpdated"));
      window.alert("Product added to cart");
    } catch (error) {
      console.error(error);
      window.alert(error.response?.data?.message || "Unable to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse rounded-2xl border border-gray-200 bg-gray-100 p-4">
              <div className="h-52 rounded-xl bg-gray-200" />
              <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-500">Products</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">All Products</h1>
        </div>
      </div>

      {latestProducts.length > 0 && (
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestProducts.slice(0, 4).map((product) => {
              const isSaved = wishlistIds.includes(product._id);

              return (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <button
                    type="button"
                    onClick={(event) => toggleWishlist(product._id, event)}
                    className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md"
                  >
                    <FaHeart className={isSaved ? "text-red-500" : "text-gray-400"} size={18} />
                  </button>

                  <div className="h-52 overflow-hidden bg-gray-100">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  </div>

                  <div className="space-y-3 p-4">
                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-xl font-bold text-red-500">₹{Number(product.price || 0).toLocaleString("en-IN")}</p>

                    <div className="flex gap-2">
                      <Link
                        to={`/product/${product._id}`}
                        className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-700"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const isSaved = wishlistIds.includes(product._id);

          return (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <button
                type="button"
                onClick={(event) => toggleWishlist(product._id, event)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md"
              >
                <FaHeart className={isSaved ? "text-red-500" : "text-gray-400"} size={18} />
              </button>

              <div className="h-52 overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>

              <div className="space-y-3 p-4">
                <h3 className="line-clamp-2 text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-xl font-bold text-red-500">₹{Number(product.price || 0).toLocaleString("en-IN")}</p>

                <div className="flex gap-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-700"
                  >
                    View Product
                  </Link>
                  <button
                    type="button"
                    onClick={() => addToCart(product._id)}
                    className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
