"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";
import DuotoneImage from "./DuotoneImage";

const POSTS = [
  { tag: "Results", title: "Where our students land", img: IMAGES.newsStudents, tint: "clay" as const },
  { tag: "Inside", title: "Anatomy of an accepted portfolio", img: IMAGES.newsPortfolio, tint: "butter" as const },
  { tag: "Studio", title: "How we shape a creative voice", img: IMAGES.newsMentor, tint: "sky" as const },
];

export default function News() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".news-card", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: "pt",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="news"
      ref={root}
      className="bg-paper px-5 py-20 text-ink md:px-10 md:py-32"
    >
      <div className="mb-12 flex items-center justify-between border-b border-ink/15 pb-4 t-kicker">
        <span>( Journal )</span>
        <span>04 — Notes from the studio</span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {POSTS.map((p, i) => (
          <a key={p.title} href="#" className="news-card group block">
            <div className="mb-3 flex items-baseline justify-between t-kicker text-ink/50">
              <span>0{i + 1}</span>
              <span>{p.tag}</span>
            </div>
            <DuotoneImage
              src={p.img}
              alt={p.title}
              tint={p.tint}
              className="aspect-[4/5] w-full"
            />
            <h3 className="mt-4 font-display text-2xl uppercase leading-none group-hover:text-clay md:text-3xl">
              {p.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}
