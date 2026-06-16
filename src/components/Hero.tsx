"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

const STATS = [
  ["12+", "years"],
  ["900+", "students"],
  ["40+", "schools"],
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

      // hidden until the curtain lifts
      gsap.set([split.chars, ".hero-fade", ".hero-bar"], { opacity: 0 });
      gsap.set(split.chars, { yPercent: 120, opacity: 1 });
      gsap.set(".hero-bar", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".hero-bg img", { scale: 1.25 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "pt" } });
        tl.to(".hero-bg img", { scale: 1, duration: 1.8 })
          .to(".hero-bar", { scaleX: 1, duration: 1 }, 0)
          .to(".hero-fade.top", { opacity: 1, duration: 0.8 }, 0.1)
          .to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.025 }, 0.2)
          .to(".hero-fade.bottom", { opacity: 1, y: 0, duration: 0.9 }, 0.6);
      };

      window.addEventListener("loader:done", play, { once: true });
      const fallback = window.setTimeout(play, 4500);

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
      className="hero-grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink px-5 pb-6 pt-5 text-paper md:px-10 md:pb-10 md:pt-8"
    >
      {/* photographic backdrop */}
      <div className="hero-bg pointer-events-none absolute inset-0">
        <DuotoneBg src={IMAGES.hero} />
      </div>

      {/* top meta bar */}
      <div className="hero-fade top flex items-center justify-between border-b hairline pb-4 t-kicker text-paper/70">
        <span>Design House — Istanbul</span>
        <span className="hidden md:inline">Portfolio Mentorship</span>
        <span>©2026</span>
      </div>

      {/* headline */}
      <div className="py-10">
        <p className="hero-fade top mb-6 t-kicker text-paper/60">
          ( Creative futures since 2012 )
        </p>
        <h1 className="hero-title font-display text-[15vw] uppercase leading-[0.86] md:text-[11vw]">
          <span className="block">Crafted Bold,</span>
          <span className="block italic font-[600] text-acid">Built to Last</span>
        </h1>
      </div>

      {/* bottom bar */}
      <div className="hero-fade bottom flex flex-col gap-8 border-t hairline pt-6 md:flex-row md:items-end md:justify-between">
        <p className="max-w-lg text-base leading-snug text-paper/80 md:text-xl">
          We help ambitious students build standout portfolios and win places
          at the world&apos;s best art &amp; design schools.
        </p>
        <div className="flex items-end gap-8 md:gap-12">
          {STATS.map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-2xl text-paper md:text-4xl">
                {n}
              </div>
              <div className="t-kicker text-paper/50">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-fade bottom pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 t-kicker text-paper/40 md:block">
        ↓ scroll
      </div>
    </section>
  );
}

function DuotoneBg({ src }: { src: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover opacity-80 contrast-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/10 to-transparent" />
    </>
  );
}
