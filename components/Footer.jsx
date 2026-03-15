import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-white font-semibold text-lg">Rupal Hardware</h3>

          <p className="mt-4 text-sm leading-relaxed max-w-sm">
            Premium distributor of modular kitchen fittings and industrial
            hardware solutions serving manufacturers, architects and contractors
            since 2001.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-medium mb-4">Quick Links</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>

            <li>
              <Link href="/projects" className="hover:text-white transition">
                Projects
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium mb-4">Contact</h4>

          <p className="text-sm">Nashik, Maharashtra</p>

          <p className="text-sm mt-2">
            <a href="tel:+919325829620" className="hover:text-white transition">
              +91 9325829620
            </a>
          </p>

          <p className="text-sm mt-2">
            <a href="tel:+919960576444" className="hover:text-white transition">
              +91 9960576444
            </a>
          </p>

          <p className="text-sm mt-2">samirmehta40@gmail.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm">
          © {new Date().getFullYear()} Rupal Hardware. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
