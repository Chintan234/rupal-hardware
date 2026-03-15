"use client";

import { useBasket } from "@/lib/basket";

export default function AddToBasketButton({ product }) {

  const { addToBasket } = useBasket();

  return (
    <button
      onClick={() =>
        addToBasket({
          slug: product.slug,
          title: product.title,
          brand: product.brand,
          minOrder: product.minOrder,
        })
      }
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md mt-5 transition"
    >
      Enquire Now
    </button>
  );
}