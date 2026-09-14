import React, { useEffect, useState } from "react";
import api from "../api/Api.js";

const defaultForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  image: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to delete product");
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/product", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openEditForm = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      category: product.category || "",
      stock: product.stock ?? "",
      image: product.image || "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingProduct) return;

    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/product/update/${editingProduct._id}`,
        {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEditingProduct(null);
      setForm(defaultForm);
      await fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading products...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-500">
            No products found
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <img src={product.image} alt={product.name} className="h-52 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="mt-2 text-red-500 font-bold">₹{Number(product.price || 0).toLocaleString("en-IN")}</p>
                <p className="mt-2 text-sm text-gray-600">{product.category}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openEditForm(product)}
                    className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-sm font-medium text-gray-500 hover:text-red-500"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Product name"
                className="rounded-lg border border-gray-300 px-3 py-2 md:col-span-2"
              />

              <input
                name="category"
                value={form.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="rounded-lg border border-gray-300 px-3 py-2"
              />

              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="rounded-lg border border-gray-300 px-3 py-2"
              />

              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                className="rounded-lg border border-gray-300 px-3 py-2"
              />

              <input
                name="image"
                value={form.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="rounded-lg border border-gray-300 px-3 py-2 md:col-span-2"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows={4}
                className="rounded-lg border border-gray-300 px-3 py-2 md:col-span-2"
              />
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white disabled:bg-red-300"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
