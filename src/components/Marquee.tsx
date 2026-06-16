"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Infinite horizontal marquee à la Paper Tiger. Runs continuously; scroll
 * velocity briefly boosts its speed and scroll direction flips the loop.
 */
export default function Marquee({
  children,
  baseSpeed = 30,
  direction = 1,
  className = "",
}: {
  children: React.ReactNode;
  baseSpeed?: number;
  direction?: 1 | -1;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = track.current!;
      const loop = gsap.to(el, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration: baseSpeed,
      });
      loop.timeScale(direction);

      let dir = direction;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v !== 0) dir = (v < 0 ? -1 : 1) * direction;
          const boost = 1 + Math.min(Math.abs(v) / 800, 4);
          gsap.to(loop, {
            timeScale: dir * boost,
            duration: 0.25,
            overwrite: true,
            onComplete: () =>
              gsap.to(loop, { timeScale: dir, duration: 0.6 }),
          });
        },
      });
    },
    { scope: track }
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max flex-nowrap">
        <div className="flex flex-nowrap items-center">{children}</div>
        <div className="flex flex-nowrap items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
