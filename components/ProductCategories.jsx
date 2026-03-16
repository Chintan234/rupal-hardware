import Link from "next/link";

export default function ProductCategories() {
  const products = [
    {
      title: "Kitchen Trolley",
      category: "Kitchen Accessories",
      description:
        "Heavy-duty stainless steel wire products and organizers.",
      image: "/homepage/kitchen.jpg",
    },
    {
      title: "Soft Close",
      category: "Furniture Fittings",
      description:
        "Premium hydraulic hinges and silent closing mechanisms.",
      image: "/homepage/softclose.jpg",
    },
    {
      title: "Drawer Systems",
      category: "Furniture Fittings",
      description:
        "Slim tandem boxes and precision ball bearing slides.",
      image: "/homepage/drawer.jpg",
    },
    {
      title: "Industrial Adhesives",
      category: "Adhesives",
      description:
        "Authorized bonding solutions for wood and laminate.",
      image: "/homepage/industrial.jpg",
    },
  ];

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-xl mx-auto">
          <p className="text-orange-500 text-sm tracking-widest uppercase">
            Premium Range
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Product Categories
          </h2>

          <p className="text-gray-600 text-sm mt-4">
            Explore our range of modular kitchen hardware and
            industrial-grade solutions built for performance and durability.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {products.map((product, index) => (
            <Link
              key={index}
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group block"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {product.description}
                </p>

                <p className="text-orange-500 text-sm font-medium mt-5">
                  View Range →
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}