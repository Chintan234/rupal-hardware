import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Ready to Partner with a Trusted Hardware Distributor?
        </h2>

        <p className="text-gray-300 mt-6 max-w-xl mx-auto leading-relaxed">
          Let’s discuss your project requirements and supply needs.
          Connect with us for reliable hardware solutions tailored
          for manufacturers and contractors.
        </p>

        <Link
          href="/contact"
          className="inline-block mt-10 btn-primary"
        >
          Contact Us →
        </Link>

      </div>
    </section>
  );
}