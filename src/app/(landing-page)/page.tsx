import AboutSection from "@/components/LandingPage/AboutSection";
import FaqsSection from "@/components/LandingPage/FaqsSection";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";
import FooterSection from "@/components/LandingPage/Footer";
import HeroSection from "@/components/LandingPage/HeroSection";
import TestimonialsSection from "@/components/LandingPage/TestimonialsSection";
import WhySection from "@/components/LandingPage/WhySection";
import Navbar from "@/components/LandingPage/navbar";

export default function Home() {
  return (
    <main className="flex-1 relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhySection />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqsSection />
      <FooterSection />
    </main>
  );
}
