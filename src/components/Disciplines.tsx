"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";
import DuotoneImage from "./DuotoneImage";

type Tint = "acid" | "lilac" | "clay" | "sky" | "butter";

const ITEMS: { n: string; name: string; desc: string; img: string; tint: Tint }[] = [
  { n: "01", name: "Spatial Design", desc: "Architecture & interior", img: IMAGES.spatial, tint: "sky" },
  { n: "02", name: "Visual Comms", desc: "Graphic design & type", img: IMAGES.visual, tint: "clay" },
  { n: "03", name: "Fine Arts", desc: "Studio practice", img: IMAGES.fineArt, tint: "butter" },
  { n: "04", name: "Industrial", desc: "Product & object", img: IMAGES.industrial, tint: "acid" },
  { n: "05", name: "Fashion", desc: "Concept & textile", img: IMAGES.fashion, tint: "lilac" },
  { n: "06", name: "Photo & Film", desc: "Visual storytelling", img: IMAGES.photography, tint: "sky" },
];

export default function Disciplines() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) return; // mobile = native horizontal scroll

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
    <section id="disciplines" ref={root} className="bg-ink text-paper">
      <div className="flex items-center justify-between border-b hairline px-5 py-4 t-kicker md:px-10">
        <span>( Disciplines )</span>
        <span>02 — Six paths, one standard</span>
      </div>

      <div
        ref={track}
        className="flex gap-4 overflow-x-auto px-5 py-10 md:gap-8 md:overflow-visible md:px-10 md:py-16 [scrollbar-width:none]"
      >
        {ITEMS.map((it) => (
          <article
            key={it.n}
            className="group relative w-[78vw] shrink-0 sm:w-[58vw] md:w-[34vw] lg:w-[28vw]"
          >
            <div className="mb-4 flex items-baseline justify-between">
              <span className="font-display text-lg">{it.n}</span>
              <span className="t-kicker text-paper/50">{it.desc}</span>
            </div>
            <DuotoneImage
              src={it.img}
              alt={it.name}
              tint={it.tint}
              className="aspect-[3/4] w-full"
            />
            <h3 className="mt-4 font-display text-3xl uppercase leading-none md:text-4xl">
              {it.name}
            </h3>
          </article>
        ))}

        {/* end card */}
        <article className="flex w-[78vw] shrink-0 items-center justify-center sm:w-[58vw] md:w-[26vw]">
          <a
            href="#contact"
            className="link-wipe font-display text-2xl uppercase md:text-3xl"
          >
            Find your path →
          </a>
        </article>
      </div>
    </section>
  );
}
