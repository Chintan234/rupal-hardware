import Link from "next/link";

export default function ProjectsPage() {

  const kitchens = [
    {
      slug: "jignesh-joshi",
      image: "/kitchens/jignesh/pic2.jpeg",
      customer: "Jignesh Joshi",
      location: "Nashik"
    },
    {
      slug: "shailesh-salaskar",
      image: "/kitchens/shailesh/kitchen1.jpeg",
      customer: "Shailesh Salaskar",
      location: "Nashik"
    },
    {
      slug: "vipul-mehta",
      image: "/kitchens/vipul/frame1.jpeg",
      customer: "Vipul Mehta",
      location: "Nashik"
    },

    // ✅ NEW KITCHENS ADDED

    {
      slug: "preeti-chaudhari",
      image: "/kitchens/preeti/preeti2.jpeg",
      customer: "Preeti Chaudhari",
      location: "Nashik"
    },
    {
      slug: "narendra-jain",
      image: "/kitchens/narendra/narendra1.jpeg",
      customer: "Narendra Jain",
      location: "Nashik"
    },
    {
      slug: "mukul-apshankar",
      image: "/kitchens/mukul/mukul2.jpeg",
      customer: "Mukul Apshankar",
      location: "Nashik"
    },
  ];

  return (
    <main className="bg-gray-100 min-h-screen py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto">

          <h1 className="text-3xl md:text-4xl font-bold">
            Our Kitchen Projects
          </h1>

          <p className="text-gray-600 mt-4">
            Explore modular kitchens we have designed for our customers.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

          {kitchens.map((kitchen) => (

            <Link
              key={kitchen.slug}
              href={`/projects/${kitchen.slug}`}
              className="block"
            >

              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">

                <img
                  src={kitchen.image}
                  alt={kitchen.customer}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <p className="font-semibold text-lg">
                    {kitchen.customer}
                  </p>

                  <p className="text-sm text-gray-500">
                    {kitchen.location}
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}