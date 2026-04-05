import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // ✅ ADD THIS
import { BasketProvider } from "@/lib/basket";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rupal Hardware",
  description: "Premium modular kitchen hardware distributor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BasketProvider>
          <Navbar />

          {children}

          {/* ✅ FOOTER ADDED HERE */}
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}

// test