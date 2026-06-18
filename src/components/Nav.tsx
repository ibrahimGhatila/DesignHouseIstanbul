"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["nav"];
};

export default function Nav({ content = defaultDesignHouseContent.nav }: Props) {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const links = content.links.length ? content.links : defaultDesignHouseContent.nav.links;

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
          href={content.logo_href}
          className="font-display text-lg font-extrabold uppercase tracking-tight text-white"
        >
          {content.logo_label}<span className="text-acid">.</span>
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-base font-medium text-white md:flex">
          {links.slice(0, 4).map(({ label, href }) => (
            <a key={label} href={href} className="link-wipe">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={content.contact_href}
            className="hidden rounded-[3px] border border-white px-5 py-2 text-sm uppercase italic text-white transition-colors hover:bg-white hover:text-ink md:inline-block"
          >
            {content.contact_label}
          </a>
          <button
            onClick={toggle}
            className="font-mono text-xs uppercase tracking-[0.2em] text-white md:hidden"
            aria-expanded={open}
          >
            {open ? content.menu_close_label : content.menu_open_label}
          </button>
        </div>
      </header>

      {/* full-screen overlay menu */}
      <div
        ref={overlay}
        className="fixed inset-0 z-40 flex -translate-y-full flex-col justify-between bg-acid px-5 pb-10 pt-28 text-ink md:px-10"
      >
        <nav className="flex flex-col">
          {links.map(({ label, href }) => (
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
          <a href={content.inquiry_href} onClick={toggle} className="underline">
            {content.inquiry_label}
          </a>
          <div className="flex gap-6">
            {content.social.map((item) => (
              <a key={item.label} href={item.href} className="hover:opacity-60">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

