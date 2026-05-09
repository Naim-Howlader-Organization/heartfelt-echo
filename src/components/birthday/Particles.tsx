import { useMemo } from "react";

type Variant = "stars" | "hearts" | "petals" | "sparkles";

const SHAPES: Record<Variant, string[]> = {
  stars: ["✦", "✧", "⋆", "✺"],
  hearts: ["♡", "❤", "❥"],
  petals: ["✿", "❀", "❁"],
  sparkles: ["✨", "˖", "·", "⋆"],
};

export function Particles({
  count = 28,
  variant = "stars",
  className = "",
}: {
  count?: number;
  variant?: Variant;
  className?: string;
}) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 18,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 16,
        drift: (Math.random() - 0.5) * 200,
        opacity: 0.3 + Math.random() * 0.6,
        char: SHAPES[variant][Math.floor(Math.random() * SHAPES[variant].length)],
      })),
    [count, variant]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute text-rose"
          style={{
            left: `${p.left}%`,
            top: 0,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            color: variant === "hearts" ? "oklch(0.82 0.16 18)" : "oklch(0.92 0.1 80)",
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as never]: `${p.drift}px`,
            textShadow: "0 0 12px currentColor",
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}

export function StarField({ count = 80 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.4,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 4,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: 0.6,
            boxShadow: `0 0 ${s.size * 3}px oklch(0.95 0.05 80 / 0.7)`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}