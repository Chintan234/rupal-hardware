"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBasket } from "@/lib/basket";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { basket } = useBasket();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Projects", href: "/projects" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-slate-900 text-white px-3 py-2 rounded-md text-sm font-semibold">
            RH
          </div>

          <div className="leading-tight">
            <h1 className="text-sm font-bold tracking-wide">RUPAL</h1>
            <span className="text-xs text-orange-500 tracking-widest">
              HARDWARE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition ${
                  active
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {link.name}

                {active && (
                  <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-orange-500 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          {/* Basket */}
          <Link
            href="/enquiry"
            className="relative text-gray-700 hover:text-orange-500 text-sm font-medium"
          >
            🧺 Basket
            {basket.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {basket.length}
              </span>
            )}
          </Link>

          {/* CTA */}
          <Link
            href="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 rounded-md transition"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-orange-500"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/enquiry"
              className="text-gray-700 hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              🧺 Basket ({basket.length})
            </Link>

            <Link
              href="/contact"
              className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-md w-fit"
              onClick={() => setMenuOpen(false)}
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
