"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

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

      gsap.set(split.chars, { yPercent: 120 });
      gsap.set(".hero-fade", { opacity: 0 });
      gsap.set(".hero-stack", { opacity: 0, scale: 0.9, rotate: -2 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "pt" } });
        tl.to(split.chars, { yPercent: 0, duration: 1.1, stagger: 0.02 })
          .to(
            ".hero-stack",
            { opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: "pt" },
            0.3
          )
          .to(".hero-fade", { opacity: 1, duration: 0.7 }, 0.6);
      };

      window.addEventListener("loader:done", play, { once: true });
      const fallback = window.setTimeout(play, 4500);

      gsap.to(".hero-stack-inner", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        window.removeEventListener("loader:done", play);
        clearTimeout(fallback);
        split.revert();
      };
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-paper px-5 pb-6 pt-28 text-ink md:px-10 md:pb-8 md:pt-32"
    >
      {/* top headline */}
      <h1 className="hero-line relative z-10 text-center font-display text-[15.5vw] uppercase leading-[0.82] md:text-[13vw]">
        Crafted Bold
      </h1>

      {/* centre tilted card stack (sits in front of the type) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="hero-stack relative h-[52vh] w-[64vw] max-w-[360px] md:h-[60vh] md:w-[26vw]">
          <div className="hero-stack-inner relative h-full w-full">
            {/* offset colour cards behind */}
            <div className="absolute left-[-14%] top-[6%] h-[82%] w-full -rotate-[6deg] bg-lilac" />
            <div
              className="absolute left-[10%] top-[2%] h-[88%] w-full rotate-[5deg]"
              style={{ background: "#f0bcd2" }}
            />
            {/* front photo */}
            <div className="absolute left-[2%] top-0 h-[94%] w-full rotate-[3deg] overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES.fashion}
                alt="Student creative work"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* bottom headline + meta */}
      <div className="relative z-10">
        <h1 className="hero-line text-center font-display text-[15.5vw] uppercase leading-[0.82] md:text-[13vw]">
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
            Design House Istanbul helps students build standout portfolios and{" "}
            <span className="italic">win places</span> at the world&apos;s best
            art &amp; design schools.
          </p>
        </div>
      </div>
    </section>
  );
}
