import React, { useEffect, useState } from "react";
import api from "../api/Api.js";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/order", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Login required</h1>
        <p className="mt-3 text-gray-600">Please sign in to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="animate-pulse h-16 rounded-xl bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">My Orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">No orders yet</h2>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-semibold text-gray-800">Order #{order._id?.slice(-6)}</p>
                <p className="text-sm font-medium text-red-500">
                  {order.orderStatus || order.status || "Processing"}
                </p>
              </div>

              <div className="mt-3 space-y-2 text-gray-600">
                <p>Payment: {order.paymentMethod || "COD"}</p>
                <p>Items: {order.items?.length || 0}</p>
                <p>Total: ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
