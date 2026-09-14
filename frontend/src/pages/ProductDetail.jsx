import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/Api.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data.product || null);
        console.log("product" . response)
      } catch (error) {
        const status = error.response?.status;

        if (status === 404 || status === 400) {
          try {
            const latestResponse = await api.get(`/product/latest/${id}`);
            setProduct(latestResponse.data.product || null);
          } catch (latestError) {
            console.error(latestError);
            setProduct(null);
            setErrorMessage(
              latestError.response?.data?.message || "This product does not exist or has been removed."
            );
          }
        } else {
          console.error(error);
          setProduct(null);
          setErrorMessage(error.response?.data?.message || "Unable to load product details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!token) {
      window.alert("Please login to add products to cart");
      return;
    }

    try {
      await api.post(
        "/cart/addToCart",
        { productId: id, quantity: 1 },
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
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-gray-100 p-8">
          <div className="h-80 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-4 text-lg text-gray-600">
          {errorMessage || "This product does not exist or may have been removed."}
        </p>
        <Link to="/products" className="mt-6 inline-block rounded-lg bg-red-500 px-6 py-3 text-white">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-500">{product.category}</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-red-500">₹{Number(product.price || 0).toLocaleString("en-IN")}</p>
          <p className="mt-6 text-gray-700">{product.description}</p>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={addToCart}
              className="rounded-lg bg-red-500 px-6 py-3 font-medium text-white hover:bg-red-600"
            >
              Add to Cart
            </button>
            <Link
              to="/products"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-red-500 hover:text-red-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
