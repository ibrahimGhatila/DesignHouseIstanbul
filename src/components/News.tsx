"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

const POSTS = [
  {
    tag: "News",
    title: "Design House Istanbul Wins Awwwards Site of the Day",
    from: "#9589d3",
    to: "#2b2350",
  },
  {
    tag: "Work",
    title: "Behind the Build: Meridian's Design System",
    from: "#6dc9bc",
    to: "#0f3d37",
  },
  {
    tag: "Work",
    title: "New Launch: Bosphorus Hospitality Group",
    from: "#ff3b2f",
    to: "#7a1208",
  },
];

export default function News() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".news-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "pt",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="news"
      ref={root}
      className="bg-paper px-5 py-20 text-ink md:px-10 md:py-28"
    >
      <div className="mb-12 flex items-end justify-between">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
          Latest News
        </h2>
        <a
          href="#"
          className="font-mono text-xs uppercase tracking-[0.15em] underline hover:opacity-60"
        >
          View all news →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {POSTS.map((p) => (
          <a key={p.title} href="#" className="news-card group block">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff14_1px,transparent_1.5px)] [background-size:16px_16px]" />
            </div>
            <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
              {p.tag}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-tight group-hover:opacity-60">
              {p.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}
