"use client";

import Marquee from "./Marquee";

const TILES = [
  ["12+", "Years"],
  ["900+", "Students"],
  ["(212)", "Istanbul"],
  ["40+", "Schools"],
  ["96%", "Accepted"],
  ["18", "Disciplines"],
  ["3", "Dogs"],
  ["∞", "Late Nights"],
];

export default function StatsMarquee() {
  return (
    <section id="studio" className="bg-lilac py-px text-ink">
      <div className="flex items-center justify-between px-5 py-4 t-kicker md:px-10">
        <span>( By the numbers )</span>
        <span>05</span>
      </div>
      {[1, -1].map((dir, row) => (
        <Marquee
          key={row}
          direction={dir as 1 | -1}
          baseSpeed={34 + row * 8}
          className="border-t border-ink/20"
        >
          {TILES.map(([n, l], i) => (
            <span
              key={`${row}-${i}`}
              className="flex min-w-[40vw] items-baseline gap-4 px-8 py-6 md:min-w-[18vw] md:px-12"
            >
              <span className="font-display text-4xl md:text-6xl">{n}</span>
              <span className="t-kicker text-ink/60">{l}</span>
            </span>
          ))}
        </Marquee>
      ))}
    </section>
  );
}
