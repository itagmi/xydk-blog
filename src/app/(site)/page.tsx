import Hero from "@/components/Hero";
import AboutScrollContent from "@/components/home/AboutScrollContent";
import ContactSection from "@/components/home/ContactSection";
import SideHustlesSection from "@/components/home/SideHustlesSection";
import ScrollSection from "@/components/hero/ScrollSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollSection>
        <AboutScrollContent />
      </ScrollSection>
      <ScrollSection flex className="relative z-10 overflow-x-clip max-lg:justify-start max-lg:py-28">
        <SideHustlesSection />
      </ScrollSection>
      <ScrollSection flex>
        <ContactSection />
      </ScrollSection>
    </>
  );
}
