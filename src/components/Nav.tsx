"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

const LINKS = [
  ["Expertise", "#expertise"],
  ["Clients", "#clients"],
  ["Studio", "#studio"],
  ["News", "#news"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.set(overlay.current, { yPercent: -100 });
      gsap.set(".menu-link", { yPercent: 120 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(overlay.current, { yPercent: 0, duration: 0.7, ease: "pt" })
        .to(
          ".menu-link",
          { yPercent: 0, duration: 0.8, stagger: 0.06, ease: "pt" },
          "-=0.3"
        )
        .to(
          ".menu-meta",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: overlay }
  );

  const toggle = () => {
    if (!tl.current) return;
    if (open) tl.current.reverse();
    else tl.current.play();
    setOpen(!open);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10">
        <a
          href="#top"
          className="font-display text-xl font-extrabold uppercase tracking-tight text-white"
        >
          Design House<span className="text-acid">.</span>
        </a>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.15em] text-white md:flex">
          {LINKS.slice(0, 4).map(([label, href]) => (
            <a key={label} href={href} className="hover:opacity-60">
              {label}
            </a>
          ))}
        </nav>

        <button
          onClick={toggle}
          className="font-mono text-xs uppercase tracking-[0.2em] text-white"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {/* full-screen overlay menu */}
      <div
        ref={overlay}
        className="fixed inset-0 z-40 flex -translate-y-full flex-col justify-between bg-acid px-5 pb-10 pt-28 text-ink md:px-10"
      >
        <nav className="flex flex-col">
          {LINKS.map(([label, href]) => (
            <div key={label} className="overflow-hidden">
              <a
                href={href}
                onClick={toggle}
                className="menu-link block font-display text-[16vw] font-extrabold uppercase leading-[0.95] tracking-tight transition-opacity hover:opacity-50 md:text-[9vw]"
              >
                {label}
              </a>
            </div>
          ))}
        </nav>

        <div className="menu-meta flex flex-col gap-6 font-mono text-xs uppercase tracking-[0.15em] opacity-0 md:flex-row md:items-end md:justify-between">
          <a href="#contact" onClick={toggle} className="underline">
            New business inquiries →
          </a>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-60">
              LinkedIn
            </a>
            <a href="#" className="hover:opacity-60">
              Instagram
            </a>
            <a href="#" className="hover:opacity-60">
              Behance
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
