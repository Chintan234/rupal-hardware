"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useBasket } from "@/lib/basket";

export default function ProductsPage() {
  const { basket } = useBasket();

  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  const [category, setCategory] = useState(categoryFromURL || null);
  const [brand, setBrand] = useState(null);
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  let filteredProducts = products.filter((product) => {
    if (category && product.category !== category) return false;
    if (brand && product.brand !== brand) return false;
    return true;
  });

  if (sort === "az") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sort === "za") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;

  const paginatedProducts = filteredProducts.slice(start, end);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <main className="bg-gray-100 min-h-screen py-16 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <p className="text-sm text-gray-500">Home / Product Catalog</p>

            <h1 className="text-3xl md:text-4xl font-bold mt-4">
              Industrial Product Catalog
            </h1>

            <p className="text-gray-600 mt-4 max-w-2xl">
              Premium grade hardware solutions for industrial manufacturing
              and large-scale residential projects.
            </p>
          </div>

          {/* Sorting */}
          <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="text-sm outline-none bg-transparent"
            >
              <option value="latest">Sort by: Latest</option>
              <option value="az">Sort by: Name A–Z</option>
              <option value="za">Sort by: Name Z–A</option>
            </select>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-12 mt-12">

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-8">

            {/* Category */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-5">
                Category
              </h3>

              <div className="space-y-3 text-sm">
                {[
                  "Kitchen Accessories",
                  "Furniture Fittings",
                  "Adhesives",
                  "Sliding Systems",
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">

                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() => {
                        setCategory(item);
                        setPage(1);
                      }}
                      className="accent-orange-500"
                    />

                    <span className="text-gray-700 group-hover:text-orange-500 transition">
                      {item}
                    </span>

                  </label>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-5">
                Brand
              </h3>

              <div className="space-y-3 text-sm">
                {["Pidilite", "Rupal In-house", "Hettich"].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">

                    <input
                      type="radio"
                      name="brand"
                      checked={brand === item}
                      onChange={() => {
                        setBrand(item);
                        setPage(1);
                      }}
                      className="accent-orange-500"
                    />

                    <span className="text-gray-700 group-hover:text-orange-500 transition">
                      {item}
                    </span>

                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setCategory(null);
                setBrand(null);
                setPage(1);
              }}
              className="text-sm text-gray-500 hover:text-orange-500 transition underline underline-offset-4"
            >
              Clear All Filters
            </button>

          </div>

          {/* Product Grid */}
          <div className="md:col-span-3">

            <div className="grid md:grid-cols-2 gap-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.slug} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-16">

              {/* Previous */}
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-3 py-2 rounded-md border text-sm
                ${
                  page === 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500"
                }`}
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (

                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border
                  ${
                    page === p
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500"
                  }`}
                >
                  {p}
                </button>

              ))}

              {/* Next */}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-3 py-2 rounded-md border text-sm
                ${
                  page === totalPages
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500"
                }`}
              >
                Next →
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Floating Basket */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/enquiry"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg transition"
        >
          Enquiry Basket ({basket.length})
        </Link>
      </div>

    </main>
  );
}