type Tint = "acid" | "lilac" | "clay" | "sky" | "butter" | "none";

const TINTS: Record<Tint, string> = {
  acid: "var(--acid)",
  lilac: "var(--lilac)",
  clay: "var(--clay)",
  sky: "var(--sky)",
  butter: "var(--butter)",
  none: "transparent",
};

/**
 * Grayscale + colour-tint image that reveals full colour on hover, unifying
 * all imagery into one editorial grade. Tint is applied via the .duotone
 * CSS rule using a per-instance CSS variable.
 */
export default function DuotoneImage({
  src,
  alt,
  tint = "none",
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  tint?: Tint;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={`duotone ${className}`}
      style={{ ["--tint" as string]: TINTS[tint] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
