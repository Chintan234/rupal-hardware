"use client";

import { createContext, useContext, useState } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);

  function addToBasket(product) {
    setBasket((prev) => {
      const exists = prev.find((item) => item.slug === product.slug);
      if (exists) return prev;
      return [...prev, product];
    });
  }

  function removeFromBasket(slug) {
    setBasket((prev) => prev.filter((item) => item.slug !== slug));
  }

  function clearBasket() {
    setBasket([]);
  }

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, clearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}