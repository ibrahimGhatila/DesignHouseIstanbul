"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

const PROJECTS = [
  {
    name: "Spatial Design",
    desc: "Architecture & interior portfolios built for top-school admissions",
    img: IMAGES.spatial,
  },
  {
    name: "Visual Communication",
    desc: "Graphic design & typography with a point of view",
    img: IMAGES.visual,
  },
  {
    name: "Fine Arts",
    desc: "A studio practice and a body of work that stands out",
    img: IMAGES.fineArt,
  },
  {
    name: "Industrial Design",
    desc: "Product & object design, from sketch to prototype",
    img: IMAGES.industrial,
  },
  {
    name: "Fashion & Textile",
    desc: "Concept-driven collections and fashion portfolios",
    img: IMAGES.fashion,
  },
  {
    name: "Photography & Film",
    desc: "Visual storytelling through the lens",
    img: IMAGES.photography,
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
          Disciplines
        </h2>
        <a
          href="#"
          className="font-mono text-xs uppercase tracking-[0.15em] underline hover:opacity-60"
        >
          View student work →
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
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.name}
                className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute bottom-5 left-5 font-display text-4xl font-extrabold uppercase tracking-tight text-white drop-shadow-lg md:text-6xl">
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
