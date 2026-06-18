"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Disciplines from "@/components/Disciplines";
import Services from "@/components/Services";
import News from "@/components/News";
import StatsMarquee from "@/components/StatsMarquee";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";
import { fetchDesignHouseContent } from "@/lib/cms/fetchDesignHouseContent";

export default function DesignHouseHome() {
  const [content, setContent] = useState<DesignHouseContent>(defaultDesignHouseContent);

  useEffect(() => {
    let alive = true;
    fetchDesignHouseContent()
      .then((next) => {
        if (alive) setContent(next);
      })
      .catch(() => {
        if (alive) setContent(defaultDesignHouseContent);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Nav content={content.nav} />
      <main>
        <Hero content={content.hero} heroCards={content.heroCards} />
        <Clients content={content.clients} />
        <Disciplines content={content.disciplines} />
        <Services content={content.services} />
        <News content={content.news} />
        <StatsMarquee content={content.stats} />
        <Testimonials content={content.testimonials} />
        <Footer content={content.footer} />
      </main>
    </>
  );
}

