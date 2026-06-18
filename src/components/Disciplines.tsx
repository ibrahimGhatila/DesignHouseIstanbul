"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import DuotoneImage from "./DuotoneImage";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["disciplines"];
};

export default function Disciplines({ content = defaultDesignHouseContent.disciplines }: Props) {
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
        <span>{content.kicker}</span>
        <span>{content.index_label}</span>
      </div>

      <div
        ref={track}
        className="flex items-stretch gap-5 overflow-x-auto px-5 py-12 md:gap-8 md:overflow-visible md:px-10 md:py-20 [scrollbar-width:none]"
      >
        {/* title panel */}
        <div className="flex w-[78vw] shrink-0 flex-col justify-center pr-6 sm:w-[52vw] md:w-[32vw]">
          <h2 className="font-display text-6xl uppercase leading-[0.85] md:text-8xl">
            {content.title_line_1}
            <br />
            {content.title_line_2}
          </h2>
          <p className="mt-6 max-w-xs text-paper/60">
            {content.intro}
          </p>
          <span className="mt-8 t-kicker text-paper/40">{content.scroll_label}</span>
        </div>

        {/* discipline cards */}
        {content.items.map((it) => (
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
          <a href={content.cta_href} className="link-wipe font-display text-3xl uppercase md:text-4xl">
            {content.cta_label.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </a>
        </div>
      </div>
    </section>
  );
}

