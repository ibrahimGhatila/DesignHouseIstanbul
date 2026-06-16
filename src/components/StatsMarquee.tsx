"use client";

import Marquee from "./Marquee";

const TILES = [
  ["15+", "Years"],
  ["480", "Projects"],
  ["(212)", "Istanbul"],
  ["0", "Scrubs"],
  ["6", "Countries"],
  ["3", "Dogs"],
  ["17", "Awards"],
  ["ZERO", "Reptilians"],
  ["(207)", "London"],
  ["2", "Brothers"],
];

export default function StatsMarquee() {
  return (
    <section id="studio" className="bg-ink py-px text-paper">
      {[1, -1, 1].map((dir, row) => (
        <Marquee
          key={row}
          direction={dir as 1 | -1}
          baseSpeed={36 + row * 6}
          className="border-b border-paper/10"
        >
          {TILES.map(([n, l], i) => (
            <a
              key={`${row}-${i}`}
              href="#"
              className="flex min-w-[22vw] items-baseline gap-4 px-8 py-7 hover:text-accent md:min-w-[16vw] md:px-12"
            >
              <span className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
                {n}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                {l}
              </span>
            </a>
          ))}
        </Marquee>
      ))}
    </section>
  );
}
