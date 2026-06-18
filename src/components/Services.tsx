"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap";
import DuotoneImage from "./DuotoneImage";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["services"];
};

export default function Services({ content = defaultDesignHouseContent.services }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const split = new SplitText(".services-head", {
        type: "lines,words,chars",
        mask: "lines",
        linesClass: "overflow-hidden",
      });
      gsap.from(split.chars, {
        yPercent: 110,
        duration: 0.9,
        ease: "pt",
        stagger: 0.012,
        scrollTrigger: { trigger: ".services-head", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "pt",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () =>
            (el.textContent = Math.round(obj.v).toLocaleString() + suffix),
        });
      });

      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((rowEl) => {
        gsap.from(rowEl, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "pt",
          scrollTrigger: { trigger: rowEl, start: "top 80%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="expertise"
      ref={root}
      className="bg-paper px-5 py-24 text-ink md:px-10 md:py-36"
    >
      <div className="mb-10 flex items-center justify-between border-b hairline pb-4 t-kicker text-ink/60">
        <span>{content.kicker}</span>
        <span>{content.index}</span>
      </div>
      <h2 className="services-head max-w-[15ch] font-display text-[11vw] uppercase leading-[0.9] md:text-[6vw]">
        {content.title}
      </h2>

      <div className="mt-20 flex flex-col gap-24 md:mt-32 md:gap-40">
        {content.items.map((s, i) => (
          <div
            key={s.title}
            className="svc-row grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-16"
          >
            {/* image */}
            <div
              className={`md:col-span-5 ${
                i % 2 === 1 ? "md:order-2 md:col-start-8" : ""
              }`}
            >
              <DuotoneImage
                src={s.img}
                alt={s.title}
                className="aspect-[4/5] w-full"
              />
            </div>

            {/* text */}
            <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-1" : "md:col-start-7"}`}>
              <div className="flex items-baseline gap-4">
                <span className="t-kicker text-ink/40">{s.n}</span>
                <span
                  className="count font-display text-6xl tracking-tight text-clay md:text-8xl"
                  data-target={s.count}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </span>
              </div>
              <p className="mt-2 t-kicker text-ink/50">{s.metric}</p>

              <h3 className="mt-8 font-display text-5xl uppercase leading-none md:text-7xl">
                {s.title}
              </h3>
              <p className="mt-6 max-w-md text-base leading-snug text-ink/70 md:text-lg">
                {s.body}
              </p>
              <a
                href={s.cta_href}
                className="link-wipe mt-8 inline-block font-mono text-xs uppercase tracking-[0.15em]"
              >
                {s.cta_label}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

