"use client";

import Link from "next/link";
import { useBasket } from "@/lib/basket";

export default function ProductCard({
  slug,
  title,
  brand,
  sku,
  description,
  minOrder,
  stockStatus,
}) {
  const { addToBasket } = useBasket();

  const stockStyles =
    stockStatus === "In Stock"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700";

  return (
    <Link href={`/products/${slug}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer">

        <div className="p-4">
          <span className={`text-xs px-3 py-1 rounded-full ${stockStyles}`}>
            {stockStatus}
          </span>
        </div>

        <div className="h-48 bg-gray-200 flex items-center justify-center">
          Product Image
        </div>

        <div className="p-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{brand}</span>
            <span>SKU: {sku}</span>
          </div>

          <h3 className="text-lg font-semibold leading-snug">
            {title}
          </h3>

          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            {description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">
                Min. Order Quantity
              </p>
              <p className="font-semibold">{minOrder}</p>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                addToBasket({
                  slug,
                  title,
                  brand,
                  minOrder,
                });
              }}
              className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition"
            >
              Enquire
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}