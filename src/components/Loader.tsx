"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Editorial intro: a counter races 0 → 100 while the wordmark sits bottom-left,
 * then the black curtain wipes up to reveal the page. Runs once per load.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      registerGsap();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDone(true);
        window.dispatchEvent(new Event("loader:done"));
        return;
      }

      document.body.style.overflow = "hidden";
      const counter = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
          window.dispatchEvent(new Event("loader:done"));
        },
      });

      tl.to(".loader-num", { opacity: 1, duration: 0.3 })
        .to(counter, {
          v: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            const el = root.current?.querySelector(".loader-num span");
            if (el) el.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(".loader-word span", {
          yPercent: -110,
          duration: 0.8,
          ease: "pt",
          stagger: 0.04,
        })
        .to(
          ".loader-num",
          { yPercent: -110, duration: 0.8, ease: "pt" },
          "<"
        )
        .to(root.current, {
          yPercent: -100,
          duration: 1,
          ease: "pt",
        });
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-5 text-paper md:px-10 md:py-8"
    >
      <div className="flex justify-end overflow-hidden">
        <div className="loader-num font-display text-[18vw] leading-none opacity-0 md:text-[10vw]">
          <span>000</span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="loader-word flex font-display text-[14vw] uppercase leading-none md:text-[7vw]">
          {"DESIGN HOUSE".split("").map((c, i) => (
            <span key={i} className="inline-block">
              {c === " " ? " " : c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
