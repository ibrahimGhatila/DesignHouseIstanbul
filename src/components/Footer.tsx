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
      className="hero-grain bg-ink px-5 pb-10 pt-24 text-paper md:px-10 md:pt-32"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
        ( New business )
      </p>

      <a href="mailto:hello@designhouseist.com" className="group block">
        <h2 className="footer-cta mt-6 font-display text-[15vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em]">
          Let&apos;s build
          <br />
          something
          <span className="text-accent">.</span>
        </h2>
        <span className="mt-8 inline-block border-b border-paper pb-1 font-mono text-sm uppercase tracking-[0.15em] group-hover:opacity-60">
          hello@designhouseist.com →
        </span>
      </a>

      <div className="mt-24 grid grid-cols-2 gap-8 border-t border-paper/15 pt-10 font-mono text-xs uppercase tracking-[0.12em] md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="text-paper/40">Menu</span>
          {["Expertise", "Clients", "Studio", "News", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:opacity-60">
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-paper/40">Social</span>
          {["LinkedIn", "Instagram", "Behance", "Spotify"].map((l) => (
            <a key={l} href="#" className="hover:opacity-60">
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-paper/40">Studio</span>
          <span>Istanbul</span>
          <span>London</span>
          <span>New York</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-paper/40">Say hi</span>
          <a href="#" className="hover:opacity-60">
            hello@designhouseist.com
          </a>
          <a href="#" className="hover:opacity-60">
            +90 212 000 0000
          </a>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/40 md:flex-row md:items-center">
        <span className="font-display text-2xl font-extrabold tracking-tight text-paper">
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
