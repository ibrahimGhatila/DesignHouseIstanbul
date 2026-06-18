"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap";
import HeroCards from "./HeroCards";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["hero"];
  heroCards?: DesignHouseContent["heroCards"];
};

function renderDescription(text: string, italic: string) {
  if (!italic || !text.includes(italic)) return text;
  const [before, after] = text.split(italic);
  return (
    <>
      {before}
      <span className="italic">{italic}</span>
      {after}
    </>
  );
}

export default function Hero({
  content = defaultDesignHouseContent.hero,
  heroCards = defaultDesignHouseContent.heroCards,
}: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const split = new SplitText(".hero-line", {
        type: "chars,lines",
        mask: "lines",
        linesClass: "overflow-hidden",
      });

      // intro reveal (after loader)
      gsap.set(split.chars, { yPercent: 120 });
      gsap.set(".hero-fade", { opacity: 0 });
      gsap.set(".hero-stack", { opacity: 0, scale: 0.9, rotate: -2 });

      const play = () => {
        gsap
          .timeline({ defaults: { ease: "pt" } })
          .to(split.chars, { yPercent: 0, duration: 1.1, stagger: 0.02 })
          .to(
            ".hero-stack",
            { opacity: 1, scale: 1, rotate: 0, duration: 1.1 },
            0.3
          )
          .to(".hero-fade", { opacity: 1, duration: 0.7 }, 0.6);
      };
      window.addEventListener("loader:done", play, { once: true });
      const fallback = window.setTimeout(play, 4500);

      // scroll sequence: card rotates straight + grows to fill, then the
      // black DESIGN HOUSE panel takes over.
      const seq = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      seq
        .to(".hero-text", { opacity: 0, duration: 0.25, ease: "power1.in" }, 0)
        .to(".hero-back-card, .hero-card-ui", { opacity: 0, duration: 0.2 }, 0)
        .to(
          ".hero-front-card",
          { scale: 9, rotate: 0, ease: "power2.in", duration: 0.7 },
          0
        )
        .to(".hero-intro", { opacity: 1, duration: 0.15 }, 0.6)
        .fromTo(
          ".hero-intro-inner",
          { opacity: 0, scale: 0.9, yPercent: 8 },
          { opacity: 1, scale: 1, yPercent: 0, duration: 0.2 },
          0.68
        );

      return () => {
        window.removeEventListener("loader:done", play);
        clearTimeout(fallback);
        split.revert();
      };
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative h-[230vh] bg-paper">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-5 pb-6 pt-28 text-ink md:px-10 md:pb-8 md:pt-32">
        {/* top headline */}
        <h1 className="hero-text hero-line relative z-10 whitespace-nowrap text-center font-display text-[13.5vw] uppercase leading-[0.82] md:text-[11.5vw]">
          {content.top_title}
        </h1>

        {/* centre cycling card stack */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="hero-stack pointer-events-auto relative h-[52vh] w-[64vw] max-w-[340px] md:h-[60vh] md:w-[24vw]">
            <HeroCards content={heroCards} />
          </div>
        </div>

        {/* bottom headline + meta */}
        <div className="hero-text relative z-10">
          <h1 className="hero-line whitespace-nowrap text-center font-display text-[13.5vw] uppercase leading-[0.82] md:text-[11.5vw]">
            {content.bottom_title}
          </h1>
          <div className="mt-6 flex items-end justify-between gap-6">
            <div className="hero-fade font-mono text-[11px] leading-relaxed text-ink md:text-xs">
              {content.stats.map((stat) => (
                <div key={stat.label} className="flex gap-3">
                  <span className="w-10 shrink-0">{stat.value}</span>
                  <span className="text-ink/70">{stat.label}</span>
                </div>
              ))}
            </div>
            <p className="hero-fade max-w-[16rem] text-right text-sm leading-snug text-ink md:max-w-xs md:text-base">
              {renderDescription(content.description, content.description_italic)}
            </p>
          </div>
        </div>

        {/* black intro panel revealed at the end of the sequence */}
        <div className="hero-intro pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-ink opacity-0">
          <div className="hero-intro-inner text-center">
            <p className="mb-4 t-kicker text-paper/50">{content.intro_kicker}</p>
            <h2 className="font-display text-[14vw] uppercase leading-[0.85] text-paper md:text-[11vw]">
              {content.intro_title}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
