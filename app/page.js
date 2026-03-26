import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import Distributor from "@/components/Distributor";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCategories />
      <Distributor />
      <WhyChooseUs />
      <CTA />
    </main>
  );
}