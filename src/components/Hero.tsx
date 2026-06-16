"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap";

/**
 * Hero with Paper Tiger's signature letter-by-letter headline reveal:
 * SplitText splits the headline into characters, each rises up from behind
 * a mask with a staggered, eased entrance.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const split = new SplitText(".hero-title", {
        type: "chars,words,lines",
        mask: "lines", // each line clips its chars so they reveal from behind
        linesClass: "overflow-hidden",
      });

      const tl = gsap.timeline({ defaults: { ease: "pt" } });

      tl.from(split.chars, {
        yPercent: 120,
        duration: 1.1,
        stagger: 0.025,
      })
        .from(
          ".hero-eyebrow",
          { opacity: 0, y: 16, duration: 0.8 },
          "0.2"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 24, duration: 0.9 },
          "0.4"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 28, duration: 0.8, stagger: 0.08 },
          "0.55"
        );

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink px-5 pb-10 pt-28 text-paper md:px-10 md:pb-16"
    >
      <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
        Istanbul · Design Studio · Est. 2009
      </p>

      <h1 className="hero-title max-w-[14ch] font-display text-[15vw] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] md:text-[11vw]">
        Crafted in Istanbul, felt everywhere
      </h1>

      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <p className="hero-sub max-w-md text-lg leading-snug text-paper/80 md:text-xl">
          Design House Istanbul is a creative studio shaping brands, spaces and
          digital products that make competitors{" "}
          <em className="italic">nervous</em>.
        </p>

        <div className="flex gap-10 font-mono text-sm">
          {[
            ["15+", "years"],
            ["400+", "projects"],
            ["3", "continents"],
          ].map(([n, l]) => (
            <div key={l} className="hero-stat">
              <div className="text-3xl font-bold tracking-tight text-accent">
                {n}
              </div>
              <div className="uppercase tracking-widest text-paper/50">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
