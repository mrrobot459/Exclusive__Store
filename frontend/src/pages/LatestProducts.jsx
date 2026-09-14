import React, { useEffect, useState } from "react";
import api from "../api/Api.js";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await api.get("/product/latest");
                console.log("latest" . response)

        setProducts(response.data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse rounded-2xl bg-gray-200 h-60" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-500">Latest</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">New Arrivals</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product._id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img src={product.image} alt={product.name} className="h-52 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="mt-2 text-red-500 font-bold">₹{Number(product.price || 0).toLocaleString("en-IN")}</p>
              <Link to={`/product/${product._id}`} className="mt-4 inline-block text-sm font-medium text-red-500 hover:underline">
                View product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
