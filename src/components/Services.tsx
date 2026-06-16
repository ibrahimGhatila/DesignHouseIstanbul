"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText, registerGsap } from "@/lib/gsap";
import DotPoster from "./DotPoster";

const SERVICES = [
  {
    n: "1",
    title: "Design",
    body: "We partner with brands to create design systems that scale. Our work spans art direction, responsive web design, and visual content that communicates what words can't.",
    count: 99,
    suffix: "%",
    poster: {
      color: "red" as const,
      shape: "circles" as const,
      label: "Istanbul, TR",
      caption: "99% of our clients need this",
    },
  },
  {
    n: "2",
    title: "Engineering",
    body: "We build websites that empower founders and marketers to react quickly, test concepts, and measure results. From enterprise platforms to clean, modern low-code systems — we sweat the build.",
    count: 590,
    suffix: "+",
    poster: {
      color: "ink" as const,
      shape: "cube" as const,
      label: "London, UK",
      caption: "590 sites we've birthed",
    },
  },
  {
    n: "3",
    title: "Strategy",
    body: "Our approach to strategy is precise, efficient, and grounded in expertise — from competitive landscape to SEO and conversion. We move fast and skip the endless conceptual detours.",
    count: 2,
    suffix: "B",
    poster: {
      color: "mint" as const,
      shape: "hexagons" as const,
      label: "You read this?",
      caption: "pages wireframed (it feels that way)",
    },
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const split = new SplitText(".services-head", {
        type: "chars",
        mask: "chars",
      });
      gsap.from(split.chars, {
        yPercent: 110,
        duration: 0.9,
        ease: "pt",
        stagger: 0.015,
        scrollTrigger: { trigger: ".services-head", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "pt",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () =>
            (el.textContent = Math.round(obj.v).toLocaleString() + suffix),
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="expertise"
      ref={root}
      className="bg-ink px-5 py-24 text-paper md:px-10 md:py-36"
    >
      <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
        ( So, what do we do exactly? )
      </p>
      <h2 className="services-head max-w-[16ch] font-display text-[11vw] font-extrabold uppercase leading-[0.88] tracking-tight md:text-[6.5vw]">
        We make brands impossible to ignore
      </h2>

      <div className="mt-24 flex flex-col gap-28 md:gap-40">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="mx-auto w-full max-w-sm">
              <DotPoster {...s.poster} />
            </div>

            <div>
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-sm text-paper/40">
                  ({s.n})
                </span>
                <span
                  className="count font-display text-6xl font-extrabold tracking-tight text-accent md:text-8xl"
                  data-target={s.count}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </span>
              </div>

              <h3 className="mt-6 font-display text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
                {s.title}
              </h3>
              <p className="mt-6 max-w-md text-lg leading-snug text-paper/70">
                {s.body}
              </p>
              <a
                href="#contact"
                className="mt-8 inline-block border-b border-paper pb-1 font-mono text-xs uppercase tracking-[0.15em] hover:opacity-60"
              >
                Learn more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
