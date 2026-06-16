"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText, registerGsap } from "@/lib/gsap";

/**
 * Demonstrates the two other core Paper Tiger scroll behaviours:
 *  - a headline that reveals word-by-word as it enters the viewport
 *  - a number that counts up when scrolled into view
 * Both are driven by ScrollTrigger over the Lenis-smoothed scroll.
 */
export default function RevealSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const split = new SplitText(".reveal-title", {
        type: "words,lines",
        mask: "lines",
        linesClass: "overflow-hidden",
      });

      gsap.from(split.words, {
        yPercent: 110,
        duration: 1,
        ease: "pt",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".reveal-title",
          start: "top 80%",
        },
      });

      // Count-up — number tweens from 0 to its data-target in view.
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "pt",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString() + suffix;
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="flex min-h-screen flex-col justify-center gap-16 bg-paper px-5 py-32 text-ink md:px-10"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
        ( So, what do we do exactly? )
      </p>

      <h2 className="reveal-title max-w-[18ch] font-display text-[10vw] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] md:text-[7vw]">
        We build brands that refuse to be ignored
      </h2>

      <div className="grid grid-cols-2 gap-10 border-t border-ink/15 pt-10 md:grid-cols-4">
        {[
          { target: 412, suffix: "", label: "Projects shipped" },
          { target: 98, suffix: "%", label: "Client retention" },
          { target: 15, suffix: "+", label: "Years in studio" },
          { target: 0, suffix: "", label: "Boring briefs" },
        ].map((s) => (
          <div key={s.label}>
            <div
              className="count font-display text-5xl font-bold tracking-tight text-accent md:text-7xl"
              data-target={s.target}
              data-suffix={s.suffix}
            >
              0{s.suffix}
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-widest text-ink/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
