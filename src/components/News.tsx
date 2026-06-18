"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import DuotoneImage from "./DuotoneImage";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["news"];
};

export default function News({ content = defaultDesignHouseContent.news }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".news-card", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: "pt",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="news"
      ref={root}
      className="bg-paper px-5 py-20 text-ink md:px-10 md:py-32"
    >
      <div className="mb-12 flex items-center justify-between border-b border-ink/15 pb-4 t-kicker">
        <span>{content.kicker}</span>
        <span>{content.index_label}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {content.posts.map((p, i) => (
          <a key={p.title} href={p.href} className="news-card group block">
            <div className="mb-3 flex items-baseline justify-between t-kicker text-ink/50">
              <span>0{i + 1}</span>
              <span>{p.tag}</span>
            </div>
            <DuotoneImage
              src={p.img}
              alt={p.title}
              tint={p.tint}
              className="aspect-[4/5] w-full"
            />
            <h3 className="mt-4 font-display text-2xl uppercase leading-none group-hover:text-clay md:text-3xl">
              {p.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}

