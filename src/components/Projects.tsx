"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

const PROJECTS = [
  {
    name: "Bosphorus",
    desc: "Unified branding and website for a waterfront hospitality group",
    from: "#ff3b2f",
    to: "#7a1208",
  },
  {
    name: "Meridian",
    desc: "Product-grade design system for a leading fintech platform",
    from: "#9589d3",
    to: "#2b2350",
  },
  {
    name: "Lale Wellness",
    desc: "Playful web experience for a modern longevity practice",
    from: "#6dc9bc",
    to: "#0f3d37",
  },
  {
    name: "Atlas Energy",
    desc: "Interactive corporate site for a renewables pioneer",
    from: "#0a0a0a",
    to: "#333333",
  },
  {
    name: "Form Studio",
    desc: "Editorial portfolio for an award-winning architecture firm",
    from: "#e8b400",
    to: "#5a4500",
  },
  {
    name: "Kapalı",
    desc: "E-commerce experience for a heritage retail house",
    from: "#ff6f91",
    to: "#5a1a2c",
  },
];

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "pt",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-paper px-5 py-20 text-ink md:px-10 md:py-28">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
          Selected Projects
        </h2>
        <a
          href="#"
          className="font-mono text-xs uppercase tracking-[0.15em] underline hover:opacity-60"
        >
          View all projects →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <a
            key={p.name}
            href="#"
            className={`project-card group block ${
              i % 3 === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <div
                className="absolute inset-0 scale-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff14_1px,transparent_1.5px)] [background-size:18px_18px]" />
              <span className="absolute bottom-5 left-5 font-display text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">
                {p.name}
              </span>
              <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-white/0 text-white opacity-0 transition-all duration-500 group-hover:bg-white group-hover:text-ink group-hover:opacity-100">
                ↗
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                {p.name}
              </h3>
              <p className="max-w-md text-right text-sm text-ink/60 md:text-base">
                {p.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
