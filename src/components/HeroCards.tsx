"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";

// Each "card" loops its motion, then the stack swaps to the next one — like
// the inspiration's hero, where every card plays then changes on loop end.
const MEDIA = [
  { img: IMAGES.fashion, label: "Fashion", back: ["#c9c2f0", "#f0bcd2"] },
  { img: IMAGES.spatial, label: "Spatial", back: ["#a9d6e5", "#d8f24a"] },
  { img: IMAGES.fineArt, label: "Fine Arts", back: ["#f0bcd2", "#c9c2f0"] },
  { img: IMAGES.industrial, label: "Industrial", back: ["#d8f24a", "#a9d6e5"] },
  { img: IMAGES.photography, label: "Photo & Film", back: ["#f0e2a6", "#ec6242"] },
  { img: IMAGES.visual, label: "Visual", back: ["#ec6242", "#c9c2f0"] },
];

const LOOP_MS = 3600;

export default function HeroCards() {
  const [i, setI] = useState(0);
  const front = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  // advance to the next card when the loop finishes
  useEffect(() => {
    const id = window.setInterval(
      () => setI((p) => (p + 1) % MEDIA.length),
      LOOP_MS
    );
    return () => clearInterval(id);
  }, []);

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
        { scale: 1, xPercent: 3, duration: LOOP_MS / 1000, ease: "none" }
      );
    }
    if (bar.current) {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, duration: LOOP_MS / 1000, ease: "none" }
      );
    }
  }, [i]);

  const cur = MEDIA[i];
  const nextImg = MEDIA[(i + 1) % MEDIA.length].img;

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
