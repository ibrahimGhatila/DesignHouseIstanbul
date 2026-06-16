"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap";

const STATS = [
  ["15+", "years"],
  ["480+", "projects"],
  ["3", "continents"],
  ["0", "boring briefs"],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const split = new SplitText(".hero-title", {
        type: "chars,lines",
        mask: "lines",
        linesClass: "overflow-hidden",
      });

      gsap
        .timeline({ defaults: { ease: "pt" } })
        .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.7 })
        .from(
          split.chars,
          { yPercent: 120, duration: 1.1, stagger: 0.02 },
          "-=0.3"
        )
        .from(
          ".hero-line",
          { scaleX: 0, transformOrigin: "left", duration: 1 },
          "-=0.7"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 24, duration: 0.9 },
          "-=0.6"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 24, duration: 0.7, stagger: 0.08 },
          "-=0.6"
        );

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="hero-grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink px-5 pb-8 pt-28 text-paper md:px-10 md:pb-12"
    >
      <p className="hero-eyebrow font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55">
        ( Creative studio — Istanbul / London / New York )
      </p>

      <h1 className="hero-title font-display text-[16vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] md:text-[12vw]">
        Crafted Bold,
        <br />
        Built to Last
      </h1>

      <div className="hero-line h-px w-full bg-paper/20" />

      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <p className="hero-sub max-w-xl text-lg leading-snug text-paper/80 md:text-2xl">
          Design House Istanbul is a creative studio helping brands win new
          customers, captivate audiences, and quietly{" "}
          <em className="italic">infuriate</em> their competition.
        </p>

        <div className="grid grid-cols-2 gap-x-10 gap-y-6 font-mono sm:grid-cols-4 md:flex md:gap-10">
          {STATS.map(([n, l]) => (
            <div key={l} className="hero-stat">
              <div className="font-display text-3xl font-bold tracking-tight text-accent md:text-4xl">
                {n}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-paper/50">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
