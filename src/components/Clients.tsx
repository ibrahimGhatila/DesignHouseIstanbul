"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

// The schools our students get into — two mirrored monospace columns that
// stream upward (parallax) behind the giant title, with a top/bottom fade.
const LEFT = [
  "Central Saint Martins",
  "Royal College of Art",
  "Parsons School of Design",
  "Rhode Island School of Design",
  "Politecnico di Milano",
  "Pratt Institute",
  "University of the Arts London",
  "ArtCenter College of Design",
  "Aalto University",
  "Design Academy Eindhoven",
  "Glasgow School of Art",
  "Bezalel Academy",
  "Goldsmiths, London",
  "ECAL Lausanne",
  "HEAD Genève",
  "Gerrit Rietveld Academie",
];

const RIGHT = [
  "IED Milano",
  "NABA Milano",
  "Domus Academy",
  "Konstfack",
  "UMPRUM Prague",
  "Sandberg Instituut",
  "SCAD",
  "CalArts",
  "School of Visual Arts",
  "Cooper Union",
  "OCAD University",
  "Emily Carr",
  "Musashino Art University",
  "Tama Art University",
  "RMIT",
  "ELISAVA Barcelona",
];

export default function Clients() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const st = {
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      };
      gsap.fromTo(".col-left", { y: 120 }, { y: -320, ease: "none", scrollTrigger: st });
      gsap.fromTo(".col-right", { y: 260 }, { y: -460, ease: "none", scrollTrigger: st });
      gsap.fromTo(".clients-title", { y: 80 }, { y: -160, ease: "none", scrollTrigger: st });
    },
    { scope: root }
  );

  const mask =
    "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)";

  return (
    <section
      id="clients"
      ref={root}
      className="relative overflow-hidden bg-paper py-[12vh] text-ink"
    >
      <div className="mx-auto flex items-center justify-between px-5 pb-6 t-kicker text-ink/50 md:px-10">
        <span>( Where our students get in )</span>
        <span>01</span>
      </div>

      <div
        className="relative mx-auto h-[78vh] w-full max-w-6xl overflow-hidden px-5"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        {/* giant overlapping title */}
        <h2 className="clients-title pointer-events-none absolute left-1/2 top-[22%] z-10 -translate-x-1/2 text-center font-display text-[12vw] uppercase leading-[0.85] md:text-[8vw]">
          Destinations
        </h2>

        <div className="flex h-full justify-center gap-6 font-mono text-base leading-[2] md:gap-16 md:text-lg">
          <ul className="col-left w-1/2 text-right">
            {LEFT.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <ul className="col-right w-1/2 pt-[34vh] text-left">
            {RIGHT.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
