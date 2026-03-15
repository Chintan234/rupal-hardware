import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Trusted Hardware Partner for{" "}
          <span className="text-orange-500">
            Modular Kitchens
          </span>{" "}
          & Woodworking Industries
        </h1>

        <p className="mt-6 text-gray-300 max-w-xl text-lg leading-relaxed">
          Premium distribution of high-performance kitchen fittings and 
          industrial-grade adhesives. Catering to manufacturers, architects, 
          and B2B contractors with uncompromised quality since 2001.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">

          <Link
            href="/products"
            className="btn-primary text-sm px-6 py-3 shadow-lg"
          >
            Browse Products →
          </Link>

          <Link
            href="/catalog"
            className="btn-dark text-sm px-6 py-3"
          >
            Download Catalog
          </Link>

        </div>

      </div>
    </section>
  );
}