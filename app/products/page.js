"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products as staticProducts } from "@/lib/products";
import { useBasket } from "@/lib/basket";

function ProductsContent() {
  const { basket } = useBasket();
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  const [allProducts, setAllProducts] = useState(staticProducts);
  const [category, setCategory] = useState(categoryFromURL || null);
  const [brand, setBrand] = useState(null);
  const [sort, setSort] = useState("az");
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAllProducts(data);
      })
      .catch(() => {}); // fallback to static products
  }, []);

  // Filter products by category and brand
  let filtered = allProducts.filter((p) => {
    if (category && p.category !== category) return false;
    if (brand && p.brand !== brand) return false;
    return true;
  });

  // Sort products
  if (sort === "az") filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "za") filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));

  // Pagination
  const start = (page - 1) * productsPerPage;
  const paginatedProducts = filtered.slice(start, start + productsPerPage);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  // Unique brands and categories
  const brands = [...new Set(allProducts.map((p) => p.brand))];
  const categories = [...new Set(allProducts.map((p) => p.category))];

  return (
    <main className="bg-gray-100 min-h-screen py-16 relative">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm text-gray-500">Home / Product Catalog</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">Industrial Product Catalog</h1>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Premium grade hardware solutions for industrial manufacturing and large-scale residential projects.
            </p>
          </div>

          <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="text-sm outline-none bg-transparent"
            >
              <option value="az">Sort by: Name A–Z</option>
              <option value="za">Sort by: Name Z–A</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mt-12">
          {/* Sidebar filters */}
          <div className="md:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-5">Category</h3>
              <div className="space-y-3 text-sm">
                {categories.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() => { setCategory(item); setPage(1); }}
                      className="accent-orange-500"
                    />
                    <span className="text-gray-700 hover:text-orange-500 transition">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-5">Brand</h3>
              <div className="space-y-3 text-sm">
                {brands.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === item}
                      onChange={() => { setBrand(item); setPage(1); }}
                      className="accent-orange-500"
                    />
                    <span className="text-gray-700 hover:text-orange-500 transition">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setCategory(null); setBrand(null); setPage(1); }}
              className="text-sm text-gray-500 hover:text-orange-500 underline"
            >
              Clear All Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {paginatedProducts.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">No products found.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.slug} {...product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className={`px-3 py-2 rounded-md border text-sm ${page === 1 ? "border-gray-200 text-gray-400" : "border-gray-300 hover:text-orange-500"}`}
                >
                  ← Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-md border ${page === p ? "bg-orange-500 text-white border-orange-500" : "border-gray-300 hover:text-orange-500"}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className={`px-3 py-2 rounded-md border text-sm ${page === totalPages ? "border-gray-200 text-gray-400" : "border-gray-300 hover:text-orange-500"}`}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Basket Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/enquiry"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-3 rounded-full shadow-lg"
        >
          Enquiry Basket ({basket.length})
        </Link>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="bg-gray-100 min-h-screen py-16 flex items-center justify-center text-gray-500">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}