"use client";

export default function ContactPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      alert(data.message);
      e.target.reset();
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm text-gray-500">Home / Contact & Inquiry</p>
          <h1 className="text-4xl font-bold mt-4">Contact & Inquiry</h1>
          <p className="text-gray-600 mt-4 max-w-3xl">
            Have a bulk requirement or a technical query? Our team of industrial
            experts is ready to assist with your project specifications and
            wholesale procurement needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT - CONTACT FORM */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-8">Send Us a Message</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone Number *</label>
                  <input
                    name="phone"
                    type="text"
                    required
                    className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+91 00000 00000"
                  />
                </div>

              </div>

              <div>
                <label className="text-sm font-medium">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="work@company.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Your Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Describe your inquiry or bulk requirement..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition"
              >
                Send Inquiry
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Direct Contact */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-4">Direct Connection</h3>

              <p className="text-gray-600 text-sm">General Inquiry</p>
              <p className="text-sm mt-2">
                <a href="tel:+919325829620">+91 9325829620</a>
              </p>

              <a
                href="https://wa.me/919325829620"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-6 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-4">Address</h3>
              <p className="text-gray-600 text-sm">
                Shop no.9, Comfort Zone, S.No 273/3, Plot No.01, Nashik - 422010
              </p>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-4">Business Hours</h3>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Monday – Friday</span>
                <span>10:00 AM – 07:00 PM</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Saturday</span>
                <span className="text-red-500">Office Closed</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Sunday</span>
                <span>10:00 AM – 07:00 PM</span>
              </div>
            </div>

            {/* ✅ CERTIFICATIONS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-4">Business Certifications</h3>

              {/* GST NUMBER */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase">GST Number</p>
                <p className="font-semibold text-gray-800">
                  27AHDPM5216G1ZI
                </p>
              </div>

              <div className="space-y-4">

                {/* GST */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">
                    GST Registration Certificate
                  </p>

                  <div className="flex gap-4 text-sm">
                    <a
                      href="/certificates/gst.pdf"
                      target="_blank"
                      className="text-orange-500 hover:underline"
                    >
                      View PDF
                    </a>

                    <a
                      href="/certificates/gst.pdf"
                      download
                      className="text-gray-600 hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </div>

                {/* UDYAM */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">
                    Udyam Registration Certificate
                  </p>

                  <div className="flex gap-4 text-sm">
                    <a
                      href="/certificates/udyam.pdf"
                      target="_blank"
                      className="text-orange-500 hover:underline"
                    >
                      View PDF
                    </a>

                    <a
                      href="/certificates/udyam.pdf"
                      download
                      className="text-gray-600 hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}