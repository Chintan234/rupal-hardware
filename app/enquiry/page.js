"use client";

import { useState } from "react";
import { useBasket } from "@/lib/basket";

export default function EnquiryPage() {
  const { basket, removeFromBasket, clearBasket } = useBasket();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Enquiry Submitted", {
      products: basket,
      customer: form,
    });

    alert("Enquiry submitted successfully!");

    clearBasket();
  };

  return (
    <main className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-3xl font-bold">
          Enquiry Basket
        </h1>

        <p className="text-gray-600 mt-2">
          Review the products you would like to enquire about.
        </p>

        {basket.length === 0 ? (
          <div className="mt-10 bg-white p-10 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">
              Your enquiry basket is empty.
            </p>
          </div>
        ) : (
          <>
            {/* Product List */}
            <div className="mt-10 space-y-6">

              {basket.map((product) => (
                <div
                  key={product.slug}
                  className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.brand}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Minimum Order: {product.minOrder}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromBasket(product.slug)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center">
                <button
                  onClick={clearBasket}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Clear Basket
                </button>
              </div>

            </div>

            {/* Enquiry Form */}
            <div className="mt-16 bg-white p-8 rounded-xl shadow-sm">

              <h2 className="text-xl font-semibold mb-6">
                Submit Enquiry
              </h2>

              <form onSubmit={handleSubmit} className="grid gap-6">

                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    name="name"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-orange-500"
                  />

                  <input
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-orange-500"
                  />

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    name="company"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-orange-500"
                  />

                  <input
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-orange-500"
                  />

                </div>

                <textarea
                  name="message"
                  placeholder="Additional message..."
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-orange-500"
                />

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md w-fit"
                >
                  Submit Enquiry
                </button>

              </form>

            </div>
          </>
        )}

      </div>
    </main>
  );
}