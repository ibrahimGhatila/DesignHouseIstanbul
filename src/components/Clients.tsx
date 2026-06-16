"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

// Each row = a school on the left and right of a centre channel. As you scroll
// the two sides slide in and "come together", row by row, top to bottom.
const ROWS: [string, string][] = [
  ["Central Saint Martins", "IED Milano"],
  ["Royal College of Art", "NABA Milano"],
  ["Parsons School of Design", "Domus Academy"],
  ["Rhode Island School of Design", "Konstfack"],
  ["Politecnico di Milano", "UMPRUM Prague"],
  ["Pratt Institute", "Sandberg Instituut"],
  ["University of the Arts London", "SCAD"],
  ["ArtCenter College of Design", "CalArts"],
  ["Aalto University", "School of Visual Arts"],
  ["Design Academy Eindhoven", "Cooper Union"],
  ["Glasgow School of Art", "OCAD University"],
  ["Bezalel Academy", "Emily Carr"],
  ["Goldsmiths, London", "Musashino Art University"],
  ["ECAL Lausanne", "Tama Art University"],
  ["HEAD Genève", "RMIT"],
  ["Gerrit Rietveld Academie", "ELISAVA Barcelona"],
];

export default function Clients() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "bottom 75%",
          scrub: 1,
        },
      });

      tl.from(".cell-l", {
        xPercent: -60,
        opacity: 0,
        ease: "none",
        stagger: 0.4,
      }).from(
        ".cell-r",
        { xPercent: 60, opacity: 0, ease: "none", stagger: 0.4 },
        0
      );

      gsap.from(".clients-title", {
        opacity: 0,
        scale: 0.9,
        ease: "pt",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="clients"
      ref={root}
      className="relative overflow-hidden bg-paper py-24 text-ink md:py-32"
    >
      <div className="mx-auto mb-14 flex max-w-6xl items-center justify-between px-5 t-kicker text-ink/50 md:px-10">
        <span>( Where our students get in )</span>
        <span>01</span>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        {/* giant overlapping title */}
        <h2 className="clients-title pointer-events-none absolute left-1/2 top-[-2.5rem] z-10 -translate-x-1/2 text-center font-display text-[13vw] uppercase leading-[0.85] md:top-[-3rem] md:text-[7vw]">
          Destinations
        </h2>

        <div className="flex flex-col font-mono text-sm leading-none md:text-lg">
          {ROWS.map(([l, r], i) => (
            <div
              key={i}
              className="client-row grid grid-cols-2 gap-8 py-2 md:gap-24"
            >
              <span className="cell-l text-right">{l}</span>
              <span className="cell-r text-left">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
