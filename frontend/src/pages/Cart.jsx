import React, { useEffect, useState } from "react";
import api from "../api/Api.js";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data.cart || null);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to load cart");
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, type) => {
    try {
      if (type === "increase") {
        await api.post(
          "/cart/addToCart",
          { productId, quantity: 1 },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await api.patch(
          "/cart/decreaseCartQuantity",
          { productId, quantity: 1 },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.patch(
        "/cart/decreaseCartQuantity",
        { productId, quantity: 999999 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to remove item");
    }
  };

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    return sum + price * Number(item.quantity || 0);
  }, 0);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-40 rounded bg-gray-200" />
          <div className="h-40 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!cart || cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-3 text-gray-600">Add some products to continue shopping.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.product?._id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row"
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="h-28 w-full rounded-xl object-cover md:w-28"
              />

              <div className="flex flex-1 flex-col justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.product?.name}</h2>
                  <p className="mt-1 text-red-500 font-bold">
                    ₹{Number(item.product?.price || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.product?._id, "decrease")}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-xl"
                  >
                    -
                  </button>
                  <span className="min-w-7.5 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product?._id, "increase")}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end">
                <p className="text-lg font-bold text-gray-800">
                  ₹{(Number(item.product?.price || 0) * Number(item.quantity || 0)).toLocaleString("en-IN")}
                </p>
                <button
                  onClick={() => removeItem(item.product?._id)}
                  className="mt-3 text-sm font-medium text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

          <div className="mt-5 space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;