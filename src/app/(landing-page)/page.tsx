import AboutSection from "@/components/LandingPage/AboutSection";
import FaqsSection from "@/components/LandingPage/FaqsSection";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";
import FooterSection from "@/components/LandingPage/Footer";
import HeaderSection from "@/components/LandingPage/Header";
import HeroSection from "@/components/LandingPage/HeroSection";
import TestimonialsSection from "@/components/LandingPage/TestimonialsSection";
import WhySection from "@/components/LandingPage/WhySection";

export default function Home() {
  return (
    <main className="flex-1 relative">
      <HeaderSection />
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
