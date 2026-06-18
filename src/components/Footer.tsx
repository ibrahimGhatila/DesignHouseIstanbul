"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["footer"];
};

export default function Footer({ content = defaultDesignHouseContent.footer }: Props) {
  const root = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

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
      className="bg-ink px-5 pb-10 pt-20 text-paper md:px-10 md:pt-28"
    >
      <div className="flex items-center justify-between border-b hairline pb-4 t-kicker text-paper/70">
        <span>{content.kicker}</span>
        <span>{content.index_label}</span>
      </div>

      <a href={`mailto:${content.email}`} className="group block">
        <h2 className="footer-cta mt-8 font-display text-[13vw] uppercase leading-[0.86]">
          <span className="block">{content.cta_line_1}</span>
          <span className="block">{content.cta_line_2}<span className="italic text-acid">{content.cta_suffix}</span></span>
        </h2>
        <span className="link-wipe mt-8 inline-block font-mono text-sm uppercase tracking-[0.15em]">
          {content.email_label}
        </span>
      </a>

      <div className="mt-20 grid grid-cols-2 gap-8 border-t hairline pt-10 t-kicker md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="text-paper/40">{content.menu_title}</span>
          {content.menu.map((l) => (
            <a key={l.label} href={l.href} className="link-wipe w-fit">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-paper/40">{content.social_title}</span>
          {content.social.map((l) => (
            <a key={l.label} href={l.href} className="link-wipe w-fit">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-paper/40">{content.studio_title}</span>
          {content.studio_lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-paper/40">{content.contact_title}</span>
          {content.contact_links.map((item) => (
            <a key={item.label} href={item.href} className="link-wipe w-fit">
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 t-kicker text-paper/50 md:flex-row md:items-center">
        <span className="font-display text-xl uppercase text-paper">
          {content.brand}
        </span>
        <span>
          {content.copyright.replace("{year}", String(year))}
        </span>
      </div>
    </footer>
  );
}

