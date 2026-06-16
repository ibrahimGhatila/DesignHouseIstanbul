"use client";

import Marquee from "./Marquee";

const NAMES = [
  "Central Saint Martins",
  "RISD",
  "Parsons",
  "Royal College of Art",
  "Politecnico Milano",
  "Pratt",
  "UAL",
  "ArtCenter",
  "Aalto",
  "Bauhaus",
];

const LOGOS = [
  "Parsons",
  "RISD",
  "RCA",
  "UAL",
  "Pratt",
  "ArtCenter",
  "Aalto",
  "Politecnico",
  "Saint Martins",
  "Bauhaus",
];

export default function Clients() {
  return (
    <section id="clients" className="bg-paper py-16 text-ink md:py-24">
      {/* giant scrolling client names */}
      <p className="mb-10 px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 md:px-10">
        ( Where our students get in )
      </p>

      <Marquee baseSpeed={28} className="border-y border-ink/15 py-6">
        {NAMES.map((n) => (
          <span
            key={n}
            className="flex items-center font-display text-5xl font-extrabold uppercase tracking-tight md:text-8xl"
          >
            {n}
            <span className="mx-8 text-accent md:mx-14">✳</span>
          </span>
        ))}
      </Marquee>

      {/* logo wall */}
      <h2 className="mx-auto mt-20 max-w-5xl px-5 text-center font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight md:mt-28 md:text-5xl">
        Our students get into schools that expect the best
      </h2>

      <Marquee baseSpeed={22} direction={-1} className="mt-16">
        {LOGOS.map((l) => (
          <span
            key={l}
            className="mx-10 flex h-16 items-center font-display text-2xl font-bold uppercase tracking-tight text-ink/40 md:mx-16 md:text-3xl"
          >
            {l}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
