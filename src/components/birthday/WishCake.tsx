import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

const WISHES = [
  "may every door you knock on open with warmth.",
  "may your year be soft, golden, and full of laughter.",
  "may you feel as loved as you make others feel.",
  "may all your quiet dreams come loudly true.",
  "may this year be the beginning of your favourite story.",
];

export function WishCake() {
  const [blown, setBlown] = useState<Set<number>>(new Set());
  const [wish, setWish] = useState<string | null>(null);
  const candles = [0, 1, 2, 3, 4];
  const allOut = blown.size === candles.length;

  const blow = (i: number) => {
    if (blown.has(i)) return;
    const next = new Set(blown).add(i);
    setBlown(next);
    setWish(WISHES[i]);
    if (next.size === candles.length) {
      setTimeout(() => {
        confetti({
          particleCount: 160,
          spread: 100,
          origin: { y: 0.55 },
          colors: ["#f5b7b1", "#f9e79f", "#fadbd8", "#ffffff"],
        });
      }, 300);
    }
  };

  const reset = () => {
    setBlown(new Set());
    setWish(null);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-xs uppercase tracking-[0.4em] text-foreground/50"
      >
        close your eyes & make a wish
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="font-display mt-4 text-3xl italic sm:text-5xl md:text-6xl"
      >
        blow out the <span className="text-gradient-gold">candles</span>
      </motion.h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-foreground/60">
        tap each candle — every flame holds a little wish for you.
      </p>

      <div className="relative mx-auto mt-12 w-full max-w-md sm:mt-14">
        {/* Candles */}
        <div className="relative flex items-end justify-center gap-3 pb-2 sm:gap-4">
          {candles.map((i) => {
            const isOut = blown.has(i);
            return (
              <button
                key={i}
                onClick={() => blow(i)}
                className="group flex flex-col items-center"
                aria-label={`candle ${i + 1}`}
              >
                <div className="relative h-8 w-4">
                  <AnimatePresence>
                    {!isOut && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                          scale: [1, 1.15, 1],
                          rotate: [-3, 3, -3],
                        }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="absolute -top-6 left-1/2 h-7 w-4 -translate-x-1/2 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 70%, #fff5b8 0%, #ffb347 55%, transparent 75%)",
                          boxShadow: "0 0 22px #ffb347, 0 0 40px #ff8c42",
                        }}
                      />
                    )}
                  </AnimatePresence>
                  {isOut && (
                    <motion.div
                      initial={{ opacity: 0.7, y: 0 }}
                      animate={{ opacity: 0, y: -30 }}
                      transition={{ duration: 1.4 }}
                      className="absolute -top-6 left-1/2 h-6 w-3 -translate-x-1/2 rounded-full bg-foreground/20 blur-sm"
                    />
                  )}
                </div>
                <div
                  className="h-16 w-3 rounded-sm transition-transform group-hover:-translate-y-1"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.85 0.12 18) 0%, oklch(0.7 0.14 18) 100%)",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Cake */}
        <div className="relative">
          <div
            className="mx-auto h-9 w-full max-w-[18rem] rounded-t-xl sm:h-10"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.92 0.05 30) 0%, oklch(0.82 0.08 30) 100%)",
            }}
          />
          <div
            className="mx-auto h-20 w-full max-w-[20rem] rounded-xl"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.78 0.1 20) 0%, oklch(0.6 0.12 18) 100%)",
              boxShadow: "0 20px 60px -20px oklch(0.6 0.12 18 / 0.6)",
            }}
          />
          <div className="mx-auto -mt-2 h-3 w-full max-w-[20rem] rounded-b-xl bg-black/30" />
        </div>

        {/* Wish bubble */}
        <div className="mt-10 min-h-[80px]">
          <AnimatePresence mode="wait">
            {wish && (
              <motion.p
                key={wish}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="font-display text-xl italic text-gradient-rose sm:text-2xl"
              >
                “{wish}”
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {allOut && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={reset}
            className="glass mt-2 rounded-full px-5 py-2 text-xs uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground"
          >
            light them again
          </motion.button>
        )}
      </div>
    </section>
  );
}