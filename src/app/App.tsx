import { Navigation } from "@/app/components/Navigation";
import { Hero } from "@/app/components/Hero";
import { UploadBanner } from "@/app/components/UploadBanner";
import { CategoriesGrid } from "@/app/components/CategoriesGrid";
import { TrustedBy } from "@/app/components/TrustedBy";
import { Testimonials } from "@/app/components/Testimonials";
import { FAQ } from "@/app/components/FAQ";
import { Footer } from "@/app/components/Footer";
import { SmoothScroll } from "@/app/components/SmoothScroll";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif] relative overflow-x-hidden">
      <SmoothScroll />
      <Navigation />
      <Hero />
      <UploadBanner />
      <CategoriesGrid />
      <Testimonials />
      <TrustedBy />
      <FAQ />
      <Footer />
    </div>
  );
}