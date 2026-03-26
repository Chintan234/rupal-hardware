"use client";

import Link from "next/link";
import Image from "next/image";
import { useBasket } from "@/lib/basket";

export default function ProductCard({
  slug,
  title,
  brand,
  sku,
  description,
  minOrder,
  stockStatus,
  image,
}) {
  const { addToBasket } = useBasket();

  const stockStyles =
    stockStatus === "In Stock"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700";

  return (
    <Link href={`/products/${slug}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer h-full flex flex-col">

        {/* Stock Badge */}
        <div className="p-4">
          <span className={`text-xs px-3 py-1 rounded-full ${stockStyles}`}>
            {stockStatus}
          </span>
        </div>

        {/* ✅ IMAGE (FIXED PROPERLY) */}
        <div className="h-48 w-full overflow-hidden bg-gray-50">
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">

          {/* Brand + SKU */}
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{brand}</span>
            <span>SKU: {sku}</span>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-semibold leading-snug"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-3 leading-relaxed overflow-hidden">
            {description.length > 100
              ? description.substring(0, 100) + "..."
              : description}
          </p>

          {/* Bottom Section */}
          <div className="mt-auto">
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
                    image,
                  });
                }}
                className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition"
              >
                Enquire
              </button>
            </div>
          </div>

        </div>

      </div>
    </Link>
  );
}