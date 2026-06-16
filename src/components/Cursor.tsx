"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom blend-mode cursor: a small dot that lerps toward the pointer and
 * swells into a ring over interactive / image elements. Pointer-fine only.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");

    const xTo = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const grow = () =>
      gsap.to(ring.current, { scale: 2.6, duration: 0.4, ease: "power3" });
    const shrink = () =>
      gsap.to(ring.current, { scale: 1, duration: 0.4, ease: "power3" });

    window.addEventListener("pointermove", move);
    const targets = () =>
      document.querySelectorAll("a, button, .duotone, [data-cursor]");
    const bind = () =>
      targets().forEach((t) => {
        t.addEventListener("pointerenter", grow);
        t.addEventListener("pointerleave", shrink);
      });
    bind();
    // re-bind after route/animation changes
    const obs = new MutationObserver(() => bind());
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", move);
      obs.disconnect();
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-4 -mt-4 h-8 w-8 rounded-full border border-paper mix-blend-difference"
        aria-hidden
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-acid mix-blend-difference"
        aria-hidden
      />
    </>
  );
}
