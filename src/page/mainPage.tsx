import { useScrollSnap } from "../hooks/useScrollSnap";
import Header from "../components/Header";
import HeroSection from "../components/main/HeroSection";
import FeaturesSection from "../components/main/FeaturesSection";
import InputInfoSection from "../components/main/InputInfoSection";
import TravelCardsSection from "../components/main/TravelCardsSection";
import CTASection from "../components/main/CTASection";

export default function MainPage() {
  const sections = ["hero", "second", "three", "four", "five"];
  useScrollSnap(sections);

  return (
    <div className="h-screen overflow-hidden font-sans">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <InputInfoSection />
      <TravelCardsSection />
      <CTASection />
    </div>
  );
}
