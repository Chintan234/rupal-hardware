import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="uppercase text-sm tracking-wide opacity-80">
            Our Journey
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            About Rupal Hardware
          </h1>
          <p className="mt-6 max-w-2xl mx-auto opacity-90">
            Providing high-performance industrial solutions and hardware
            excellence for over two decades.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-200 h-80 rounded-xl flex items-center justify-center">
            Illustration
          </div>

          <div>
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-gray-600 mt-6">
              Founded in the heart of the industrial sector, Rupal Hardware
              began with a simple mission to bridge the gap between world-class
              hardware manufacturing and local industrial needs.
            </p>

            <p className="text-gray-600 mt-4">
              Over 25 years, we have evolved into a premier B2B industrial
              powerhouse serving clients across the country.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold">Expertise</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Deep technical knowledge across multiple categories.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold">Reliability</h4>
                <p className="text-sm text-gray-600 mt-2">
                  99.8% on-time delivery track record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-orange-400">25+</h3>
            <p className="text-sm mt-2">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-400">5000+</h3>
            <p className="text-sm mt-2">Products In Stock</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-400">1000+</h3>
            <p className="text-sm mt-2">Corporate Clients</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-400">24h</h3>
            <p className="text-sm mt-2">Standard Delivery</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold">Our Mission & Core Values</h2>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold">Reliability</h4>
              <p className="text-sm text-gray-600 mt-3">
                Consistently exceeding expectations through stable supply
                chains.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold">Quality Assurance</h4>
              <p className="text-sm text-gray-600 mt-3">
                Strict quality controls and certified manufacturing partners.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold">Timely Delivery</h4>
              <p className="text-sm text-gray-600 mt-3">
                Optimized logistics ensuring no operational downtime.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold">Customer Focus</h4>
              <p className="text-sm text-gray-600 mt-3">
                Long-term partnerships through personalized account management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-100 rounded-2xl p-10 grid md:grid-cols-3 gap-10 items-center">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h3 className="text-xl font-bold text-red-600">Pidilite</h3>
              <p className="text-sm mt-2 text-gray-600">Official Distributor</p>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold">
                Credibility You Can Count On
              </h2>

              <p className="text-gray-600 mt-4">
                As an authorized distribution partner, Rupal Hardware ensures
                genuine, factory-fresh industrial adhesives and solutions backed
                by manufacturer guarantees.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-6 text-sm text-gray-700">
                <p>✔ Authentic Product Guarantee</p>
                <p>✔ Priority Stock Allocation</p>
                <p>✔ Manufacturer-Backed Warranty</p>
                <p>✔ Technical Product Consultation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Ready to Power Your Next Project?
          </h2>

          <p className="mt-6 opacity-80 max-w-2xl mx-auto">
            Download our full industrial product catalog or request a corporate
            pricing quote today.
          </p>

          <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
            <Link
              href="/catalog"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition"
            >
              Download Catalog
            </Link>

            <Link
              href="/contact"
              className="bg-white text-slate-800 px-6 py-3 rounded-md hover:bg-gray-200 transition"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
