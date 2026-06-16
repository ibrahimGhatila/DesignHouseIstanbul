"use client";

/**
 * Paper Tiger's signature graphic: a coloured "poster" with a shape built
 * from a grid of dots, a mono label top-left and a witty mono caption
 * bottom-right. Recreated here purely in CSS (radial-gradient dot grid +
 * masked shapes) so it needs no image assets.
 */

type Shape = "circles" | "cube" | "hexagons";

const palettes = {
  red: { bg: "#ff3b2f", dot: "#0a0a0a", text: "#0a0a0a" },
  mint: { bg: "#6dc9bc", dot: "#0a0a0a", text: "#0a0a0a" },
  purple: { bg: "#9589d3", dot: "#0a0a0a", text: "#0a0a0a" },
  ink: { bg: "#0a0a0a", dot: "#ffffff", text: "#ffffff" },
  paper: { bg: "#f4f1ea", dot: "#0a0a0a", text: "#0a0a0a" },
} as const;

export default function DotPoster({
  color = "red",
  shape = "circles",
  label,
  caption,
  className = "",
}: {
  color?: keyof typeof palettes;
  shape?: Shape;
  label: string;
  caption: string;
  className?: string;
}) {
  const p = palettes[color];

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden ${className}`}
      style={{ background: p.bg, color: p.text }}
    >
      {/* dotted shapes */}
      <div className="absolute inset-0 grid place-items-center">
        <ShapeDots shape={shape} dot={p.dot} />
      </div>

      {/* labels */}
      <span className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.18em] opacity-80">
        {label}
      </span>
      <span className="absolute bottom-5 right-5 max-w-[60%] text-right font-mono text-[11px] uppercase leading-tight tracking-[0.12em] opacity-80">
        {caption}
      </span>
    </div>
  );
}

function ShapeDots({ shape, dot }: { shape: Shape; dot: string }) {
  const dots = {
    backgroundImage: `radial-gradient(${dot} 22%, transparent 23%)`,
    backgroundSize: "14px 14px",
  } as const;

  if (shape === "circles") {
    return (
      <div className="relative h-[62%] w-[62%]">
        <div
          className="absolute left-0 top-1/2 h-[78%] w-[78%] -translate-y-1/2 rounded-full"
          style={dots}
        />
        <div
          className="absolute right-0 top-1/2 h-[78%] w-[78%] -translate-y-1/2 rounded-full"
          style={dots}
        />
      </div>
    );
  }

  if (shape === "cube") {
    return (
      <div
        className="h-[58%] w-[58%]"
        style={{
          ...dots,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />
    );
  }

  // hexagons
  return (
    <div className="relative h-[60%] w-[60%]">
      {[
        "translate(-26%,-15%)",
        "translate(26%,-15%)",
        "translate(0,28%)",
      ].map((t, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2"
          style={{
            ...dots,
            transform: `translate(-50%,-50%) ${t}`,
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      ))}
    </div>
  );
}
