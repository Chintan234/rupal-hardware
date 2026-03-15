export default function CatalogPage() {

  const products = [

    {
      name: "Araldite Standard Epoxy",
      image: "/catalog/araldite_combo.jpg",
      tds: "/tds/araldite.pdf"
    },

    {
      name: "Fevicol Fast Tack",
      image: "/catalog/fast_tack.jpg",
      tds: "/tds/fast_tack.pdf"
    },

    {
      name: "Fevicol HeatX",
      image: "/catalog/fevicol_heatx.jpg",
      tds: "/tds/fevicol_heatx.pdf"
    },

    {
      name: "Fevicol Xpress PU",
      image: "/catalog/fevicol_xpres.jpg",
      tds: "/tds/fevicol_xpress.pdf"
    },

    {
      name: "Fevicol Hotmelt Adhesive",
      image: "/catalog/hotmelt.jpg",
      tds: "/tds/hotmelt.pdf"
    },

    {
      name: "Fevicol SWR Plus",
      image: "/catalog/fevicol_swr.jpg",
      tds: "/tds/swrplus.pdf"
    },

    {
      name: "Woodlok AG88 Marine",
      image: "/catalog/woodlok_ag88.jpeg",
      tds: "/tds/ag88marine.pdf"
    },

    {
      name: "Fevicol Probond",
      image: "/catalog/probond.jpg",
      tds: "/tds/probond.pdf"
    },

    {
      name: "Fevicol Membrane Press",
      image: "/catalog/membrane_press.png",
      tds: "/tds/membrane_press.pdf"
    },

    {
      name: "Masterlok Adhesive",
      image: "/catalog/masterlok.jpg",
      tds: "/tds/masterlok.pdf"
    },

    {
      name: "Jowat 280.30",
      image: "/catalog/jowat_280.30.jpg",
      tds: "/tds/jowat_280.30.pdf"
    },

    {
      name: "Jowat 280.50",
      image: "/catalog/jowat_280.50.jpg",
      tds: "/tds/jowat_280.50.pdf"
    },

    {
      name: "Jowat 284.70",
      image: "/catalog/jowat_284.70.jpg",
      tds: "/tds/jowat_284.70.pdf"
    },

    {
      name: "Jowat 288.60",
      image: "/catalog/jowat_288.60.jpg",
      tds: "/tds/jowat_288.60.pdf"
    },

    {
      name: "WD-40 Multi Use",
      image: "/catalog/wd40.jpg",
      tds: "/tds/wd40.pdf"
    },

    /* ---------- NEW CATALOG PDFS ---------- */

    {
      name: "Ebco Hardware MRP Catalog",
      image: "/catalog/ebco.png",
      tds: "/catalog-pdfs/ebco-mrp.pdf"
    },

    {
      name: "Livsmart Kitchen Systems Catalog",
      image: "/catalog/livsmart.png",
      tds: "/catalog-pdfs/livsmart-mrp.pdf"
    },

    {
      name: "Worksmart Office Hardware Catalog",
      image: "/catalog/worksmart.png",
      tds: "/catalog-pdfs/worksmart-mrp.pdf"
    },

    {
      name: "Zipco Hardware Catalog",
      image: "/catalog/zipco.png",
      tds: "/catalog-pdfs/zipco-mrp.pdf"
    }

  ];

  return (
    <main className="bg-gray-100 min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <h1 className="text-3xl font-bold">
          Product Catalog
        </h1>

        <p className="text-gray-600 mt-3 max-w-xl">
          Browse our adhesives and industrial products and download
          their technical data sheets and catalogs.
        </p>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-10 mt-12">

          {products.map((product, index) => (

            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >

              {/* Product Image */}
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">

                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-44 object-contain"
                />

              </div>

              {/* Product Name */}
              <h3 className="mt-6 font-semibold text-lg">
                {product.name}
              </h3>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">

                {/* View Button */}
                <a
                  href={product.tds}
                  target="_blank"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  View
                </a>

                {/* Download Button */}
                <a
                  href={product.tds}
                  download
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  Download
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}