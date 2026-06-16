import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Disciplines from "@/components/Disciplines";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import News from "@/components/News";
import StatsMarquee from "@/components/StatsMarquee";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Disciplines />
        <Clients />
        <Services />
        <News />
        <StatsMarquee />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
