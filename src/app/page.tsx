import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Disciplines from "@/components/Disciplines";
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
        <Clients />
        <Disciplines />
        <Services />
        <News />
        <StatsMarquee />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
