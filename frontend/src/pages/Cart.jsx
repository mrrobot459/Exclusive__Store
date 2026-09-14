import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api.js";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  paymentMethod: "COD",
};

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

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

      await fetchCart();
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
      await fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to remove item");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    const { fullName, phone, address, city, state, pincode, paymentMethod } = form;

    if (!fullName || !phone || !address || !city || !state || !pincode) {
      setError("Please fill in all delivery details");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const items = cart.items.map((item) => ({
        product: item.product?._id,
        quantity: Number(item.quantity || 1),
        price: Number(item.product?.price || 0),
      }));

      const response = await api.post(
        "/order/addOrder",
        {
          items,
          totalAmount: total,
          shippingAddress: { fullName, phone, address, city, state, pincode },
          paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.success) {
        setCheckout(false);
        setForm(initialForm);
        setCart(null);
        window.dispatchEvent(new Event("cartUpdated"));
        navigate("/order");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    return sum + price * Number(item.quantity || 0);
  }, 0);
  const shipping = subtotal > 0 ? (subtotal >= 1500 ? 0 : 49) : 0;
  const discount = subtotal >= 3000 ? 200 : 0;
  const total = Math.max(subtotal + shipping - discount, 0);

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
          <h2 className="text-xl font-bold text-gray-900">Bill Summary</h2>

          <div className="mt-5 space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{discount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {!checkout ? (
            <button
              onClick={() => setCheckout(true)}
              className="mt-6 w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              Proceed to Checkout
            </button>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="space-y-3">
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="rounded-lg border border-gray-300 px-3 py-2"
                  />
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="RAZORPAY">Razorpay</option>
                </select>
              </div>

              <button
                onClick={handleCheckout}
                disabled={submitting}
                className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;