"use client";

import { useState } from "react";
import { useBasket } from "@/lib/basket";
import toast, { Toaster } from "react-hot-toast";

export default function EnquiryPage() {
  const { basket, removeFromBasket, clearBasket } = useBasket();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Name and phone are required.");
      return;
    }

    setLoading(true);

    const productNames = basket.map((p) => p.title).join(", ") || "None";

    try {
      // 1. Save to DB
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          products: basket.map((p) => ({ slug: p.slug, title: p.title })),
          source: "enquiry",
          status: "New",
        }),
      });

      if (!res.ok) throw new Error("Failed to save enquiry");

      // 2. Email admin (admin notification template)
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID,
          templateParams: {
            from_name: form.name,
            phone: form.phone,
            from_email: form.email || "Not provided",
            company: form.company || "Not provided",
            message: form.message || "No message",
            products: productNames,
            source: "Product Enquiry",
            to_email: "samirmehta40@gmail.com",  
          },
        }),
      });

      // 3. Email user confirmation (only if they gave an email)
      if (form.email) {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateId: process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID,
            templateParams: {
              to_name: form.name,
              to_email: form.email,
              phone: form.phone,
              company: form.company || "N/A",
              message: form.message || "No message",
              products: productNames,
              source: "Product Enquiry",
            },
          }),
        });
      }

      toast.success("Enquiry submitted! We'll be in touch soon.");
      clearBasket();
      setForm({ name: "", phone: "", company: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen py-16">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-3xl font-bold">Enquiry Basket</h1>
        <p className="text-gray-600 mt-2">
          Review the products you would like to enquire about.
        </p>

        {basket.length === 0 ? (
          <div className="mt-10 bg-white p-10 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">Your enquiry basket is empty.</p>
          </div>
        ) : (
          <>
            <div className="mt-10 space-y-6">
              {basket.map((product) => (
                <div
                  key={product.slug}
                  className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.brand}</p>
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

              <button
                onClick={clearBasket}
                className="text-sm text-gray-500 hover:text-red-500"
              >
                Clear Basket
              </button>
            </div>

            <div className="mt-16 bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Submit Enquiry</h2>

              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="name"
                    placeholder="Full Name *"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-md outline-none focus:border-orange-500"
                  />
                  <input
                    name="phone"
                    placeholder="Phone Number *"
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
                    placeholder="Email Address (for confirmation)"
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
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-6 py-3 rounded-md w-fit"
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
