"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["clients"];
};

export default function Clients({ content = defaultDesignHouseContent.clients }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "bottom 75%",
          scrub: 1,
        },
      });

      tl.from(".cell-l", {
        xPercent: -60,
        opacity: 0,
        ease: "none",
        stagger: 0.4,
      }).from(
        ".cell-r",
        { xPercent: 60, opacity: 0, ease: "none", stagger: 0.4 },
        0
      );

      gsap.from(".clients-title", {
        opacity: 0,
        scale: 0.9,
        ease: "pt",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="clients"
      ref={root}
      className="relative overflow-hidden bg-paper py-24 text-ink md:py-32"
    >
      <div className="mx-auto mb-14 flex max-w-6xl items-center justify-between px-5 t-kicker text-ink/50 md:px-10">
        <span>{content.kicker}</span>
        <span>{content.index}</span>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        {/* giant title */}
        <h2 className="clients-title mb-12 text-center font-display text-[14vw] uppercase leading-[0.85] md:mb-20 md:text-[8vw]">
          {content.title}
        </h2>

        <div className="flex flex-col font-mono text-sm leading-none md:text-lg">
          {content.rows.map(([l, r], i) => (
            <div
              key={`${l}-${r}-${i}`}
              className="client-row grid grid-cols-2 gap-8 py-2 md:gap-24"
            >
              <span className="cell-l text-right">{l}</span>
              <span className="cell-r text-left">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

