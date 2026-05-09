import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

const REASONS = [
  "your laugh rearranges my whole day.",
  "you make ordinary moments feel like scenes from a film.",
  "the world is softer because you are in it.",
  "you love in a way that makes people brave.",
  "your kindness is quietly the loudest thing in the room.",
  "you turn small things into memories worth keeping.",
  "you are proof that magic still exists.",
  "every version of you — past, present, becoming — is my favourite.",
  "you make me want to be gentler with the world.",
  "your heart is the warmest place i know.",
  "you are the plot twist i am endlessly grateful for.",
  "the universe got something wonderfully right with you.",
];

type Star = { id: number; x: number; y: number; size: number; delay: number };

function generateStars(n: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < n; i++) {
    stars.push({
      id: i,
      x: 8 + Math.random() * 84,
      y: 10 + Math.random() * 80,
      size: 10 + Math.random() * 14,
      delay: Math.random() * 3,
    });
  }
  return stars;
}

export function ReasonsConstellation() {
  const stars = useMemo(() => generateStars(REASONS.length), []);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);

  const reveal = (i: number) => {
    setActive(i);
    setFound((s) => new Set(s).add(i));
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-xs uppercase tracking-[0.4em] text-foreground/50"
      >
        a sky made just for you
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="font-display mt-4 text-4xl italic sm:text-6xl"
      >
        a <span className="text-gradient-gold">constellation</span> of reasons
      </motion.h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-foreground/60">
        tap each star — every one holds a reason you are loved.
      </p>

      <div className="relative mx-auto mt-12 h-[440px] w-full max-w-3xl">
        <div className="glass absolute inset-0 overflow-hidden rounded-3xl">
          {stars.map((s, i) => {
            const isFound = found.has(i);
            return (
              <motion.button
                key={s.id}
                onClick={() => reveal(i)}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: s.delay * 0.2 }}
                whileHover={{ scale: 1.4 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                aria-label={`reason ${i + 1}`}
              >
                <motion.span
                  animate={
                    isFound
                      ? { opacity: [0.9, 1, 0.9] }
                      : { opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }
                  }
                  transition={{ duration: 2.4 + (i % 5) * 0.4, repeat: Infinity }}
                  className="block rounded-full"
                  style={{
                    width: s.size,
                    height: s.size,
                    background: isFound
                      ? "radial-gradient(circle, oklch(0.92 0.14 85) 0%, transparent 70%)"
                      : "radial-gradient(circle, oklch(0.95 0.04 280) 0%, transparent 70%)",
                    boxShadow: isFound
                      ? "0 0 24px oklch(0.85 0.16 85 / 0.85)"
                      : "0 0 14px oklch(0.9 0.05 280 / 0.5)",
                  }}
                />
              </motion.button>
            );
          })}

          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute inset-x-6 bottom-6 mx-auto max-w-xl rounded-2xl bg-background/40 px-6 py-5 backdrop-blur-md"
              >
                <Sparkles className="mx-auto mb-2 h-4 w-4 text-gold" />
                <p className="font-display text-lg italic text-gradient-rose sm:text-2xl">
                  “{REASONS[active]}”
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground/50">
        {found.size} / {REASONS.length} discovered
      </p>
    </section>
  );
}