"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

const QUOTES = [
  {
    name: "Elif Demir",
    role: "Now studying at",
    company: "Central Saint Martins",
    quote:
      "They helped me find my voice as an artist. My portfolio finally felt like me — and it got me into my dream school.",
  },
  {
    name: "Marcus Hale",
    role: "Parent of admitted student",
    company: "Parsons, New York",
    quote:
      "The mentorship was structured, honest, and genuinely caring. They kept us informed at every stage of the admissions journey.",
  },
  {
    name: "Renée Frey",
    role: "Now studying at",
    company: "Royal College of Art",
    quote:
      "Every critique pushed my work further. Their attention to detail and care for craft is exactly what set my application apart.",
  },
];

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".quote-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "pt",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="bg-paper px-5 py-20 text-ink md:px-10 md:py-28"
    >
      <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
        ( Kind words )
      </p>
      <div className="grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-3">
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            className="quote-card flex flex-col justify-between bg-paper p-8 md:p-10"
          >
            <blockquote className="font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-10 font-mono text-xs uppercase tracking-[0.12em] text-ink/60">
              <div className="font-bold text-ink">{q.name}</div>
              <div>{q.role}</div>
              <div className="text-clay">{q.company}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
