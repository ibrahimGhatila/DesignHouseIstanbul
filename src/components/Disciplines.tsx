"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";
import DuotoneImage from "./DuotoneImage";

const ITEMS = [
  { n: "01", name: "Spatial Design", desc: "Architecture & interior", img: IMAGES.spatial, bg: "var(--sky)" },
  { n: "02", name: "Visual Comms", desc: "Graphic design & type", img: IMAGES.visual, bg: "var(--clay)" },
  { n: "03", name: "Fine Arts", desc: "Studio practice", img: IMAGES.fineArt, bg: "var(--butter)" },
  { n: "04", name: "Industrial", desc: "Product & object", img: IMAGES.industrial, bg: "var(--acid)" },
  { n: "05", name: "Fashion", desc: "Concept & textile", img: IMAGES.fashion, bg: "var(--lilac)" },
  { n: "06", name: "Photo & Film", desc: "Visual storytelling", img: IMAGES.photography, bg: "var(--sky)" },
];

export default function Disciplines() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!window.matchMedia("(min-width: 768px)").matches) return;

      const el = track.current!;
      const amount = () => el.scrollWidth - window.innerWidth;

      gsap.to(el, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section id="disciplines" ref={root} className="overflow-hidden bg-ink text-paper">
      <div className="flex items-center justify-between border-b border-paper/15 px-5 py-4 t-kicker text-paper/60 md:px-10">
        <span>( Disciplines )</span>
        <span>02 — Selected work</span>
      </div>

      <div
        ref={track}
        className="flex items-stretch gap-5 overflow-x-auto px-5 py-12 md:gap-8 md:overflow-visible md:px-10 md:py-20 [scrollbar-width:none]"
      >
        {/* title panel */}
        <div className="flex w-[78vw] shrink-0 flex-col justify-center pr-6 sm:w-[52vw] md:w-[32vw]">
          <h2 className="font-display text-6xl uppercase leading-[0.85] md:text-8xl">
            Selected
            <br />
            Work
          </h2>
          <p className="mt-6 max-w-xs text-paper/60">
            Six creative paths we help students master — from first sketch to
            final portfolio.
          </p>
          <span className="mt-8 t-kicker text-paper/40">Scroll →</span>
        </div>

        {/* discipline cards */}
        {ITEMS.map((it) => (
          <article
            key={it.n}
            className="group w-[78vw] shrink-0 sm:w-[52vw] md:w-[26vw]"
          >
            <div
              className="flex h-full flex-col gap-4 p-4 text-ink"
              style={{ background: it.bg }}
            >
              <div className="flex items-center justify-between t-kicker text-ink/70">
                <span className="font-display text-base">{it.n}</span>
                <span>{it.desc}</span>
              </div>
              <DuotoneImage
                src={it.img}
                alt={it.name}
                className="aspect-[4/5] w-full"
              />
              <h3 className="font-display text-2xl uppercase leading-none md:text-3xl">
                {it.name}
              </h3>
            </div>
          </article>
        ))}

        {/* end CTA */}
        <div className="flex w-[78vw] shrink-0 items-center justify-center sm:w-[40vw] md:w-[24vw]">
          <a href="#contact" className="link-wipe font-display text-3xl uppercase md:text-4xl">
            Find your
            <br />
            path →
          </a>
        </div>
      </div>
    </section>
  );
}
