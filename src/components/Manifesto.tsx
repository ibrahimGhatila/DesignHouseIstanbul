"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText, registerGsap } from "@/lib/gsap";

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const split = new SplitText(".manifesto-text", {
        type: "words,lines",
        mask: "lines",
        linesClass: "overflow-hidden",
      });
      gsap.from(split.words, {
        yPercent: 110,
        duration: 1,
        ease: "pt",
        stagger: 0.03,
        scrollTrigger: { trigger: ".manifesto-text", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="bg-acid px-5 py-28 text-ink md:px-10 md:py-44"
    >
      <div className="flex items-center justify-between border-b border-ink/20 pb-4 t-kicker">
        <span>( Manifesto )</span>
        <span>01</span>
      </div>
      <p className="manifesto-text mt-12 max-w-[20ch] font-display text-[10vw] uppercase leading-[0.92] md:max-w-[16ch] md:text-[5.6vw]">
        Talent gets noticed. We make sure it gets <span className="italic">in</span>.
      </p>
      <p className="mt-10 max-w-md text-base leading-snug text-ink/70 md:ml-auto md:text-lg">
        A portfolio is an argument. We help you make it undeniable — through
        relentless craft, honest critique, and a point of view that&apos;s
        unmistakably yours.
      </p>
    </section>
  );
}
