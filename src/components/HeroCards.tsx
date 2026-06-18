"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["heroCards"];
};

export default function HeroCards({ content = defaultDesignHouseContent.heroCards }: Props) {
  const [i, setI] = useState(0);
  const front = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const media = content.items.length ? content.items : defaultDesignHouseContent.heroCards.items;
  const loopMs = content.loop_ms || defaultDesignHouseContent.heroCards.loop_ms;

  // advance to the next card when the loop finishes
  useEffect(() => {
    const id = window.setInterval(
      () => setI((p) => (p + 1) % media.length),
      loopMs
    );
    return () => clearInterval(id);
  }, [loopMs, media.length]);

  // per-card: clip-wipe the new image in, Ken-Burns the photo, run the progress bar
  useEffect(() => {
    registerGsap();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.fromTo(
      front.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "pt" }
    );

    if (!reduce && img.current) {
      gsap.fromTo(
        img.current,
        { scale: 1.18, xPercent: -3 },
        { scale: 1, xPercent: 3, duration: loopMs / 1000, ease: "none" }
      );
    }
    if (bar.current) {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, duration: loopMs / 1000, ease: "none" }
      );
    }
  }, [i, loopMs]);

  const cur = media[i] ?? media[0];
  const nextImg = media[(i + 1) % media.length]?.img ?? cur.img;

  return (
    <div className="relative h-full w-full">
      {/* offset colour cards behind */}
      <div
        className="hero-back-card absolute left-[-14%] top-[6%] h-[82%] w-full -rotate-[6deg] transition-colors duration-700"
        style={{ background: cur.back[0] }}
      />
      <div
        className="hero-back-card absolute left-[10%] top-[2%] h-[88%] w-full rotate-[5deg] transition-colors duration-700"
        style={{ background: cur.back[1] }}
      />

      {/* front media card */}
      <div
        ref={front}
        className="hero-front-card absolute left-[2%] top-0 h-[94%] w-full rotate-[3deg] overflow-hidden bg-ink shadow-2xl"
        data-cursor
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={img}
          key={i}
          src={cur.img}
          alt={cur.label}
          className="h-full w-full object-cover"
        />
        {/* preload next */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={nextImg} alt="" className="hidden" aria-hidden />

        {/* label */}
        <div className="hero-card-ui absolute left-3 top-3 flex items-center gap-2 bg-paper px-2.5 py-1">
          <span className="font-display text-xs uppercase text-ink">
            {cur.label}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
        </div>

        {/* loop progress bar */}
        <div className="hero-card-ui absolute inset-x-0 bottom-0 h-1 bg-black/20">
          <div
            ref={bar}
            className="h-full w-full origin-left bg-acid"
          />
        </div>
      </div>
    </div>
  );
}

