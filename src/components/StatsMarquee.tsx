"use client";

import Marquee from "./Marquee";
import { defaultDesignHouseContent, type DesignHouseContent } from "@/lib/cms/designHouseContent";

type Props = {
  content?: DesignHouseContent["stats"];
};

export default function StatsMarquee({ content = defaultDesignHouseContent.stats }: Props) {
  return (
    <section id="studio" className="bg-lilac py-px text-ink">
      <div className="flex items-center justify-between px-5 py-4 t-kicker md:px-10">
        <span>{content.kicker}</span>
        <span>{content.index}</span>
      </div>
      {[1, -1].map((dir, row) => (
        <Marquee
          key={row}
          direction={dir as 1 | -1}
          baseSpeed={34 + row * 8}
          className="border-t border-ink/20"
        >
          {content.tiles.map((tile, i) => (
            <span
              key={`${row}-${i}`}
              className="flex min-w-[40vw] items-baseline gap-4 px-8 py-6 md:min-w-[18vw] md:px-12"
            >
              <span className="font-display text-4xl md:text-6xl">{tile.value}</span>
              <span className="t-kicker text-ink/60">{tile.label}</span>
            </span>
          ))}
        </Marquee>
      ))}
    </section>
  );
}

