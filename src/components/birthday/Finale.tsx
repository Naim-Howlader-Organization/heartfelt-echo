import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Particles } from "./Particles";

export function Finale({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !fired.current) {
          fired.current = true;
          burst();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const burst = () => {
    const end = Date.now() + 2500;
    const colors = ["#f5b7b1", "#f9e79f", "#fadbd8", "#ffffff", "#e8c5e8"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-6 sm:py-32"
    >
      <Particles count={26} variant="hearts" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-xs uppercase tracking-[0.5em] text-foreground/55"
      >
        and now, the loudest part of all
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="font-display mt-6 text-4xl leading-[1.05] sm:text-6xl md:text-8xl"
      >
        <span className="block italic text-foreground/85">Happy Birthday,</span>
        <span className="text-gradient-rose mt-2 block">{name} 🎂</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 1.2 }}
        className="mt-10 max-w-xl text-balance text-base leading-relaxed text-foreground/75 sm:text-lg"
      >
        thank you for being light in a world that sometimes forgets to glow. for laughing at my bad
        jokes, for showing up softly, for simply being. may this year be gentle, generous, and
        yours.
      </motion.p>

      <motion.button
        onClick={burst}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8 }}
        className="glass glow-rose mt-10 rounded-full px-7 py-3 text-sm tracking-wide"
      >
        one more burst of confetti ✨
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 2.4 }}
        className="font-script mt-16 max-w-md text-2xl text-gradient-gold sm:text-3xl"
      >
        no matter what happens, never forget how special you are to me.
      </motion.p>

      {/* <p className="mt-10 text-[10px] uppercase tracking-[0.4em] text-foreground/40">
        — made with love
      </p> */}
    </section>
  );
}
