import AboutSection from "@/components/LandingPage/AboutSection";
import FaqsSection from "@/components/LandingPage/FaqsSection copy";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";
import HeroSection from "@/components/LandingPage/HeroSection";
import TestimonialsSection from "@/components/LandingPage/TestimonialsSection";
import WhySection from "@/components/LandingPage/WhySection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AboutSection />
      <WhySection />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqsSection />
    </main>
  );
}
