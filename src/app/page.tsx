import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import RevealSection from "@/components/RevealSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="bg-paper text-ink">
        <Marquee
          items={["Branding", "Web", "Spaces", "Strategy", "Motion"]}
          baseSpeed={50}
        />
      </div>
      <RevealSection />
    </main>
  );
}
