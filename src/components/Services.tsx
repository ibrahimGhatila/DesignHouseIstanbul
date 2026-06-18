"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText, registerGsap } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";
import DuotoneImage from "./DuotoneImage";

const SERVICES = [
  {
    n: "01",
    title: "Portfolio",
    body: "We help you build a body of work with a clear creative voice. From idea to final artwork, we shape projects that show range, intent and craft — the things admissions panels actually look for.",
    count: 96,
    suffix: "%",
    metric: "first-choice acceptance",
    img: IMAGES.newsPortfolio,
  },
  {
    n: "02",
    title: "Mentorship",
    body: "One-on-one guidance from practicing artists and designers. We meet you where you are, push your thinking, and keep you accountable through every critique, draft and deadline.",
    count: 900,
    suffix: "+",
    metric: "students mentored",
    img: IMAGES.newsMentor,
  },
  {
    n: "03",
    title: "Admissions",
    body: "Strategy that gets you in. We map school fit, deadlines, interviews and statements — the full path to the world's best art & design programmes, minus the guesswork.",
    count: 40,
    suffix: "+",
    metric: "partner schools placed into",
    img: IMAGES.newsStudents,
  },
];

export default function Services() {
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
        <span>( What we do )</span>
        <span>03</span>
      </div>
      <h2 className="services-head max-w-[15ch] font-display text-[11vw] uppercase leading-[0.9] md:text-[6vw]">
        We make portfolios impossible to ignore
      </h2>

      <div className="mt-20 flex flex-col gap-24 md:mt-32 md:gap-40">
        {SERVICES.map((s, i) => (
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
                href="#contact"
                className="link-wipe mt-8 inline-block font-mono text-xs uppercase tracking-[0.15em]"
              >
                Learn more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
