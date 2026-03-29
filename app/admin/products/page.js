"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { toSlug } from "@/lib/slugify";

const EMPTY_FORM = {
  slug: "", title: "", brand: "", category: "", sku: "",
  image: "", description: "", minOrder: "", stockStatus: "In Stock",
};
const CATEGORIES = ["Kitchen Accessories", "Furniture Fittings", "Adhesives", "Sliding Systems", "Lubricants"];
const STOCK_OPTIONS = ["In Stock", "Limited Stock", "Out of Stock"];

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // null = create, id = edit
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts().finally(() => setLoading(false));
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(product) {
    setEditing(product._id);
    setForm({
      slug: product.slug,
      title: product.title,
      brand: product.brand,
      category: product.category,
      sku: product.sku,
      image: product.image,
      description: product.description,
      minOrder: product.minOrder,
      stockStatus: product.stockStatus,
    });
    setShowForm(true);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      setForm((f) => ({ ...f, image: data.url }));
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title || !form.brand || !form.category || !form.sku) {
      toast.error("Please fill all required fields");
      return;
    }
    // ensure slug is set
    const finalForm = { ...form, slug: form.slug || toSlug(form.title) };
    setSaving(true);
    try {
      const url = editing ? `/api/products/${editing}` : "/api/products";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalForm),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editing ? "Product updated" : "Product created");
      setShowForm(false);
      fetchProducts();
    } catch {
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
  if (!confirm("Delete this product?")) return;

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Delete failed");

    setProducts((prev) => prev.filter((p) => p._id !== id));

    await fetchProducts();

    toast.success("Product deleted");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete product");
  }
}

  return (
    <div>
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={openCreate}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          + Add Product
        </button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400 text-sm">No products yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">

              {/* Image */}
              <div className="relative h-52 bg-gray-50 border-b border-gray-100">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-contain p-4"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 text-sm">
                    No image
                  </div>
                )}
                {/* Stock badge */}
                <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full
                  ${p.stockStatus === "In Stock" ? "bg-green-100 text-green-700" :
                    p.stockStatus === "Limited Stock" ? "bg-orange-100 text-orange-700" :
                    "bg-red-100 text-red-600"}`}>
                  {p.stockStatus}
                </span>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-1">
                <p className="font-bold text-base leading-snug">{p.title}</p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-orange-50 text-orange-600 font-medium px-2 py-0.5 rounded-full">
                    {p.brand}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {p.category}
                  </span>
                </div>

                {p.description && (
                  <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                )}

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>
                    <span className="text-gray-400 uppercase tracking-wide text-[10px]">SKU</span>
                    <p className="font-medium text-gray-700 mt-0.5">{p.sku}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase tracking-wide text-[10px]">Min Order</span>
                    <p className="font-medium text-gray-700 mt-0.5">{p.minOrder || "—"}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2 mt-auto">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 text-sm font-medium text-orange-500 border border-orange-200 hover:bg-orange-50 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-lg">{editing ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Title *" value={form.title} onChange={(v) => {
                  const updated = { ...form, title: v };
                  if (!editing) updated.slug = toSlug(v);
                  setForm(updated);
                }} />
                <Field label="Brand *" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="SKU *" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select...</option>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Stock Status</label>
                  <select
                    value={form.stockStatus}
                    onChange={(e) => setForm({ ...form, stockStatus: e.target.value })}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {STOCK_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <Field label="Min Order" value={form.minOrder} onChange={(v) => setForm({ ...form, minOrder: v })} />
              <div>
                <label className="text-xs font-medium text-gray-600">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Slug preview */}
              {form.slug && (
                <p className="text-xs text-gray-400">
                  Slug: <span className="font-mono text-gray-600">{form.slug}</span>
                </p>
              )}

              {/* Image Upload */}
              <div>
                <label className="text-xs font-medium text-gray-600">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full mt-1 text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                />
                {uploading && <p className="text-xs text-gray-400 mt-1">Uploading...</p>}
                {form.image && (
                  <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={form.image}
                      alt="preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-2 rounded-lg text-sm font-medium"
                >
                  {saving ? "Saving..." : editing ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}
