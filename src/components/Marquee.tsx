"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Infinite horizontal marquee like Paper Tiger's client / stats strips.
 * The base loop runs continuously; scroll velocity nudges its speed and the
 * direction flips with scroll direction for that reactive, alive feel.
 */
export default function Marquee({
  items,
  baseSpeed = 60,
}: {
  items: string[];
  baseSpeed?: number;
}) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = track.current!;
      // Two copies sit side by side; wrap at -50% for a seamless loop.
      const loop = gsap.to(el, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration: baseSpeed,
      });

      let direction = 1;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v !== 0) direction = v < 0 ? -1 : 1;
          // Speed up the loop briefly with scroll velocity.
          const boost = 1 + Math.min(Math.abs(v) / 1000, 4);
          gsap.to(loop, {
            timeScale: direction * boost,
            duration: 0.3,
            overwrite: true,
            onComplete: () => gsap.to(loop, { timeScale: direction, duration: 0.6 }),
          });
        },
      });
    },
    { scope: track }
  );

  const row = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-ink/15 py-6">
      <div ref={track} className="flex w-max">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-display text-4xl font-bold uppercase tracking-tight md:text-6xl"
          >
            {item}
            <span className="mx-8 text-accent md:mx-12">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
