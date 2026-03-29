import Image from "next/image";
import AddToBasketButton from "@/components/AddToBasketButton";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { products as staticProducts } from "@/lib/products";
import { notFound } from "next/navigation";

async function getProduct(slug) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();
    if (product) return { ...product, _id: product._id.toString() };
  } catch {}
  // fallback to static
  return staticProducts.find((p) => p.slug === slug) || null;
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <main className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm text-gray-500">
          Catalogue / {product.brand} / {product.title}
        </p>

        <div className="grid md:grid-cols-2 gap-14 mt-10">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="h-96 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={400}
                className="object-contain h-full w-full" unoptimized
              />
            </div>
          </div>

          <div>
            <p className="text-orange-500 text-sm uppercase tracking-wide">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">{product.title}</h1>
            <p className="text-gray-600 mt-5 leading-relaxed">{product.description}</p>

            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p>SKU: {product.sku}</p>
              <p>Minimum Order Quantity: {product.minOrder}</p>
            </div>

            <p className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${
              product.stockStatus === "In Stock"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}>
              {product.stockStatus}
            </p>

            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm mt-8">
              <h3 className="font-semibold text-lg">Request Quote</h3>
              <p className="text-sm text-gray-500 mt-2">
                Contact our team for pricing, bulk orders, and availability.
              </p>
              <AddToBasketButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
