"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, ScrollTrigger, registerGsap } from "@/lib/gsap";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const split = new SplitText(".footer-cta", {
        type: "chars,lines",
        mask: "lines",
        linesClass: "overflow-hidden",
      });
      gsap.from(split.chars, {
        yPercent: 120,
        duration: 1,
        ease: "pt",
        stagger: 0.02,
        scrollTrigger: { trigger: ".footer-cta", start: "top 90%" },
      });
    },
    { scope: root }
  );

  return (
    <footer
      id="contact"
      ref={root}
      className="bg-clay px-5 pb-10 pt-20 text-ink md:px-10 md:pt-28"
    >
      <div className="flex items-center justify-between border-b border-ink/20 pb-4 t-kicker">
        <span>( New business )</span>
        <span>06 — Let&apos;s talk</span>
      </div>

      <a href="mailto:hello@designhouseist.com" className="group block">
        <h2 className="footer-cta mt-8 font-display text-[13vw] uppercase leading-[0.86]">
          <span className="block">Build your</span>
          <span className="block">future<span className="italic text-ink/70">.</span></span>
        </h2>
        <span className="link-wipe mt-8 inline-block font-mono text-sm uppercase tracking-[0.15em]">
          hello@designhouseist.com →
        </span>
      </a>

      <div className="mt-20 grid grid-cols-2 gap-8 border-t border-ink/20 pt-10 t-kicker md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="text-ink/50">Menu</span>
          {["Disciplines", "Expertise", "Studio", "News", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="link-wipe w-fit">
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-ink/50">Social</span>
          {["Instagram", "LinkedIn", "Behance", "TikTok"].map((l) => (
            <a key={l} href="#" className="link-wipe w-fit">
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-ink/50">Studio</span>
          <span>Istanbul, TR</span>
          <span>By appointment</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-ink/50">Say hi</span>
          <a href="#" className="link-wipe w-fit">hello@designhouseist.com</a>
          <a href="#" className="link-wipe w-fit">+90 212 000 0000</a>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 t-kicker text-ink/60 md:flex-row md:items-center">
        <span className="font-display text-xl uppercase text-ink">
          Design House Istanbul
        </span>
        <span>
          © {new Date().getFullYear()} Design House Istanbul. All rights
          reserved. All wrongs reversed.
        </span>
      </div>
    </footer>
  );
}
