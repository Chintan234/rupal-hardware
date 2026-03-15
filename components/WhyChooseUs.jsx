export default function WhyChooseUs() {
  const features = [
    {
      title: "Premium Quality",
      description:
        "We supply only certified and industry-approved hardware products.",
    },
    {
      title: "Reliable Supply Chain",
      description:
        "Efficient logistics ensuring timely delivery across projects.",
    },
    {
      title: "Bulk Pricing Advantage",
      description:
        "Competitive rates tailored for manufacturers and contractors.",
    },
    {
      title: "25+ Years Experience",
      description:
        "Serving the hardware industry with trust since 2001.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto">
          <p className="text-orange-500 text-sm tracking-widest uppercase">
            Why Partner With Us
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Built on Trust. Driven by Quality.
          </h2>

          <p className="text-gray-600 text-sm mt-4">
            Our experience, reliable distribution network, and strong industry
            partnerships ensure consistent quality and dependable service.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-7 border border-gray-100 shadow-sm"
            >
              <div className="w-11 h-11 bg-orange-100 text-orange-500 flex items-center justify-center rounded-lg mb-5 text-sm font-semibold">
                {index + 1}
              </div>

              <h3 className="text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}