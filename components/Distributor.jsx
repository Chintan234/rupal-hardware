export default function Distributor() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div>
          <p className="text-orange-500 text-sm tracking-widest uppercase">
            Authorized Distributor
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
            Trusted Partner for Leading Hardware & Adhesive Brands
          </h2>

          <p className="text-gray-300 mt-6 leading-relaxed max-w-lg">
            We are proud authorized distributors of industry-leading brands,
            delivering premium-grade kitchen fittings, hardware systems,
            and industrial adhesives to manufacturers and contractors
            across the region.
          </p>
        </div>

        {/* Right Highlight Box */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold">
            Why Work With Rupal Hardware?
          </h3>

          <ul className="mt-6 space-y-4 text-gray-300 text-sm leading-relaxed">
            <li>✔ Genuine & Certified Products</li>
            <li>✔ Competitive Bulk Pricing</li>
            <li>✔ On-Time Delivery Support</li>
            <li>✔ Strong B2B Relationships Since 2001</li>
          </ul>
        </div>

      </div>
    </section>
  );
}