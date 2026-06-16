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
      gsap.set(".hero-stack", { opacity: 0, scale: 0.92 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "pt" } });
        tl.to(".hero-fade.top", { opacity: 1, duration: 0.6 })
          .to(split.chars, { yPercent: 0, duration: 1.1, stagger: 0.02 }, 0.1)
          .to(
            ".hero-stack",
            { opacity: 1, scale: 1, duration: 1, ease: "pt" },
            0.5
          )
          .to(".hero-fade.bottom", { opacity: 1, y: 0, duration: 0.8 }, 0.7);
      };

      window.addEventListener("loader:done", play, { once: true });
      const fallback = window.setTimeout(play, 4500);

      // gentle parallax on the floating stack
      gsap.to(".hero-stack", {
        yPercent: 12,
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
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-paper px-5 pb-8 pt-24 text-ink md:px-10 md:pb-10 md:pt-28"
    >
      {/* floating project-card stack (centre) */}
      <div className="hero-stack pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative h-[46vh] w-[58vw] max-w-[520px] md:h-[58vh] md:w-[34vw]">
          <Card src={IMAGES.fineArt} className="-left-6 top-6 -rotate-6" />
          <ColorCard className="left-10 top-0 rotate-3" />
          <Card src={IMAGES.spatial} className="left-6 bottom-2 rotate-6" />
        </div>
      </div>

      {/* top headline line */}
      <div className="relative z-10">
        <p className="hero-fade top mb-4 t-kicker text-ink/60">
          ( Creative portfolio mentorship — Istanbul )
        </p>
        <h1 className="hero-line font-display text-[15vw] uppercase leading-[0.8] md:text-[11.5vw]">
          Crafted Bold
        </h1>
      </div>

      {/* bottom headline + meta */}
      <div className="relative z-10">
        <h1 className="hero-line font-display text-[15vw] uppercase leading-[0.8] md:text-[11.5vw]">
          Built to Last
        </h1>
        <div className="hero-fade bottom mt-6 flex flex-col gap-6 border-t hairline pt-5 md:flex-row md:items-end md:justify-between">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs sm:grid-cols-4 md:flex md:gap-10">
            {STATS.map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <span className="font-display text-base text-ink md:text-lg">
                  {n}
                </span>
                <span className="t-kicker text-ink/50">{l}</span>
              </div>
            ))}
          </div>
          <p className="max-w-sm text-sm leading-snug text-ink/70 md:text-right md:text-base">
            Design House Istanbul helps ambitious students build standout
            portfolios and win places at the world&apos;s best art &amp; design
            schools.
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div
      className={`absolute h-[78%] w-[72%] overflow-hidden shadow-2xl ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

function ColorCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute flex h-[40%] w-[80%] flex-col justify-between bg-lilac p-4 shadow-2xl ${className}`}
    >
      <span className="t-kicker text-ink/70">Portfolio ●</span>
      <span className="font-display text-3xl uppercase leading-none text-ink md:text-4xl">
        Get in.
      </span>
    </div>
  );
}
