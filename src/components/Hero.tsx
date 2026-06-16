"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, ScrollTrigger, registerGsap } from "@/lib/gsap";
import HeroCards from "./HeroCards";

const STATS = [
  ["12+", "years"],
  ["900+", "students"],
  ["40+", "schools"],
  ["0", "boring portfolios"],
];

export default function Hero() {
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
          Crafted Bold
        </h1>

        {/* centre cycling card stack */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="hero-stack pointer-events-auto relative h-[52vh] w-[64vw] max-w-[340px] md:h-[60vh] md:w-[24vw]">
            <HeroCards />
          </div>
        </div>

        {/* bottom headline + meta */}
        <div className="hero-text relative z-10">
          <h1 className="hero-line whitespace-nowrap text-center font-display text-[13.5vw] uppercase leading-[0.82] md:text-[11.5vw]">
            Built to Last
          </h1>
          <div className="mt-6 flex items-end justify-between gap-6">
            <div className="hero-fade font-mono text-[11px] leading-relaxed text-ink md:text-xs">
              {STATS.map(([n, l]) => (
                <div key={l} className="flex gap-3">
                  <span className="w-10 shrink-0">{n}</span>
                  <span className="text-ink/70">{l}</span>
                </div>
              ))}
            </div>
            <p className="hero-fade max-w-[16rem] text-right text-sm leading-snug text-ink md:max-w-xs md:text-base">
              Design House Istanbul helps students build standout portfolios
              and <span className="italic">win places</span> at the
              world&apos;s best art &amp; design schools.
            </p>
          </div>
        </div>

        {/* black intro panel revealed at the end of the sequence */}
        <div className="hero-intro pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-ink opacity-0">
          <div className="hero-intro-inner text-center">
            <p className="mb-4 t-kicker text-paper/50">( Istanbul )</p>
            <h2 className="font-display text-[14vw] uppercase leading-[0.85] text-paper md:text-[11vw]">
              Design House
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
