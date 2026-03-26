import Image from "next/image";
import AddToBasketButton from "@/components/AddToBasketButton";

import { products } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500">
          Catalogue / {product.brand} / {product.title}
        </p>

        <div className="grid md:grid-cols-2 gap-14 mt-10">

          {/* ✅ PRODUCT IMAGE */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="h-96 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={400}
                className="object-contain h-full w-full"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>

            {/* Brand */}
            <p className="text-orange-500 text-sm uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">
              {product.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 mt-5 leading-relaxed">
              {product.description}
            </p>

            {/* SKU + MOQ */}
            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p>SKU: {product.sku}</p>
              <p>Minimum Order Quantity: {product.minOrder}</p>
            </div>

            {/* Status Badge */}
            <p
              className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                product.stockStatus === "In Stock"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {product.stockStatus}
            </p>

            {/* Quote Box */}
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm mt-8">
              <h3 className="font-semibold text-lg">
                Request Quote
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Contact our team for pricing, bulk orders, and availability.
              </p>

              <AddToBasketButton product={product} />
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}