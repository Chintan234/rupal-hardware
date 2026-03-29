import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";

// Static fallback
const staticKitchens = {
  "jignesh-joshi": {
    customer: "Jignesh Joshi", location: "Nashik",
    testimonial: "Excellent finish and smooth hardware.",
    images: ["/kitchens/jignesh/pic2.jpeg", "/kitchens/jignesh/pic1.jpeg", "/kitchens/jignesh/pic3.jpeg"],
  },
  "shailesh-salaskar": {
    customer: "Shailesh Salaskar", location: "Nashik",
    testimonial: "Very professional work and premium fittings.",
    images: ["/kitchens/shailesh/kitchen1.jpeg", "/kitchens/shailesh/kitchen2.jpeg"],
  },
  "vipul-mehta": {
    customer: "Vipul Mehta", location: "Nashik",
    testimonial: "Great experience and high quality work.",
    images: ["/kitchens/vipul/frame1.jpeg", "/kitchens/vipul/frame2.jpeg", "/kitchens/vipul/frame3.jpeg", "/kitchens/vipul/frame4.jpeg"],
  },
  "preeti-chaudhari": {
    customer: "Preeti Chaudhari", location: "Nashik",
    testimonial: "Beautiful modular kitchen with smooth finishes.",
    images: ["/kitchens/preeti/preeti2.jpeg", "/kitchens/preeti/preeti1.jpeg"],
  },
  "narendra-jain": {
    customer: "Narendra Jain", location: "Nashik",
    testimonial: "Premium quality fittings and elegant design.",
    images: ["/kitchens/narendra/narendra1.jpeg"],
  },
  "mukul-apshankar": {
    customer: "Mukul Apshankar", location: "Nashik",
    testimonial: "Highly satisfied with the finish and storage design.",
    images: ["/kitchens/mukul/mukul1.jpeg", "/kitchens/mukul/mukul2.jpeg", "/kitchens/mukul/mukul3.jpeg"],
  },
};

async function getProject(slug) {
  try {
    await connectDB();
    const project = await Project.findOne({ slug }).lean();
    if (project) return project;
  } catch {}
  return staticKitchens[slug] || null;
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return notFound();

  return (
    <main className="bg-gray-100 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">

        <p className="text-sm text-gray-500 mb-4">Projects / {project.customer}</p>

        <h1 className="text-3xl font-bold">{project.customer}</h1>
        <p className="text-gray-500 mt-2">{project.location}</p>

        {/* Gallery */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {project.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${project.customer} - photo ${index + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Testimonial */}
        {project.testimonial && (
          <div className="bg-white p-8 rounded-xl shadow-sm mt-12">
            <p className="text-gray-600 italic">"{project.testimonial}"</p>
            <p className="font-semibold mt-4">{project.customer}</p>
          </div>
        )}

      </div>
    </main>
  );
}
